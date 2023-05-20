const Homestay = require("../models/Homestay");
const Room = require("../models/Room");
const Evaluate = require("../models/Evaluate");
const Booking = require("../models/Booking");

//get all homestay
const homestay_all  = async (req,res)=> {
    try {
        const homestays = await Homestay.find();
        res.json(homestays)
    } catch (error) {
        res.status(500).send(error)
    }
};

//get some homestays
const homestay_some  = async (req,res)=> {
    try {
        const homestays = await Homestay.find({}).limit(8);
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





//get homestaEvaluates
const homestay_evaluates  = async (req,res,next)=> {
    try {
        const homestay = await Homestay.findById(req.params.homestayId);
        const list = await Promise.all(
            homestay.evaluates.map((evaluate) => {
                return Evaluate.findById(evaluate)
            })
        );
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
};

//get homestaEvaluates approved true
const homestay_evaluates_approved  = async (req,res,next)=> {
    try {
        const homestay = await Homestay.findById(req.params.homestayId);
        const list = await Promise.all(
            homestay.evaluates.map((evaluate) => {
                return Evaluate.findById(evaluate)
            })
        );
        const abcd = list.filter((evaluate) => {
            console.log(evaluate);
            return `${evaluate.approved}` === 'true' 
        }) 
        console.log(abcd);
        res.status(200).json(abcd)
    } catch (error) {
        next(error)
    }
};

// search homestay
const homestay_searchs  = async (req,res,next)=> {
    try {
        let result = await Homestay.find({
            "$or":[
                {
                    code: { $regex: req.params.key}
                },
                {
                    name: { $regex: req.params.key}
                },
                {
                    address: { $regex: req.params.key}
                },
            ]
        });
        res.status(200).json(result);
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
    homestay_evaluates,
    homestay_searchs,
    homestay_some,
    homestay_evaluates_approved,
}
