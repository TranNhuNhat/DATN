const router = require("express").Router();
const roomtypeController = require('../controllers/roomtypeController');



router.post("/",roomtypeController.roomtype_create);
router.get("/",roomtypeController.roomtype_all);
router.get("/:roomtypeId",roomtypeController.roomtype_details);
router.put("/:roomtypeId",roomtypeController.roomtype_update);
router.delete("/:roomtypeId",roomtypeController.roomtype_delete);


module.exports = router;