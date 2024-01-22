import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {UserState} from '../../context/userProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Detail = () => {

  const ENDPOINT = 'https://news-app-production-7844.up.railway.app'
  // local: http://localhost:5000

  const {user} = UserState()

  const {id} = useParams()

  const [post, setPost] = useState([])

  const [comment, setComment] = useState('');

  const [editing, setEditing] = useState(false)

  const [description, setDescription] = useState('')

  const [title, setTitle] = useState('')

  const navigate = useNavigate()

  const handleAddComment = async(e) => {
      e.preventDefault()
      // console.log(comment)

      if(!user){
        alert("Debes de ingresar con un usuario para poder comentar")
        return
      }

      if(comment.length ===0){
        alert("Porfavor ingresa un comentario")
        return
      }
      try{
        await axios.patch(`${ENDPOINT}/posts/${id}`, {
          content: comment,
          userId: user.id,
          name: user.name
        })
      } catch(error){
        console.log(error)
      }
      setComment('');
      getPost()
  };

  const getPost = async () => {
    const data = await fetch(`${ENDPOINT}/posts/${id}`)

    const dataJson = await data.json()
    setPost(dataJson)
  }

  const handleEdit = async(e) => {
    e.preventDefault()
    const response = await axios.put(`${ENDPOINT}/posts/${id}`, {
        title,
        description,
      });
      // console.log(response.data)
      getPost()
      setEditing(false);
  }

  const handleDelete = async(e) => {
    e.preventDefault()
    if(user?.name !== post?.user){
      alert('Solo los propios autores pueden borrar los posts')
      return
    }
    const isConfirmed = window.confirm('¿Estás seguro que quieres eliminar este post?');

    if (isConfirmed) {
      // Lógica para eliminar (puedes realizar la acción que necesites aquí)
      const response = await axios.delete(`${ENDPOINT}/posts/${id}`, {});
      // console.log(response.data)
      navigate('/')
      alert('El post ha sido eliminado');
    } else {
      alert('No se ha eliminado el post');
    }
  }

useEffect(() => {
    getPost()
  },[id])

  // console.log(post)
  return (
    // <div key={post.id} className='h-screen w-full  bg-indigo-600'>
    //   <div className='max-w-3/4 h-70vh mt-5 bg-white shadow-md p-6'>
    //     <div className='w-full h-full'>
    //       <img alt={post.title} src={post.image} />
    //     </div>
    //     <h1>{post.title}</h1>
    //     <p>{post.user}</p>
    //     <p>{post.body}</p>
    //     <div >
    //       {post.comments?.length===0 ? <p>No existen comentarios en este post</p> : post.comments?.map(comment => {return (
    //         <div key={comment?.id}>
    //           <p>{comment?.content}</p>
    //           <p>{comment?.name}</p>
    //         </div>
    //       )})
    //       }        
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-indigo-100 flex items-center justify-center mt-10">
    <div className="max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
      <img alt={post.title} src={post.image} className="w-full h-64 object-cover object-center" />
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-2">{post.title}</h1>
        <p className="text-gray-600 mb-4">Autor: {post.user}</p>
        <p className="text-gray-800">{post.body}</p>
        <div className="mt-4">
        <button
         onClick={() => setEditing(!editing)}
          className="bg-yellow-200 text-white p-2 rounded-r hover:bg-yellow-400 mr-20"
          disabled={user?.name !== post?.user}
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-200 text-white p-2 rounded-r hover:bg-red-600 ml-20"
          // disabled={user?.name !== post?.user}
        >
          Eliminar
        </button>
        {editing && (
          <form onSubmit={handleEdit} className="max-w-md mx-auto">
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
  
          <div className="flex justify-center">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Modificar Post
            </button>
          </div>
        </form>
        )}
        <h2 className="text-gray-600 font-bold">Comentarios</h2>
          {post.comments?.length === 0 ? (
            <p className="text-gray-600">No existen comentarios en este post</p>
          ) : (
            post.comments?.map((comment) => (
              <div key={comment?.id} className="border-t border-gray-300 mt-3 pt-3">
                <p className="text-gray-800">{comment?.content}</p>
                <p className="text-gray-600">Usuario: {comment?.name}</p>
              </div>
            ))
          )}
              <div className="mt-4">
      <label htmlFor="comment" className="block text-sm font-medium text-gray-600">
        Deja un comentario
      </label>
      <div className="flex">
        <input
          type="text"
          id="comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 p-2 flex-1 border border-gray-300 rounded-l"
          placeholder="Escribe tu comentario..."
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-700"
        >
          Comentar
        </button>
      </div>
    </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Detail