const router = require("express").Router();
const adminController = require('../controllers/adminController');



router.post("/login",adminController.admin_login);
router.post("/register",adminController.admin_register);



module.exports = router;