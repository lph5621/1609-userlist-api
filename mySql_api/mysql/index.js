var mysql = require("mysql");

var config = {
    host:"127.0.0.1",
    port:"3306",
    user:"root",
    password:"8222pan",
    database:"1609"
}

var pool = mysql.createPool(config);

function query(sql){
    return new Promise((resolve,reject)=>{
        //从连接池获取一条连接
        pool.getConnection((err,connect)=>{

            connect.query(sql,function(sqlerr,rows,filed){
                if(sqlerr){
                    reject(sqlerr)
                    return
                }
                resolve(rows)
                //释放连接
                connect.release()
            })
        })
    })
}

module.exports = {
    query
}
