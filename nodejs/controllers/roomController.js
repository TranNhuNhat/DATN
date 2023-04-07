const Room = require("../models/Room");

//get all rooms
const room_all  = async (req,res)=> {
    try {
        const rooms = await Room.find();
        res.json(rooms)
    } catch (error) {
        res.status(500).send(error)
    }
};

//single room
const room_details = async (req,res)=> {
    try {
        const room = await Room.findById(req.params.roomId);
        res.json(room)
    } catch (error) {
        res.status(500).send(error)
    }
};



//add new room
const room_create = async (req,res)=> {
    
    const room = new Room({
        code: req.body.code,
        roomtype: req.body.roomtype,
    });
    try {
        const savedRoom = await room.save();
        res.send(savedRoom);
    } catch (error) {
        res.status(400).send(error)
    }
};

//update room
const room_update = async (req,res)=> {
    try {
        const room = {
            code: req.body.code,
            roomtype: req.body.roomtype,
        };

        const updatedRoom = await Room.findByIdAndUpdate(
            { _id: req.params.roomId },
            room
        );
        res.json(updatedRoom);
    } catch (error) {
        res.json({message: error})
    }
};



//delete room
const room_delete = async (req,res)=> {
    try {
        const removeRoom = await Room.findByIdAndDelete(req.params.roomId);
        res.json(removeRoom);
    } catch (error) {
        res.json({message: error})
    }
};

module.exports = {
    room_all,
    room_details,
    room_create,
    room_update,
    room_delete
}
