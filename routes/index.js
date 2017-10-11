var express = require('express');
var router = express.Router();
var connection =require('../utils/db');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname  )
  }
});
var upload = multer({ storage: storage })



//var upload = multer({ storage: Storage })
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index');
});



router.get('/next', function(req, res, next) {
  res.render('address');
});

router.post('/load',upload.any(),function(req,res){
    
     console.log(req.body);
     console.log(req.files);
     //console.log(req.file);

     var user={
       name:req.body.name,
       email:req.body.email,
       image:'req.files.originalname'
     }

     connection.query(`INSERT INTO users SET ?`,user,function(err,result){
       if(err) throw err
         console.log(result.insertId);
         connection.query(`SELECT * FROM users WHERE ID LIKE ${result.insertId};`,function(err,results){
          if(err) throw err
          console.log(results);
          res.render('table', { name:results[0].name,email:results[0].email,image:results[0].image });
         })
      })
})

router.post('/address',function(req,res){
  
   console.log(req.body);
   connection.query(`INSERT INTO address SET ?`,req.body,function(err,result){
     if(err) throw err
       console.log(result.insertId);
       connection.query(`SELECT * FROM address WHERE ID LIKE ${result.insertId};`,function(err,results){
        if(err) throw err
        console.log(results);
        res.render('table', { name:results[0].address,email:results[0].phone,image:results[0].id});
       })
    })
})

module.exports = router;
