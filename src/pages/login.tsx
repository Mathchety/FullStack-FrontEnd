import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../componentes/inputField";
import Button from "../componentes/button";
import Label from "../componentes/label";

function Login() {
  const [formData, setFormData] = useState({
    nome: "",
    titulo: "",
    descricao: "",
    data: "",
    hora: "",
    link: "",
    categoria: "",
    local: "",
    email: "",
    senha: "",
    fonte: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDashboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.setItem("token", "tokenTeste");
    navigate("/dashboard");
  };
  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/cadastro");
  };

  return (
    <div className="bg-background w-full h-screen items-center justify-center flex">
      <div className="bg-gray-400 rounded-3xl p-6 w-tlM lg:w-2/5 xl:w-2/6  flex justify-center items-center border-black border shadow shadow-black">
        <form
          className="flex-row justify-center items-center w-3/5"
          method="get"
        >
          <InputField
            type="email"
            name="email"
            placeholder="Digite seu email"
            onChange={handleChange}
            label="Email:"
            value={formData.email}
          />
          <InputField
            type="password"
            name="senha"
            placeholder="Digite sua senha"
            onChange={handleChange}
            label="Senha:"
            value={formData.senha}
          />
          <div className="flex items-center justify-between gap-4">
            <Button
              name="btnLogin"
              value="Login"
              onClick={handleDashboard}
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