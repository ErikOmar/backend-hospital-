const mongoose = require('mongoose');

// Conexión al a base de datos
const dbConnection = async () => {
    //mean_user
    //tCGLB26CyQGu8yN
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log("Base de datos: \x1b[32m%s\x1b[0m", "online");
        // console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos, ver logs');
    }

}

/* mongoose.connection.openUri(
    "mongodb://localhost:27017/hospitalDB",
    (err, res) => {
      if (err) throw err;
      console.log("Base de datos: \x1b[32m%s\x1b[0m", "online");
    }
  ); */

  module.exports = {
    dbConnection
  }