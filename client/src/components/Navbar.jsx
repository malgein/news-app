import { Link } from "react-router-dom";
import { UserState } from "../context/userProvider";

const Navbar = () => {

  const {user} = UserState()

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to='/'>
          <h1 className="text-white text-lg font-semibold">Mi Blog</h1>
        </Link>
        {user && <h4 className="text-white text-lg font-semibold">Hola {user?.name}</h4>}
        <div className="flex space-x-4">
          <Link to='/form'>
            <button className="bg-white text-blue-500 px-4 py-2 rounded">Crear Post</button>
          </Link>
          <Link to='/login'>
            <button className="bg-white text-blue-500 px-4 py-2 rounded">Iniciar sesion</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
