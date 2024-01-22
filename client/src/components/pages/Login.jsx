import { useState, useEffect } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { UserState } from '../../context/userProvider';

const Login = () => {

  const ENDPOINT = 'https://news-app-production-7844.up.railway.app'
  // local: http://localhost:5000

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

	const [users, setUsers] =useState([])

  const {user, setUser} = UserState()

  const navigate = useNavigate()

  const handleLogin = async() => {
    if (selectedUser) {
			try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
  
        const { data } = await axios.post(
          `${ENDPOINT}/user/login`,
          { username: selectedUser },
          config
        );
        console.log(data)
        setUser(data)
        // localStorage.setItem("userInfo", JSON.stringify(data));
        // setLoading(false);
        navigate('/')
      } catch (error) {
      // Aquí puedes implementar la lógica de inicio de sesión, como enviar la información del usuario al servidor.
      // console.log(`Iniciando sesión como ${selectedUser}`);
      console.log(error)
    }
  }
  };

	useEffect(() => {
		const getUsers = async () => {
			try{
				const response = await fetch(`${ENDPOINT}/user`)
				const responseJson = await response.json()
				setUsers(responseJson)
				console.log(responseJson)
		}catch(err){
			console.error(err.message)
		}
	}
	getUsers()
	}, [])
	

  return (
    <div className="min-h-screen flex  justify-center bg-gray-100 pt-20">
      <div className="bg-white p-8 rounded shadow-lg h-60">
        <h2 className="text-2xl font-semibold mb-4">Iniciar Sesión</h2>
				<h3>Selecciona un usuario de la Base de datos</h3>
        <div className="relative">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full p-3 bg-gray-200 rounded cursor-pointer"
          >
            {selectedUser ? selectedUser : 'Seleccionar Usuario'}
          </button>
          {isModalOpen && (
            <div className="absolute top-0 left-0 mt-12 w-full bg-white border border-gray-300 rounded">
              {users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => {
                    setSelectedUser(user);
                    setIsModalOpen(false);
                  }}
                  className="p-3 hover:bg-gray-200 cursor-pointer"
                >
                  {user}
                </div>
              ))}
            </div>
          )}
        </div>
        <button onClick={handleLogin} className="mt-4 bg-blue-500 text-white p-2 rounded">
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default Login;
