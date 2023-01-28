
import ContenedorSQL from './contenedor/contenedorSQL.js';
import sqliteOptions from './src/config/knex.js';
import __dirname from './utils.js'
import router from './src/routes/routerWeb.js'
import { Server } from 'socket.io'

const messagesSQL = new ContenedorSQL(sqliteOptions, 'mensaje', 'sqlite3')
const productosSQL = new ContenedorSQL(sqliteOptions, 'productos', 'sqlite3')
const messageEmailText = new ContenedorSQL(sqliteOptions, 'messageEmailText', 'sqlite3')


import express from 'express'
const app = express();
const PORT = 8080



app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.use('/', router)



const server = app.listen(PORT, () => {
    console.log(`puerto en  ${PORT}`)
})
const io = new Server(server)


const messages = [];
const producto = [];
const mensajesProyecto = [];
io.on('connection', socket => {
    console.log("se conecto un usuario");
    socket.emit('logs', messages)



    socket.on('message', async (data) => {
        messages.push(data);
        //  console.log(messages)
        // console.log(data)
        const agregarADb = [{ user: `${data.user}`, menssage: `${data.menssage}` }]
        await messagesSQL.save(agregarADb)
        let resu = await messagesSQL.listarTodo()
        console.log(resu)
        io.emit('logs', messages)
    })



    socket.emit('prodPantalla', producto)
    socket.on('datosProductos', async (data) => {
        producto.push(data)
        console.log(producto)

        //   console.log(data)
        const agregarADb = [{ nombreProduct: `${data.nombreProduct}`, precio: `${data.precio}`, urlFoto: `${data.imagProduct}` }]

        let resu = await productosSQL.save(agregarADb)
        let resu2 = await productosSQL.listarTodo()
        console.log(resu2)
        // console.log(resu)

        io.emit('prodPantalla', producto)
    })


    socket.emit('mensajePantalla', mensajesProyecto)
    socket.on('datosMensaje', async (data) => {
        //         console.log(data)
        mensajesProyecto.push(data);

        const agregarADb = [{ email: `${data.email}`, text: `${data.texto}` }]

        let resu = await messageEmailText.save(agregarADb)
        let result = await messageEmailText.listarTodo()
        console.log(result)


        io.emit('mensajePantalla', mensajesProyecto)

    })
})
