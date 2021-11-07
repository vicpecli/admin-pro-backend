const mongoose = require('mongoose')


const dbConnection = async () =>{

    //mongoose
    try{
           await mongoose.connect('mongodb+srv://App_testing:App_testing@cluster0.vinqi.mongodb.net/hospitaDB',{
                            // userNewUrlParser:true,
                            // useUnifiedTopology: true,
                            // useCreateIndex: true

            });
            console.log('Se ha conectado correctamente a la base de datos')
    } catch(error){
        console.log(error)
        throw new Error('Error a la hora de iniciar la BD ver Logs')
    }

}


module.exports = {
    dbConnection
}