import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({children}) => {

	const [user, setUser] = useState();

	const navigate = useNavigate()

	useEffect(() => {
		//Se le pasa a la variable el usuario del local storage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
		//Luego se le pasa al estado user  el userInfo
    setUser(userInfo);

		// si no hay un usuario logeadp  devuelveme a la home
    if (!userInfo) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

	return(
		<UserContext.Provider
		value={{
				user,
				setUser
			}}
			>{children}
		</UserContext.Provider>
	) 
}

export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider
