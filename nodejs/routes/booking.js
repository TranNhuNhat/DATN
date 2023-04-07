const router = require("express").Router();
const bookingController = require('../controllers/bookingController');



router.post("/",bookingController.booking_create);
router.get("/",bookingController.booking_all);
router.get("/code",bookingController.booking_detailscode);
router.get("/:bookingId",bookingController.booking_details);
router.put("/:bookingId",bookingController.booking_update);
router.delete("/:bookingId",bookingController.booking_delete);


module.exports = router;