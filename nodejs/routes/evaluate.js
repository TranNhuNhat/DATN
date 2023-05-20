const router = require("express").Router();
const evaluateController = require('../controllers/evaluateController');



router.post("/:homestayId",evaluateController.evaluate_create);
router.get("/",evaluateController.evaluate_all);
router.get("/approved",evaluateController.evaluate_approved);
router.get("/approved/search/:key",evaluateController.evaluate_approved_search);
router.get("/notapproved",evaluateController.evaluate_notapproved);
router.get("/notapproved/search/:key",evaluateController.evaluate_notapproved_search);
router.get("/:evaluateId",evaluateController.evaluate_details);
router.put("/updateApproved/:evaluateId",evaluateController.evaluate_updateApproved);
router.delete("/:evaluateId/:homestayId",evaluateController.evaluate_delete);


module.exports = router;