import { useState } from "react";
import InputField from "../componentes/inputField";
import Button from "../componentes/button";
import { useNavigate } from "react-router-dom";

function Cadastro() {
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
  const handleDashboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="bg-background w-full h-screen items-center justify-center flex">
      <div className="bg-gray-400 rounded-3xl p-6 w-2/3 lg:w-2/5 xl:w-2/6 flex justify-center items-center border-black border shadow shadow-black">
        <form
          className="flex-row  justify-center items-center w-3/5"
          method="get"
        >
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
              value="Cadastrar"
              onClick={handleDashboard}
            />
        </form>
      </div>
    </div>
  );
}
export default Cadastro;
