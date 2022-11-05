

class Contenedor{
    constructor (){
        this.productos=[];
    }

    newId=1;

    getAll(){
        return this.productos;
    }

    getProdId(id){
        let oneProd= this.productos.filter(p=> p.id== Number(id))
        return oneProd;
    }

    postProd(prod){
        prod.id = this.newId ++;

        this.productos.push(prod);
        
    }
}


const products= new Contenedor();

const express = require('express');
const app = express();
const path = require('path');
const router=express.Router();

const port = 8080 || process.env.PORT;

app.set('views', './views');
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({extended:true}));



// agregar producto
router.get('/agregarProducto', (req, res)=>{
    res.render('addproduct')
})

// mostrar productos
router.get('/mostrarProductos', (req, res)=>{
    const data = products.getAll();
    res.render('productos', {productos:data})
})


router.post('/', (req,res)=>{
    let datos = products.postProd(req.body);
    res.redirect('/productos/agregarProducto')

})

router.get('/detalle/:id', (req,res) =>{
    let oneProd= products.getProdId(req.params.id);
    if(oneProd.length == 0){
        res.send('Producto no encontrado')
    }else{
        res.render('productos', {productos: oneProd});
    }
})



app.use('/productos', router);

const server = app.listen(port,()=>{
    console.log(`se esta escuchando en el puerto ${port}`)
})

server.on('error', err=>(console.log(err)));




// let products=[
//     {
//         title:"Computadora",
//         price: "130.000",
//         thumbnail: "https://www.tecnologia-informatica.com/wp-content/uploads/2018/07/funciones-de-la-computadora-1.jpeg"
//     }
// ]
