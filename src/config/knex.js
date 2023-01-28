import knex from 'knex'
const mysqlOptions = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'baseentregalbe'
    }

}
const sqliteOptions = {
    client: 'sqlite3',
    connection: {
        filename: 'DB/ecomerce.sqlite'
    },
    useNullAsDefault: true
}

const db = knex(sqliteOptions)
try {
    let exist = await db.schema.hasTable('mensaje')
    console.log(exist)

    if (!exist) {
        await db.schema.createTable('mensaje', table => {
            table.primary('id'),
            table.increments('id'),
            // id INT AUTO_INCREMENT,PRIMARY KEY (id)

          table.string('user', 35).nullable(false);
            table.string('menssage', 20).nullable(false);
            console.log(`tabla de mensajes creada`)
            

        })
    }


} catch (error) {
    console.log(error)

}
try {
    let exist = await db.schema.hasTable('productos')
    console.log(exist)

    if (!exist) {
        await db.schema.createTable('productos', table => {
            table.primary('id'),
            table.increments('id'),
            // id INT AUTO_INCREMENT,PRIMARY KEY (id)

          table.string('nombreProduct', 35).nullable(false);
          table.string('urlFoto', 50).nullable(false)
          table.integer('precio', 10)

          console.log(`tabla de productos creada`)
          

        })
    }


} catch (error) {
    console.log(error)

}





try {
    let exist = await db.schema.hasTable('messageEmailText')
    console.log(exist)

    if (!exist) {
        await db.schema.createTable('messageEmailText', table => {
            table.primary('id'),
            table.increments('id'),
            // id INT AUTO_INCREMENT,PRIMARY KEY (id)

          table.string('email', 35).nullable(false);
          table.string('text', 80).nullable(false)

          console.log(`tabla de messageEmailText creada`)
          

        })
    }


} catch (error) {
    console.log(error)

}
export default sqliteOptions;

