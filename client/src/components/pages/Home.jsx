import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {UserState} from '../../context/userProvider';

const Home = () => {

  const ENDPOINT = 'https://news-app-production-7844.up.railway.app'
  // local: http://localhost:5000

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState('');

  const {user} = UserState()

  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${ENDPOINT}/posts`)
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };

  useEffect(() => {

    fetchPosts();
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = async (name) => {
    console.log(name)
    try {
      const response = await axios.get(`${ENDPOINT}/comments?name=${name}`);
      setPosts(response.data);
      console.log(response.data)
      setCurrentPage(1); // Resetear la paginación al realizar una nueva búsqueda
    } catch (error) {
      console.error('Error fetching posts by name:', error.message);
    }
  };

  console.log(user)

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Posts</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre o por titulo"
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value)
            handleSearch(searchName)
          }}
          className="border border-gray-300 p-2 rounded mr-2 w-60"
        />
        <button onClick={() => {
          setSearchName('')
          fetchPosts()
        }} className="bg-blue-500 text-white px-4 py-2 rounded">
          Reset
        </button>
      </div>


      {currentPosts.length > 0 ? currentPosts.map(post => (
        <div key={post.id} className="py-4 h-full card border hover:scale-105 hover:shadow-md mb-4">
          <Link to={`/${post.id}`}>
            <h1 className="text-xl font-semibold">{post.title}</h1>
          </Link>
          {/* <p className="text-gray-700">{post.body}</p> */}
        </div>
      )) : <h2 className="text-xl font-semibold">No se encontraron Posts</h2>}
    

      <div className="flex justify-center">
        {[...Array(Math.ceil(posts.length / postsPerPage))].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-4 py-2 bg-blue-500 text-white rounded ${currentPage === index + 1 && 'bg-blue-700'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
