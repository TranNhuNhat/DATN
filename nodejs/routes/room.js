const router = require("express").Router();
const roomController = require('../controllers/roomController');



router.post("/",roomController.room_create);
router.get("/",roomController.room_all);
router.get("/:roomId",roomController.room_details);
router.put("/:roomId",roomController.room_update);
router.delete("/:roomId",roomController.room_delete);


module.exports = router;