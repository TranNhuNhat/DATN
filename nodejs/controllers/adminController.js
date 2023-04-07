const Admin = require("../models/Admin");


const admin_register  =  (req,res)=> {
    const username = req.body.username;
    const password = req.body.password;
    
    Admin.findOne({
        username:username
    })
    .then(data => {
        if(data){
            res.json('tai khoan da ton tai')
        }else{
            return Admin.create({ 
                username:username,
                password: password,
            })
        }
    })
        .then(data =>{   
            res.json("tao tai khoan thanh cong")     
        
        })   
        .catch (error=> {
        res.status(500).json('error')
        })
};


const admin_login  = async (req,res)=> {
    const username = req.body.username;
    const password = req.body.password;
    
         Admin.findOne({ 
            username:username,
            password: password,
        })
        .then(data =>{
            if(data){
                res.json("exist")
            }else{
                res.status(400).json("notexist")
            }
        })
        
        .catch (error=> {
        res.status(500).json('error')
        })
};

module.exports = {
    admin_register,
    admin_login 
}