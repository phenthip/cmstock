const express = require("express");
const router = express.Router()
const user = require("./models/user");
const bcrypt = require("bcryptjs");
const constants = require("./constant");

router.post("/login",async (req,res)=>{
    const { username, password } = req.body;

    let result = await user.findOne({ where: { username: username } });
    if (result != null) {
      if (bcrypt.compareSync(password, result.password)) {
        res.json({
          result: constants.kResultOk,
          message: JSON.stringify(result)
        });
      } else {
        res.json({ result: constants.kResultNok, message: "Incorrect password" });
      }
    } else {
      res.json({ result: constants.kResultNok, message: "Incorrect username" });
    }
})

router.post("/register",async (req,res)=>{
    try{
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        let result = await user.create(req.body)
        res.json({result: constants.kResultOk, massage: JSON.stringify(result)})
        
        // user.create(req.body).then(result=>{
        //     res.json({result: constants.kResultOk, massage: JSON.stringify(result)})    
        // })
    }catch(error){
        res.json({result: constants.kResultNok, massage: JSON.stringify(error)})
    }
    
})

module.exports = router;