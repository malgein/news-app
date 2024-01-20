const mongoose = require("mongoose");
const axios = require('axios')
const Post = require('../models/posts')
const User = require('../models/user')

let dataAlreadySaved = false

const getPostsAndSave = async () => {
  try {
    if (!dataAlreadySaved) {
      // Obtener posts de la API
      const apiResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
      const apiPosts = apiResponse.data;

      // Guardar los posts en la base de datos
      await Post.insertMany(apiPosts);

      // Actualizar la bandera indicando que los datos ya se han guardado
      dataAlreadySaved = true;
    }

    // Resto de la lógica de tu aplicación
  } catch (err) {
    console.error('Error al obtener y guardar los posts:', err.message);
  }
};

const getUsersAndSave = async () => {
  try {
    if (!dataAlreadySaved) {
      // Obtener posts de la API
      const apiResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
      const apiUsers = apiResponse.data;

      // Guardar los posts en la base de datos
      await User.insertMany(apiUsers);

      // Actualizar la bandera indicando que los datos ya se han guardado
      dataAlreadySaved = true;
    }

    // Resto de la lógica de tu aplicación
  } catch (err) {
    console.error('Error al obtener y guardar los usuarios:', err.message);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    // getUsersAndSave()
    // getPostsAndSave()
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with a non-zero status code to indicate an error
  }
};

module.exports ={
  connectDB,
  getPostsAndSave
} 