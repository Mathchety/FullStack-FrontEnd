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
    <div className="gap-4">
      <h1 className="mb-3">Listagem</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <h2>
              Usuário: {usuario.name} - Email: {usuario.email}
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
