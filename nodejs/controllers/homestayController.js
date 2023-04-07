const Homestay = require("../models/Homestay");

//get all homestay
const homestay_all  = async (req,res)=> {
    try {
        const homestays = await Homestay.find();
        res.json(homestays)
    } catch (error) {
        res.status(500).send(error)
    }
};

//single homestay
const homestay_details = async (req,res)=> {
    try {
        const homestay = await Homestay.findById(req.params.homestayId);
        res.json(homestay)
    } catch (error) {
        res.status(500).send(error)
    }
};


//get  homestay by name
const homestay_district  = async (req,res)=> {
    try {
        console.log( req.query.district );
        const homestays = await Homestay.find({ district: req.query.district});
        res.json(homestays)
    } catch (error) {
        res.status(500).send(error)
    }
};


//add new homestay
const homestay_create = async (req, res) => {
    console.log(req.body);

    // const fileBuffer = fs.readFileSync(req.file.path).toString('base64');
    // // read the img file from tmp in-memory location
    // var newImg = fs.readFileSync(req.file.path);
    // // encode the file as a base64 string.
    // var encImg = newImg.toString('base64');

    const homestay = new Homestay({
        code: req.body.code,
        name: req.body.name,
        address: req.body.address,
        district: req.body.district,
        numroom: req.body.numroom,
        rating: req.body.rating,
        img: req.body.img,
    });
    
    try {
        
        const savedHomestay = await homestay.save();
        res.send(savedHomestay);
    } catch (error) {
        res.status(400).send(error)
    }
}

//update homestay
const homestay_update = async (req,res)=> {
    try {
        const homestay = {
            code: req.body.code,
            name: req.body.name,
            address: req.body.address,
            district: req.body.district,
            numroom: req.body.numroom,
            rating: req.body.rating,
            image: req.body.img,
        };

        const updatedHomestay = await Homestay.findByIdAndUpdate(
            { _id: req.params.homestayId },
            homestay
        );
        res.json(updatedHomestay)
    } catch (error) {
        res.json({message: error})
    }
};

//delete homestay
const homestay_delete = async (req,res)=> {
    try {
        const removeHomestay = await Homestay.findByIdAndDelete(req.params.homestayId);
        res.json(removeHomestay);
    } catch (error) {
        res.json({message: error})
    }
};

module.exports = {
    homestay_all,
    homestay_details,
    homestay_create,
    homestay_update,
    homestay_delete,
    homestay_district,
}
