import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../componentes/button";
import authService from "../services/authService";
import axios from "axios";

interface Usuario {
  id: number;
  name: string; // Alterado de 'nome' para 'name' conforme seu backend
  email: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        // Usando o método apropriado do authService
        const data = await authService.getUsers();
        setUsuarios(data);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
        setError("Não foi possível carregar os usuários");

        // Se o erro for de autenticação (401), redireciona para o login
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          authService.logout();
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  const user = authService.getUser();

  return (
    <div className="bg-black h-[100vh] px-10 pt-4">
      <div className="gap-4 ">
      <div className="flex text-white font-bold border-b-2 border-white pb-2 mb-2">
        <div className="w-1/2">Usuário</div>
        <div className="w-1/2">Email</div>
      </div>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
        <div className="flex text-white border-2 border-white mb-2">
          <div className="w-1/2 px-2">{usuario.name}</div>
          <div className="w-1/2 px-2">{usuario.email}</div>
        </div>
          </li>
        ))}
      </ul>

      </div>
      
      <div className="mt-4">
        <Button name="logout" value="Sair" onClick={handleLogout} />
      </div>
    </div>
  );
}

export default Dashboard;
