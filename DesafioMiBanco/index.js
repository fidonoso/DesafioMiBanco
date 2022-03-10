const {ingresar, transacciones, saldo}=require('./consultas.js')

let op=process.argv[2]
    if(op=='transferir'){  
        // transferir n°cuenta1 a n°cuenta2 monto
        //node index.js transferir 1 2 20000 ==>> transfiere 20000 desde la cuenta 1 hacia la cuenta 2
        let reg=process.argv.slice(3).map(nu=>parseInt(nu))
        console.log(reg)
        ingresar(reg);
    
    }else if(op=='transacciones'){
        //node index.js transacciones 10 1 ==>> consulta 10 transacciones de la cuenta 1
        let reg=process.argv.slice(3).map(nu=>parseInt(nu))
        transacciones(reg);
    
    }else if(op=='saldo'){
        let reg=process.argv.slice(3).map(nu=>parseInt(nu))
        // node index.js saldo 1  ==>> consulta saldo cuenta 1
        saldo(reg)
    
    }else{
    console.log('opcion no valida. Inténtelo denuevo')    
    }