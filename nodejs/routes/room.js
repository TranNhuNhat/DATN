const router = require("express").Router();
const roomController = require('../controllers/roomController');



router.post("/:homestayId",roomController.room_create);
router.get("/",roomController.room_all);
router.get("/search/:key",roomController.room_searchs);
router.get("/booking/:roomId", roomController.room_bookings);
router.get("/booking/:roomId/approved", roomController.room_bookings_approved);
router.get("/booking/:roomId/date", roomController.room_bookings_date);
router.get("/:roomId",roomController.room_details);
router.put("/:roomId",roomController.room_update);
router.delete("/:roomId/:homestayId",roomController.room_delete);


module.exports = router;