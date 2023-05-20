const router = require("express").Router();
const bookingController = require('../controllers/bookingController');



router.post("/:roomId",bookingController.booking_create);
router.get("/",bookingController.booking_all);
router.get("/date",bookingController.booking_date);
router.get("/approved",bookingController.booking_approved);
router.get("/approved/search/:key",bookingController.booking_approved_search);
router.get("/notapproved",bookingController.booking_notapproved);
router.get("/notapproved/search/:key",bookingController.booking_notapproved_search);
router.get("/:bookingId",bookingController.booking_details);
router.put("/:bookingId",bookingController.booking_update);
router.put("/updateApproved/:bookingId",bookingController.booking_updateApproved);
router.delete("/:bookingId/:roomId",bookingController.booking_delete);


module.exports = router;