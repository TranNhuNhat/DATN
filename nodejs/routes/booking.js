const router = require("express").Router();
const bookingController = require('../controllers/bookingController');



router.post("/:roomId",bookingController.booking_create);
router.get("/",bookingController.booking_all);
router.get("/name",bookingController.booking_name);
router.get("/approved",bookingController.booking_approved);
router.get("/notapproved",bookingController.booking_notapproved);
router.get("/:bookingId",bookingController.booking_details);
router.put("/:bookingId",bookingController.booking_update);
router.put("/updateApproved/:bookingId",bookingController.booking_updateApproved);
router.delete("/:bookingId",bookingController.booking_delete);


module.exports = router;