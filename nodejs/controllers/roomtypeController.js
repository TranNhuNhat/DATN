const Roomtype = require("../models/Roomtype");

//get all roomtypes
const roomtype_all  = async (req,res)=> {
    try {
        const roomtypes = await Roomtype.find();
        res.json(roomtypes)
    } catch (error) {
        res.status(500).send(error)
    }
};

//single roomtype
const roomtype_details = async (req,res)=> {
    try {
        const roomtype = await Roomtype.findById(req.params.roomtypeId);
        res.json(roomtype)
    } catch (error) {
        res.status(500).send(error)
    }
};



//add new roomtype
const roomtype_create = async (req,res)=> {
    
    const roomtype = new Roomtype({
        code: req.body.code,
        name: req.body.name,
        roomtype: req.body.roomtype,
        roomprice: req.body.roomprice,
        roomdesc: req.body.roomdesc,
    });
    try {
        const savedRoomtype = await roomtype.save();
        res.send(savedRoomtype);
    } catch (error) {
        res.status(400).send(error)
    }
};

//update roomtype
const roomtype_update = async (req,res)=> {
    try {
        const roomtype = {
            code: req.body.code,
            name: req.body.name,
            roomtype: req.body.roomtype,
            roomprice: req.body.roomprice,
            roomdesc: req.body.roomdesc,
        };

        const updatedRoomtype = await Roomtype.findByIdAndUpdate(
            { _id: req.params.roomtypeId },
            roomtype
        );
        res.json(updatedRoomtype)
    } catch (error) {
        res.json({message: error})
    }
};



//delete roomtype
const roomtype_delete = async (req,res)=> {
    try {
        const removeRoomtype = await Roomtype.findByIdAndDelete(req.params.roomtypeId);
        res.json(removeRoomtype);
    } catch (error) {
        res.json({message: error})
    }
};

module.exports = {
    roomtype_all,
    roomtype_details,
    roomtype_create,
    roomtype_update,
    roomtype_delete
}
