const {Pool}= require('pg')
const Cursor=require('pg-cursor')
const moment = require('moment')

const config = {
    user: "postgres",
    host: "localhost",
    password: "13991987Ft",
    database: "banco",
    port: 5432,
    };
    const pool = new Pool(config);

const ingresar=(arr)=>{
    // transferir n°cuenta1 a n°cuenta2 monto
    // node index.js transferir 1 2 20000
    pool.connect(async (error_conexion, client, release) => {
        if(error_conexion) return console.error(error_conexion);
        try{
            await client.query("BEGIN")
            const descontar =`UPDATE cuentas SET saldo = saldo - ${arr[2]} WHERE id =${arr[0]} RETURNING *;`
            const descuento = await client.query(descontar)
            const acreditar=`UPDATE cuentas SET saldo = saldo + ${arr[2]} WHERE id =${arr[1]} RETURNING *;`
            const acreditacion = await client.query(acreditar);
            const transaccion=`INSERT INTO transacciones (descripcion, fecha, monto, cuenta) VALUES ('Trasferencia cuenta ${arr[0]} a cuenta ${arr[1]}', '${moment().format("MMM Do YY")}', ${arr[2]}, ${arr[0]}) RETURNING *;`
            const registro = await client.query(transaccion);
            console.log("Descuento realizado con éxito: ", descuento.rows[0]);
            console.log("Ingreso realizado con éxito: ",acreditacion.rows[0]);
            console.log("Transacción registrada con éxito: ",registro.rows[0]);
            await client.query("COMMIT");
        }catch(e){
            await client.query("ROLLBACK")
            console.log("Error código: " + e.code);
            console.log("Detalle del error: " + e.detail);
            console.log("Tabla originaria del error: " + e.table);
            console.log("Restricción violada en el campo: " + e.constraint);
        }
        release();
        pool.end();
        });
};

const transacciones=(arr)=>{
    // console.log(arr)
     //node index.js transacciones 10 1
    pool.connect( async(error_conexion, client, release) => {
        if(error_conexion) return console.error(error_conexion);
        try{
            await client.query("BEGIN")
            const consulta = new Cursor(`select * from transacciones WHERE cuenta=${arr[1]}`);
            const cursor = client.query(consulta);
            cursor.read(arr[0], (err, rows) => {
                if(err) return console.error(`ERROR EN EL CURSOR: ${err}`);
                console.log('----------------------------')
                console.log(`total ${rows.length} transacciones desde cuenta ${arr[1]}:`, rows);
                cursor.close();
                release();
                pool.end();
            })
        }catch(e){
            await client.query("ROLLBACK")
            console.log("Error código: " + e.code);
            console.log("Detalle del error: " + e.detail);
            console.log("Tabla originaria del error: " + e.table);
        }        
    });    
}

const saldo=(arr)=>{
    //node index.js saldo 1
    pool.connect( async(error_conexion, client, release) => {
        if(error_conexion) return console.error(error_conexion);
        try{
            await client.query("BEGIN")
            const consulta = new Cursor(`SELECT saldo FROM cuentas WHERE id=${arr[0]}`);
            const cursor = client.query(consulta);
            cursor.read(1, (err, rows) => {
                if(err) return console.error(`ERROR EN EL CURSOR: ${err}`);
                console.log('----------------------------')
                console.log(`total saldo en cuenta ${arr[0]}:`, rows[0].saldo +" Chelines");
                cursor.close();
                release();
                pool.end();
            })
        }catch(e){
            await client.query("ROLLBACK")
            console.log("Error código: " + e.code);
            console.log("Detalle del error: " + e.detail);
            console.log("Tabla originaria del error: " + e.table);
        }        
    });    
};

    module.exports ={ingresar, transacciones, saldo}