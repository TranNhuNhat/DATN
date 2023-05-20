const router = require("express").Router();
const homestayController = require('../controllers/homestayController');

router.get("/some", homestayController.homestay_some);
router.post("/post",homestayController.homestay_create);
router.get("/district", homestayController.homestay_district);
router.get("/search/:key", homestayController.homestay_searchs);
router.get("/room/:homestayId", homestayController.homestay_rooms);
router.get("/evaluate/:homestayId", homestayController.homestay_evaluates);
router.get("/evaluate/:homestayId/approved", homestayController.homestay_evaluates_approved);
router.get("/:homestayId", homestayController.homestay_details); 
router.put("/:homestayId", homestayController.homestay_update);
router.delete("/:homestayId", homestayController.homestay_delete);
router.get("/", homestayController.homestay_all);

module.exports = router;