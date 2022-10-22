// const mostrart=(mostrar)=>{
//     console.log(mostrar)
// }
// mostrart("q onda gil")

// const saludar=(nombre)=> {
//     return `hola ${nombre}`
// }
// const mensaje=saludar("lautaro");
// console.log(mensaje)

// const calculadora=(num1,num2,operacion)=>{
//     return operacion(num1,num2)
// }
// const sumar=(a,b)=>a+b;
// const suma=(calculadora(10,10,sumar))
// console.log(suma)



// const restar=(a,b)=>a-b;
// const resta=calculadora(10,10,restar)
// console.log(resta)


// const multiplicar=(a,b)=>a*b;
// const multiplica=calculadora(10,10,multiplicar)
// console.log(multiplica)


// const dividir=(a,b)=>a/b;
// const dividi=calculadora(10,10,dividir)
// console.log(dividi)

// const  multiplicar=(num1,num2)=>{
//     if(typeof num1 !== 'number' || typeof num2 != 'number'){
//         return Promise.reject("los nu")
//     }
//     return new Promise((resolve, reject) => {


//     setTimeout(()=>{

//         resolve({
//             num1,
//             num2,
//             result:num1*num2
//         })
//     },Math.floor(Math.random()*2000))})
// }

// multiplicar(15,10)    
//     .then(response=>{
//         console.log(`${response.num1} * ${response.num2} = ${response.result }`)
//          return multiplicar(2,2)
//     })
//     .then(response=>{
//         console.log(`${response.num1} * ${response.num2} = ${response.result }`)
//     })

// let tiempo=5

// const timer=setInterval(() => {
//     console.log(`quedan ${tiempo}`)
//     tiempo++

//     if(tiempo===10){
//         clearInterval(timer);
//     }

// }, 1000);

// const delay=(ret)=>{
//     for (let i = 0; i <ret*3e6; i++);
// };


// function hacerTarea(num){
//     console.log(`hacer tarea `+ num)
//     delay(1000)
// }

// console.log("inicio de tarea");
// hacerTarea(1)
// hacerTarea(2)
// hacerTarea(3)
// hacerTarea(4)
// console.log("fin de tarea")
// console.log("otras tareas...")

// function mostrarLetras(palabra,fin) {
//     let i = 0
//     const timer = setInterval(() => {
//         if (i < palabra.length) {
//             console.log(palabra[i])
//             i++

//         }else{
//             clearInterval(timer)
//             fin()

//         }
//     }, 1000);

// }

// const fin=()=>console.log("termine");

// setTimeout(() => {
//     mostrarLetras(`hola`, fin)
// },0 );

// setTimeout(() => {
//     mostrarLetras(`hola`, fin)
// },250 );

// setTimeout(() => {
//     mostrarLetras(`hola`, fin)
// },250 );
const fs = require('fs')

// const datos=fs.readFileSync('datos.txt','utf-8');
// console.log(datos)

// fs.writeFileSync('datos.txt','que hace compañero','utf-8')

// fs.appendFileSync('datos.txt',' \ncompañerito','utf-8')
// try{
// fs.unlinkSync('datos.txt',' \ncompañerito','utf-8')
// }
// catch(err){
// console.log(err)
// }
// console.log('fin del programa')

// fs.readFile('datos.txt','utf-8',(error,dato)=>{
//     if(error){
//         console.log(error)
//     }else{
//         console.log(dato)
//     }
// })

// fs.readFile('package.json', 'utf-8', (error,contenido)=>{
//     if(error){throw new error('erro al leer el archivo')}
//         console.log(contenido)

//         const info={
//             contenido:contenido,
//             contenidoObjeto:JSON.parse(contenido),
//             size:contenido.length
//         }
//         fs.writeFile('info.txt',JSON.stringify(info),(error)=>{
//             if(error){throw new error('erro al leer el archivo')}
//         })

// })

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
}

const newArchivo = new Contenedor("productos.txt");

let objeto=[{
    id: 1,
    nombre: 'helado de crema de oreo ',
    imagen: './img/oferta1.jpg',
}, {
    id: 2,
    nombre: ' cofler dulce de leche ',
    precio: 2000,
    imagen: './img/oferta2.jpg',
},{
    id: 3,
    nombre: 'helado de frutilla y crema',
    imagen: './img/oferta3.jpg',

}]

newArchivo.save(objeto)



