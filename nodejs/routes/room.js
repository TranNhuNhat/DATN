const router = require("express").Router();
const roomController = require('../controllers/roomController');



router.post("/:homestayId",roomController.room_create);
router.get("/",roomController.room_all);
router.get("/:roomId",roomController.room_details);
router.get("/booking/:roomId", roomController.room_bookings);
router.put("/:roomId",roomController.room_update);
router.delete("/:roomId/:homestayId",roomController.room_delete);


module.exports = router;