import axios from 'axios';

// Defina a URL base da sua API
const API_URL = 'http://localhost:3000';

// Interface para o token JWT retornado pelo backend
interface AuthResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}

// Interface para os dados de login
interface LoginData {
  email: string;
  password: string; // Mudado de 'senha' para 'password' conforme sua API
}

// Interface para os dados de cadastro
interface RegisterData {
  name: string;  // Mudado de 'nome' para 'name' conforme sua API
  email: string;
  password: string; // Mudado de 'senha' para 'password' conforme sua API
}

// Configuração do axios com interceptors para incluir token em todas as requisições
const api = axios.create({
  baseURL: API_URL,
});

// Adiciona o token JWT a todas as requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Serviço de autenticação
const authService = {
  // Login na aplicação
  login: async (data: LoginData): Promise<boolean> => {
    try {
      const response = await api.post<AuthResponse>('/login', {
        email: data.email,
        password: data.password // Mudado para corresponder ao backend
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  },

  // Registrar novo usuário
  register: async (data: RegisterData): Promise<boolean> => {
    try {
      const response = await api.post<AuthResponse>('/register', {
        name: data.name, // Mudado para corresponder ao backend
        email: data.email,
        password: data.password // Mudado para corresponder ao backend
      });
      
      // Se o registro não retornar token diretamente, você pode precisar fazer login após o registro
      // Como seu endpoint register não retorna token, precisamos fazer login após o registro
      const loginSuccess = await authService.login({
        email: data.email,
        password: data.password
      });
      
      return loginSuccess;
    } catch (error) {
      console.error('Erro no cadastro:', error);
      return false;
    }
  },

  // Verificar se o usuário está autenticado
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Obter o token JWT
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  // Obter os dados do usuário
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Logout do usuário
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Verificar validade do token
  verifyToken: async (): Promise<boolean> => {
    try {
      // Como não há uma rota específica para verificar o token,
      // podemos tentar acessar uma rota protegida, como a de usuários
      await api.get('/users');
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        authService.logout();
      }
      return false;
    }
  },
  
  // Obter todos os usuários (exemplo de rota protegida)
  getUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  }
};

export default authService;
export { api };