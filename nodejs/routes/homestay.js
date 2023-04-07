const router = require("express").Router();
const homestayController = require('../controllers/homestayController');
// const multer = require('multer');
// var fs = require('fs');
// const path = require("path");

//cb:callback
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname)
//     },
// });

// const fileFilter = (req, file, cb) => {
//     // reject a file
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// });


router.post("/post",homestayController.homestay_create);
router.get("/", homestayController.homestay_all);
router.get("/district", homestayController.homestay_district);
router.get("/:homestayId", homestayController.homestay_details);
router.put("/:homestayId", homestayController.homestay_update);
router.delete("/:homestayId", homestayController.homestay_delete);


module.exports = router;