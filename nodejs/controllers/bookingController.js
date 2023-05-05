const Booking = require("../models/Booking");
const Room = require("../models/Room");

//get all bookings
const booking_all  = async (req,res)=> {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings)
    } catch (error) {
        res.status(500).send(error)
    }
};

//single booking
const booking_details = async (req,res)=> {
    try {
        const booking = await Booking.findById(req.params.bookingId);
        res.status(200).json(booking)
    } catch (error) {
        res.status(500).send(error)
    }
};

//get  booking by name
const booking_name = async (req,res)=> {
    try {
        console.log( req.query.name );
        const booking = await Booking.find({ code: req.query.name});
        res.status(200).json(booking)
    } catch (error) {
        res.status(500).send(error)
    }
};


//get  booking not approved
const booking_notapproved = async (req,res)=> {
    try {
        const booking = await Booking.find({ approved: "false"});
        res.status(200).json(booking)
    } catch (error) {
        res.status(500).send(error)
    }
};

//get  booking  approved
const booking_approved = async (req,res)=> {
    try {
        const booking = await Booking.find({ approved: "true"});
        res.status(200).json(booking)
    } catch (error) {
        res.status(500).send(error)
    }
};


//add new booking
const booking_create = async (req,res,next)=> {
    const roomId = req.params.roomId;
    console.log(req.body);
    const booking = new Booking(req.body);
    try {
        const savedBooking = await booking.save();
        try {
            await Room.findByIdAndUpdate(roomId,
                {$push: {bookings: savedBooking._id},
            });
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedBooking);
    } catch (error) {
        res.status(400).send(error)
    }
};

//update booking
const booking_update = async (req,res)=> {
    try {
        // const booking = {
        //     name: req.body.name,
        //     roomtype: req.body.roomtype,
        //     roomNumbers: req.body.roomNumbers,
        //     guestname: req.body.guestname,
        //     gender: req.body.gender,
        //     bookingphone: req.body.bookingphone,
        //     email: req.body.email,
        //     bookingdate: req.body.bookingdate,
        //     checkindate: req.body.checkindate,
        //     checkoutdate: req.body.checkoutdate,
        //     numadults: req.body.numadults,
        //     numchidren: req.body.numchidren,
        // };

        // const updatedBooking = await Booking.findByIdAndUpdate(
        //     { _id: req.params.bookingId },
        //     booking
        // );

        const updatedBooking = await Booking.findByIdAndUpdate(
            { _id: req.params.bookingId },
            {$set:req.body},
            {new:true}
        );

        res.status(200).json(updatedBooking)
    } catch (error) {
        res.json({message: error})
    }
};


// update booking approved
const booking_updateApproved = async (req,res)=> {
    try {
        const updatedBookingApproved = await Booking.findByIdAndUpdate(
            { _id: req.params.bookingId },
            {$set: { approved: "true"}},
            {new:true}
        );

        res.status(200).json(updatedBookingApproved)
    } catch (error) {
        res.json({message: error})
    }
};



//delete booking
const booking_delete = async (req,res,next)=> {
    const roomId = req.params.roomId;
    try {
        await Booking.findByIdAndDelete(req.params.bookingId);
        try {
            await Room.findByIdAndUpdate(roomId, {
                $pull: { bookings: req.params.bookingId },
              });
        } catch (error) {
            next(error)
        }
        res.status(200).json("Đơn đã được xóa");
    } catch (error) {
        res.json({message: error})
    }
};


module.exports = {
    booking_all,
    booking_details,
    booking_name,
    booking_create,
    booking_update,
    booking_delete,
    booking_approved,
    booking_notapproved,
    booking_updateApproved
}
