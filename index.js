import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';



const app = express();

//conectar la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch (error => console.log(error))

//definir puerto
const port = process.env.PORT || 4000;

//habilitar PUG
app.set('view engine', 'pug');

//Obtener el año actual
app.use((req, res, next) => { //req es lo que estas mandando al servidor 
    const year = new Date(); //res lo que el servidor me manda a mi
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";
    return next();           // next termino y lo manda al middleware  
    
})                            

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//definir la carpeta publica
app.use(express.static('public'));


//agregar router
app.use('/', router); 


app.listen(port, () =>{
    console.log(`el servidor esta funcionando en el puerto ${port}`)
})