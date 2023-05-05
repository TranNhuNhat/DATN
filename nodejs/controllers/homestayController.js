const Homestay = require("../models/Homestay");
const Room = require("../models/Room");

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


//get  homestay by district
const homestay_district  = async (req,res)=> {
    try {
        console.log( req.query.district );
        const homestays = await Homestay.find({ district: req.query.district});
        res.status(200).json(homestays)
    } catch (error) {
        res.status(500).send(error)
    }
};



//add new homestay
const homestay_create = async (req, res) => {
    console.log(req.body);

    const homestay = new Homestay(req.body);
    
    try {    
        const savedHomestay = await homestay.save();
        res.send(savedHomestay);
    } catch (error) {
        res.status(400).send(error)
    }
}

//update homestay
const homestay_update = async (req,res)=> {
    console.log(req.body);
    console.log(req.params.homestayId);
    try {
        const homestay = {
            code: req.body.code,
            name: req.body.name,
            address: req.body.address,
            district: req.body.district,
            phone: req.body.phone,
            rating: req.body.rating,
            distance: req.body.distance,
            desc: req.body.desc,
            cheapestPrice:req.body.cheapestPrice,
            img: req.body.img,
            img1: req.body.img1,
            img2: req.body.img2,
            img3: req.body.img3,
            img4: req.body.img4,
        };

        const updatedHomestay = await Homestay.findByIdAndUpdate(
            { _id: req.params.homestayId },
            homestay
        );
        res.status(200).json(updatedHomestay)
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

//get homestayRooms
const homestay_rooms  = async (req,res,next)=> {
    try {
        const homestay = await Homestay.findById(req.params.homestayId);
        const list = await Promise.all(
            homestay.rooms.map((room) => {
                return Room.findById(room)
            })
        );
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
};


module.exports = {
    homestay_all,
    homestay_details,
    homestay_create,
    homestay_update,
    homestay_delete,
    homestay_district,
    homestay_rooms,
}
