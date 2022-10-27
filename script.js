
const fs = require('fs')

class Contenedor {
    constructor(nameArchivo) {
        this.nameArc = nameArchivo
    }

    async save(object) {
        let auxArray = []
        try {
            const data = await fs.promises.readFile(this.nameArc, "utf-8")
            auxArray = JSON.parse(data)
            let idArray = auxArray.map(obj => obj.id)
            let highId = Math.max(...idArray)
            object.id = highId + 1;
            auxArray.push(object);
            fs.writeFileSync(this.nameArc, JSON.stringify(auxArray))
        }
        catch {
            object.id = 0;
            auxArray.push(object);
            fs.writeFileSync(this.nameArc, JSON.stringify(auxArray))
        }
        return object.id
    }
    async getById(number) {
        try {
            const data = await fs.promises.readFile(this.nameArc, "utf-8")
            let auxArray = JSON.parse(data)
            const object = auxArray.find(obj => obj.id === number)
            return object
        }
        catch {
            return null
        }
    }
    async getAll() {
        try {
            const data = await fs.promises.readFile(this.nameArc, "utf-8")
            const auxArray = JSON.parse(data)
            return auxArray
        }
        catch {
            return null
        }
    }
    async deleteById(number) {
        try {
            const data = await fs.promises.readFile(this.nameArc, "utf-8")
            const auxArray = JSON.parse(data)
            const newArray = auxArray.filter(obj => obj.id !== number)
            fs.writeFileSync(this.nameArc, JSON.stringify(newArray))
        }
        catch {
            return "No hay objetos en el archivo"
        }
    }
    deleteAll() {
        fs.writeFileSync(this.nameArc, "")
    }
    
    async getRandom(){
        try {
            let products = await this.getAll();
            let productsJSON = JSON.parse(products)
            let random= Math.floor(Math.random()*productsJSON.length)
            return productsJSON[random]
        } catch (error) {
            return []
        }
    }

}


objeto = [{
    id: 1,
    nombre: "rey",
    thumbnail:"https://i.ibb.co/S541325/oferta6.jpg"
},
{
    id: 2,
    nombre: "rey",
    thumbnail:"https://i.ibb.co/S541325/oferta2.jpg"
},{
    id: 3,
    nombre : "rey",
    thumbnail:"https://i.ibb.co/S541325/oferta5.jpg"
}
]
const newArchivo = new Contenedor("./productos.txt");


// newArchivo.save(objeto).then(resolve => console.log(resolve));
// newArchivo.getById(1).then(resolve => console.log(resolve));
// newArchivo.getAll().then(resolve => console.log(resolve));
// newArchivo.deleteById(10);
// newArchivo.deleteAll();

console.log(newArchivo);
 


const express=require("express");
app=express();

const PORT=8080;

app.get('/productos',(req,res)=>{
    newArchivo.getAll()
    .then(resolve =>res.end("productos "+resolve) );


})

app.get('/productoRandom', (req,res)=>{
    newArchivo.getRandom()
    .then((resolve)=> {
        res.send(resolve)
    })
})


app.listen(PORT,()=>console.log(`http://localhost:${PORT}`))