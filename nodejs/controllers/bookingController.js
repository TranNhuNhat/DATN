const Booking = require("../models/Booking");

//get all bookings
const booking_all  = async (req,res)=> {
    try {
        const bookings = await Booking.find();
        res.json(bookings)
    } catch (error) {
        res.status(500).send(error)
    }
};

//single booking
const booking_details = async (req,res)=> {
    try {
        const booking = await Booking.findById(req.params.bookingId);
        res.json(booking)
    } catch (error) {
        res.status(500).send(error)
    }
};

//get  booking by code
const booking_detailscode  = async (req,res)=> {
    try {
        console.log( req.query.code );
        const booking = await Booking.find({ code: req.query.code});
        res.json(booking)
    } catch (error) {
        res.status(500).send(error)
    }
};



//add new booking
const booking_create = async (req,res)=> {
    
    const booking = new Booking({
        code: req.body.code,
        roomtype: req.body.roomtype,
        guestname: req.body.guestname,
        gender: req.body.gender,
        bookingphone: req.body.bookingphone,
        email: req.body.email,
        bookingdate: req.body.bookingdate,
        checkindate: req.body.checkindate,
        checkoutdate: req.body.checkoutdate,
        numadults: req.body.numadults,
        numchildren: req.body.numchildren,
    });
    try {
        const savedBooking = await booking.save();
        res.send(savedBooking);
    } catch (error) {
        res.status(400).send(error)
    }
};

//update booking
const booking_update = async (req,res)=> {
    try {
        const booking = {
            code: req.body.code,
            roomtype: req.body.roomtype,
            guestname: req.body.guestname,
            gender: req.body.gender,
            bookingphone: req.body.bookingphone,
            email: req.body.email,
            bookingdate: req.body.bookingdate,
            checkindate: req.body.checkindate,
            checkoutdate: req.body.checkoutdate,
            numadults: req.body.numadults,
            numchidren: req.body.numchidren,
        };

        const updatedBooking = await Booking.findByIdAndUpdate(
            { _id: req.params.bookingId },
            booking
        );
        res.json(updatedBooking)
    } catch (error) {
        res.json({message: error})
    }
};



//delete booking
const booking_delete = async (req,res)=> {
    try {
        const removeBooking = await Booking.findByIdAndDelete(req.params.bookingId);
        res.json(removeBooking);
    } catch (error) {
        res.json({message: error})
    }
};

module.exports = {
    booking_all,
    booking_details,
    booking_detailscode,
    booking_create,
    booking_update,
    booking_delete
}
