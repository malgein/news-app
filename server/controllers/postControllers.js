const Post = require('../models/posts')
const User = require('../models/user')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid');


const createPost = async(req, res) => {
	try {
    const { userId, description, title } = req.body;
  
    const post = await Post.find();

    const currentId = post[post.length-1].id + 1;

		// console.log(currentId)

    const newPost = new Post({
			id: currentId,
     	title,
      body: description,
      userId: userId.toString()
    });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
}

const deletePost = async(req, res) => {
	const postId = Number(req.params.id)
	console.log(postId)
  try {
    // Verificar si el post existe
		const existingPost = await Post.findOne({ id: postId }); 
    if (!existingPost) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    // Eliminar el post de la base de datos
		await Post.deleteOne({ id: postId });

		// await Post.findByIdAndRemove(postId);

    res.status(200).json({ message: 'Post eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el post', error: err.message });
  }
}

// Trae los posts por el nombre de usuario o por el titulo
const getCommentByPostId = async(req, res) =>{  
  const { name } = req.query;

  // console.log(name)
  try {
    if (!name) {
      const post = await Post.find()
      return res.status(200).json(post);
    }

    if (name) {
      // Buscar usuarios que coincidan total o parcialmente con el nombre
      const users = await User.find({ name: { $regex: new RegExp(name, 'i') } });

      if (users.length === 0) {
        // return res.status(404).json({ message: 'No se encontraron usuarios con ese nombre.' });
        const post = await Post.find({ title: { $regex: new RegExp(name, 'i') } })

        if (!post) {
          return res.status(404).json({ message: 'No se encontró ningún post con ese título ni con ese autor.' });
        }
  
        return res.status(200).json(post);
      }

      // Obtener los IDs de los usuarios encontrados
      const userIds = users.map(user => user.id);

      // Buscar posts cuya propiedad userId coincida con los IDs de los usuarios encontrados
      const posts = await Post.find({ userId: { $in: userIds } });

      return res.status(200).json( posts );
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error al obtener el usuario y sus posts', error: err.message });
  }
}

const getCommentPostById = async(req, res) => {
	const postId = Number(req.params.id);

  try {
    // Buscar el post por su ID
    const post = await Post.findOne({ id: postId }).populate('comments.user', 'username'); // Cambia 'id' por el nombre del campo que almacena el ID en tu modelo

    // Verificar si el post existe
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    // Obtener los comentarios del post
    const comments = post.comments;

    // Devolver los comentarios o un resultado válido si no hay comentarios
    if (comments.length > 0) {
      res.status(200).json({ comments });
    } else {
      res.status(200).json({ message: 'No hay comentarios para este post' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los comentarios', error: err.message });
  }

}

const getPostById = async(req, res) => {
	const postId = Number(req.params.id);

  try {
    // Buscar el post por su ID
    const post = await Post.findOne({ id: postId }); // Cambia 'id' por el nombre del campo que almacena el ID en tu modelo

    // Verificar si el post existe
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }
    const user = await User.findOne({ id: post.userId });

    const image = await axios.get(`https://jsonplaceholder.typicode.com/photos/${postId}`)

    const imageSelected = image.data

    // console.log(imageSelected)

    res.status(200).json(
      {
        id: postId,
        title: post.title,
        body: post.body,
        user: user.name || '',
        image: imageSelected.url || 'https://via.placeholder.com/600/24f355',
        comments: post.comments
      }
    );
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el post', error: err.message });
  }
}

const getPosts = async(req, res) => {
	try {

		// const api = await axios.get('https://jsonplaceholder.typicode.com/posts')

		// console.log(apiPosts.data)

		// const apiPosts = api.data

    const dbPosts = await Post.find()
;

		// const allPosts = [...apiPosts, ...dbPosts]
    res.status(200).json(dbPosts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

const modifyPost = async(req, res) => {
	const postId = Number(req.params.id);
  const { title, description } = req.body;

  try {
    // Buscar el post por su ID
    const existingPost = await Post.findOne({ id: postId }); // Cambia 'id' por el nombre del campo que almacena el ID en tu modelo

    // Verificar si el post existe
    if (!existingPost) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    // Modificar los campos del post
    existingPost.title = title || existingPost.title;
    existingPost.body = description || existingPost.body;

    // Guardar los cambios en la base de datos
    await existingPost.save();

    res.status(200).json({ message: 'Post modificado exitosamente', modifiedPost: existingPost });
  } catch (err) {
    res.status(500).json({ message: 'Error al modificar el post', error: err.message });
  }
}

const CreateAndDeleteComments = async(req, res ) => {
	const postId = Number(req.params.id);
  const { content, userId, name, deleteCommentId } = req.body;

  try {
    // Buscar el post por su ID
    const existingPost = await Post.findOne({ id: postId }); // Cambia 'id' por el nombre del campo que almacena el ID en tu modelo

    // Verificar si el post existe
    if (!existingPost) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    // Modificar los campos del post si se proporcionan valores
    // if (title !== undefined) {
    //   existingPost.title = title;
    // }

    // if (body !== undefined) {
    //   existingPost.body = body;
    // }

    // Agregar un nuevo comentario si se proporciona
    if (content !== undefined) {
      existingPost.comments.push({content: content,
      userId: userId,
      name: name,
      _id: uuidv4()
      });
    }

    // Eliminar un comentario si se proporciona el ID
    if (deleteCommentId !== undefined) {
      existingPost.comments = existingPost.comments.filter(comment => comment._id != deleteCommentId);
    }

    

    // Guardar los cambios en la base de datos
    await existingPost.save();

    res.status(200).json({ message: 'Post modificado exitosamente', modifiedPost: existingPost });
  } catch (err) {
    res.status(500).json({ message: 'Error al modificar el post', error: err.message });
  }
}

module.exports ={
	createPost,
	deletePost,
	getCommentByPostId,
	getCommentPostById,
	getPostById,
	getPosts,
	modifyPost,
	CreateAndDeleteComments
}