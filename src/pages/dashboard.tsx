import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../componentes/button";

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    fetch("/src/data/users.json")
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="gap-4">
      <h1 className="mb-3">Listagem</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <h2>
              Usuário: {usuario.nome} - Email: {usuario.email}
            </h2>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Button name="logout" value="Sair" onClick={handleLogout} />
      </div>
    </div>
  );
}

export default Dashboard;
