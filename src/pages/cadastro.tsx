import { useState } from "react";
import InputField from "../componentes/inputField";
import Button from "../componentes/button";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  
  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nome || !formData.email || !formData.senha) {
      setError("Por favor, preencha todos os campos");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const success = await authService.register({
        name: formData.nome, // Mudado de 'nome' para 'name'
        email: formData.email,
        password: formData.senha // Mudado de 'senha' para 'password'
      });
      
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Não foi possível realizar o cadastro. Tente novamente.");
      }
    } catch (err) {
      setError("Ocorreu um erro ao cadastrar. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  return (
    <div className="bg-background w-full h-screen items-center justify-center flex">
      <div className="bg-black rounded-3xl p-6 w-2/3 lg:w-2/5 xl:w-2/6 flex justify-center items-center border-white border shadow shadow-gray-700">
        <form
          className="flex-row justify-center items-center w-3/5"
          method="get"
        >
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          
          <InputField
            type="text"
            name="nome"
            placeholder="Digite seu nome"
            onChange={handleChange}
            label="Nome:"
            value={formData.nome}
            required
          />
          <br />
          <InputField
            type="email"
            name="email"
            placeholder="Digite seu email"
            onChange={handleChange}
            label="Email:"
            value={formData.email}
            required
          />
          <br />
          <InputField
            type="password"
            name="senha"
            placeholder="Digite sua senha"
            onChange={handleChange}
            label="Senha:"
            value={formData.senha}
            required
          />
          <Button
            name="btnLogin"
            value={loading ? "Carregando..." : "Cadastrar"}
            onClick={handleRegister}
          />
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
