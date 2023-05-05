const router = require("express").Router();
const homestayController = require('../controllers/homestayController');


router.post("/post",homestayController.homestay_create);
router.get("/district", homestayController.homestay_district);
router.get("/room/:homestayId", homestayController.homestay_rooms);
router.get("/:homestayId", homestayController.homestay_details); 
router.put("/:homestayId", homestayController.homestay_update);
router.delete("/:homestayId", homestayController.homestay_delete);
router.get("/", homestayController.homestay_all);

module.exports = router;