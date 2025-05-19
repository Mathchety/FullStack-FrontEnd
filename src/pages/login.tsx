import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../componentes/inputField";
import Button from "../componentes/button";
import Label from "../componentes/label";
import authService from "../services/authService";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Validação básica
    if (!formData.email || !formData.senha) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const success = await authService.login({
        email: formData.email,
        password: formData.senha,
      });

      if (success) {
        navigate("/dashboard");
      } else {
        setError("Email ou senha incorretos");
      }
    } catch (err) {
      setError("Ocorreu um erro ao fazer login. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/cadastro");
  };

  return (
    <div className="bg-background w-full h-screen items-center justify-center flex">
      <div className="bg-gray-300 rounded-3xl p-6 w-tlM lg:w-2/5 xl:w-2/6 flex justify-center items-center border-black border shadow shadow-black">
        <form
          className="flex-row justify-center items-center w-3/5"
          method="get"
        >
          {error && (
            <div className="text-red-500 mb-4 text-center">{error}</div>
          )}

          <InputField
            type="email"
            name="email"
            placeholder="Digite seu email"
            onChange={handleChange}
            label="Email:"
            value={formData.email}
            required
          />
          <InputField
            type="password"
            name="senha"
            placeholder="Digite sua senha"
            onChange={handleChange}
            label="Senha:"
            value={formData.senha}
            required
          />
          <div className="flex items-center justify-between gap-4">
            <Button
              name="btnLogin"
              value={loading ? "Carregando..." : "Login"}
              onClick={handleLogin}
            />
            <Label
              name="btnRegister"
              value="Cadastrar-se"
              onClick={handleRegister}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;