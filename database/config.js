const mongoose = require('mongoose')


const dbConnection = async () =>{

    //mongoose
    try{
            mongoose.connect(process.env.DB_CNN,{
                            userNewUrlParser:true,
                            useUnifiedTopology: true,
                            useCreateIndex: true

            });
            console.log('Se ha conectado correctamente')
    } catch(error){

        console.log(error)
        throw new Error('Error a la hora de iniciar la BD ver Logs')
    }

}


module.exports = {
    dbConnection
}