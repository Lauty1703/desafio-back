import knex from "knex";


class ContenedorSQL{
    constructor(config,table,db){
        this.knex=knex(config),
        this.table=table,
        this.db=db
    }


   async listar(id){
    try {
        return this.knex.select('*').from(this.table).where('id',id)
        
    } catch (error) {
        console.log('se produjo un error en listar por id')
        
    }
    }

    async listarTodo(){
        try {
            if(this.db=="sqlite3"){
                return this.knex.select('*').from(this.table)
            
            }

            
        } catch (error) {
            console.log('se produjo un error a la hora de agregare un producto')
        }
    }
    async save(prod) {
        try {
            // console.log(prod.fechayhora)
            // const addProd={autor:prod.autor,
            //     texto:prod.texto,

                
            // }
            if(this.db=="sqlite3"){
                    await this.knex(`${this.table}`).insert(prod)
                    console.log(`se agrego con exito en la base :${this.db} en la tabla: ${this.table}`)
            }

            
        } catch (error) {
            console.log(error);
        }
    }
}
export default ContenedorSQL