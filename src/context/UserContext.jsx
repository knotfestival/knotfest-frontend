import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api.js";
import axios from "axios"; // Importar axios para verificar o tipo de erro

const UserContext = createContext(null);
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Para erros reais

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setError(null);
                const response = await api.get("/user/logged");
                setUser(response.data);
            } catch (err) {
                if (axios.isAxiosError(err) && (err.response?.status === 401 || err.response?.status === 403)) {
                    setUser(null);
                    console.log("Utilizador não autenticado (401/403).");
                } else {
                    setError(err.message);
                    console.error('Erro ao buscar utilizador:', err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const logout = async () => {
        try {
            await api.get("/logout"); // Assumindo que o GET /logout do backend agora funciona
            setUser(null); // Limpar o utilizador no frontend após logout
        } catch (err) {
            console.error('Erro ao fazer logout:', err);
            // Pode adicionar setError aqui se quiser mostrar um erro ao utilizador para o logout
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, loading, logout, error }}>
            {loading ? (
                <div>Carregando...</div>
            ) : error && !user ? ( // Se houver um erro REAL e nenhum utilizador (não um 401/403 esperado)
                <div>Erro: {error}. Por favor, tente novamente.</div>
            ) : (
                children
            )}
        </UserContext.Provider>
    );
};

export default UserProvider;