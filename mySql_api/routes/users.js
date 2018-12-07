var express = require('express');
var router = express.Router();

var query = require("../mysql").query; //连接数据库连接池
console.log(query)

//查找信息
router.get('/api/userlist', function(req, res, next) {
  
  let sql = `select * from userlist order by id desc`;
    query(sql).then((rows)=>{

      console.log(rows)
      res.json({code:1,msg:"查找成功",data:rows})

    }).catch((err)=>{
      res.json({code:0,msg:err})
    })
});

//添加信息

router.post('/api/add',function(req,res,next){
    let {username,age,tel,address,id_card} = req.body;

    let sql = `select * from userlist`;
    query(sql).then((rows)=>{
        let state = rows.some((i)=>{
            if(i.username == username){
              return true
            }else{
              return false
            }
        })
        if(state){
          res.json({code:0,msg:"添加失败"})
        }else{
          let sql = `insert into userlist (username,age,tel,address,id_card) values('${username}',${age},'${tel}','${address}','${id_card}')`;
    
          query(sql).then((rows)=>{
            if(!username || !id_card){
              res.json({code:2,msg:"用户名或身份证不能为空"})
            }else{
              console.log(rows)
              res.json({code:1,mag:"添加成功"})
            }
          }).catch((err)=>{
            console.log(err)
            //res.json({code:0,msg:err})
          })
        }
    })

  //删除信息
router.get("/api/del",function(req,res,next){
  console.log(2221)
    let {id} = req.query;
    console.log(id)
    let sql = `delete from userlist where id=${id}`;

    query(sql).then((rows)=>{
      console.log(rows)
      res.json({code:1,msg:"删除成功"})
    }).catch((err)=>{
      console.log(err)
      res.json({code:0,msg:"删除失败"})
    })
})

//修改信息

router.post("/api/update", function(req, res, next) {
  console.log(111)
  let { id,username,age } = req.body;
  let sql = `update userlist set username='${username}',age=${age} where id=${id}`;
    query(sql).then((rows) => {
        //console.log(rows)
        res.json({
            code: "1",
            msg: "修改成功"
        })
    }).catch((err) => {
        //console.log(err)
        res.json({
            code: "0",
            msg: "修改失败"
        })
    })
  })
})

//查看详情
router.get("/api/detail",function(req,res,next){
  let {id} = req.query;
  let sql = `select * from userlist where id=${id}`;
  if(id){
    query(sql).then((rows)=>{
      res.json({code:1,data:rows})

    }).catch((err)=>{
      res.json({code:0,msg:error})
    })
  }else{
    res.json({code:2,mag:"缺少参数"})
  }
  
})
module.exports = router;
