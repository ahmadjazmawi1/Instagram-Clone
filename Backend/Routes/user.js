const router = require("express").Router();
let User = require("../Models/userModel");

router.post('/register', registerUser);
router.post('/login', login)
function registerUser(req, res, next){
    const {username, password} = req.body;
    User.findOne({username: username}, function(err, found){
        if(err){
            console.log(err);
        }
        if(found){
            res.send({message: "User already exists"});
            return;
        }
        else{
            User.create({username: username, password: password}, function(err, newInstance){
                if(err){ 
                    console.log("Error creating User: ", err);
                    res.status(400);
                }
                res.status(201);
                //res.status(200);
                return;
            });
            console.log("SUCCESS, USER CREATED SUCCESSFULLY");

        }
    })

}

function login(req, res, next){
    if(req.session.loggedin){
          res.status(200).send("Already logged in.");
          return;
      }
    
      let username = req.body.username;
      let password = req.body.password;
  
  
  
    User.find({username: req.body.username,password: req.body.password}, function(err, results){
      if(results.length==0){
              res.status(401).send("Unauthorized");
              console.log(err);
              return;
          }
  
      req.session.loggedin = true;
  
  
      //We set the username associated with this session
      //On future requests, we KNOW who the user is
      //We can look up their information specifically
      //We can authorize based on who they are
      req.session.username = username;
      req.session.userid=results[0]._id;
      res.status(200).render("pages/index",{session:req.session});
    });
  }
module.exports=router;