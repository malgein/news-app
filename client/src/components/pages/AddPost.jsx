import  { useState } from 'react';
import axios from 'axios';
import {UserState} from '../../context/userProvider'


const AddPost = () => {

  const ENDPOINT = 'https://news-app-production-7844.up.railway.app'
  // local: http://localhost:5000

  const {user} = UserState()

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId , setUserId] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user){
      alert('debes estar logeado para poder crear posts') 
      return
    } 

    try {
      // Realizar la llamada al endpoint para crear un nuevo post
      setUserId(user.id)
      const response = await axios.post(`${ENDPOINT}/posts`, {
        title,
        description,
        userId
      });

      // Llamar a la función onAddPost pasando el nuevo post creado
      console.log(response.data);
      

      // Limpiar los campos del formulario después de crear el post
      setTitle('');
      setDescription('');
    
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Agregar Nuevo Post</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-600">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Agregar Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
