const Room = require("../models/Room");
const Homestay = require("../models/Homestay");
const Booking = require("../models/Booking");
const moment = require('moment');

//get all room
const room_all = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms)
    } catch (error) {
        res.status(500).send(error)
    }
};

//single room
const room_details = async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId);
        res.status(200).json(room)
    } catch (error) {
        res.status(500).send(error)
    }
};



//add new room
const room_create = async (req, res, next) => {
    const homestayId = req.params.homestayId;
    console.log(req.body);
    const room = new Room(req.body);
    try {
        const savedRoom = await room.save();
        try {
            await Homestay.findByIdAndUpdate(homestayId,
                {
                    $push: { rooms: savedRoom._id },
                });
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom);
    } catch (error) {
        res.status(400).send(error)
    }
};

//update room
const room_update = async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            { _id: req.params.roomId },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedRoom)
    } catch (error) {
        res.json({ message: error })
    }
};



//delete room
const room_delete = async (req, res, next) => {
    const homestayId = req.params.homestayId;
    try {
        await Room.findByIdAndDelete(req.params.roomId);
        try {
            await Homestay.findByIdAndUpdate(homestayId, {
                $pull: { rooms: req.params.roomId },
            });
        } catch (error) {
            next(error)
        }
        res.status(200).json("Phòng đã được xóa");
    } catch (error) {
        res.json({ message: error })
    }
};


// get roomBookings date
const room_bookings_date = async (req, res, next) => {
    try {
        // new Date(ISODate().setDate(ISODate().getDate() - 1))
        const checkinDate =new Date(req.query.checkindate);
        const checkoutDate =new Date(req.query.checkoutdate) ;
        checkinDate.setDate(checkinDate.getDate() + 1);
        checkoutDate.setDate(checkoutDate.getDate() + 1);
        console.log(checkinDate);
        console.log(checkoutDate);

        const room = await Room.findById(req.params.roomId);
        
        const list = await Promise.all(
            room.bookings.map((booking) => {
                return Booking.findById(booking)
            })
        );
        console.log(list);
        const abc = list.filter((booking) => {
            console.log(booking);
            return `${booking.checkindate}` >= `${checkinDate}` && `${booking.checkoutdate}` <= `${checkoutDate}`
        }) 
        console.log(abc);

        res.status(200).json(abc);
    } catch (error) {
        next(error)
    }
};

// search room
const room_searchs  = async (req,res,next)=> {
    try {
        let result = await Room.find({
            "$or":[
                {
                    roomtype: { $regex: req.params.key}
                },
                {
                    acreage: { $regex: req.params.key}
                },
                {
                    roomconvenient: { $regex: req.params.key}
                },
            ]
        });
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
};


// room bookings
//get homestayRooms
const room_bookings  = async (req,res,next)=> {
    try {
        const room = await Room.findById(req.params.roomId);
        const list = await Promise.all(
            room.bookings.map((booking) => {
                return Booking.findById(booking)
            })
        );
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
};

//get homestayRooms
const room_bookings_approved  = async (req,res,next)=> {
    try {
        const room = await Room.findById(req.params.roomId);
        const list = await Promise.all(
            room.bookings.map((booking) => {
                return Booking.findById(booking)
            })
        );
        const abcd = list.filter((booking) => {
            console.log(booking);
            return `${booking.approved}` === 'true' 
        }) 
        console.log(abcd);
        res.status(200).json(abcd)
    } catch (error) {
        next(error)
    }
};

module.exports = {
    room_all,
    room_details,
    room_create,
    room_update,
    room_delete,
    room_searchs,
    room_bookings_date,
    room_bookings,
    room_bookings_approved,
}
