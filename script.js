class Usuario{
    constructor(nombre, apellido ,libros ,mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [libros]
        this.mascotas =[...mascotas]
    }
    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }
    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota)
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(nombreLibro, autor){
        this.libros.push({ nombre: nombreLibro, autor: autor })
    }
    getBookNames(){
        return this.libros.map((item)=>item.nombre)
    }
}

let usuario1 = new Usuario("lautaro", "fernandez" ,{nombre: "Harry Potter y la piedra filosofal\n" ,autor:"J. K. Rowling"},["perro","gato"])

console.log( `\nNombre de usuario: ${usuario1.getFullName()}`)


console.log( `Cantidad de mascotas anteriormente: ${usuario1.countMascotas()}\n`)
usuario1.addMascota("loro")
console.log( `Cantidad de mascotas actualmente: ${usuario1.countMascotas()}\n`)

console.log(`lista de libros antes :\n${usuario1.getBookNames()}`)
usuario1.addBook("el señor de las moscas", "willian Goldin")

console.log(`lista de libros  :\n${usuario1.getBookNames()}\n`)