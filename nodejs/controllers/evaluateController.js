const Evaluate = require("../models/Evaluate");
const Homestay = require("../models/Homestay");

//get all evaluates
const evaluate_all  = async (req,res)=> {
    try {
        const evaluates = await Evaluate.find();
        res.status(200).json(evaluates)
    } catch (error) {
        res.status(500).send(error)
    }
};

//single evaluate
const evaluate_details = async (req,res)=> {
    try {
        const evaluate = await Evaluate.findById(req.params.evaluateId);
        res.status(200).json(evaluate)
    } catch (error) {
        res.status(500).send(error)
    }
};

//get  evaluate by name
const evaluate_name = async (req,res)=> {
    try {
        console.log( req.query.name );
        const evaluate = await Evaluate.find({ code: req.query.name});
        res.status(200).json(evaluate)
    } catch (error) {
        res.status(500).send(error)
    }
};


//get  evaluates not approved
const evaluate_notapproved = async (req,res)=> {
    try {
        const evaluate = await Evaluate.find({ approved: "false"});
        res.status(200).json(evaluate)
    } catch (error) {
        res.status(500).send(error)
    }
};

//get  evaluates  approved
const evaluate_approved = async (req,res)=> {
    try {
        const evaluate = await Evaluate.find({ approved: "true"});
        res.status(200).json(evaluate)
    } catch (error) {
        res.status(500).send(error)
    }
};


//search evaluates approved
const evaluate_approved_search = async (req,res)=> {
    try {
        const evaluate = await Evaluate.find({
             approved: "true",
             "$or":[
                {
                    homestayname: { $regex: req.params.key}
                },
                {
                    customername: { $regex: req.params.key}
                },
                {
                    roomtype: { $regex: req.params.key}
                },

                {
                    service: { $regex: req.params.key}
                },
                {
                    customers: { $regex: req.params.key}
                },
            ]
            });
        res.status(200).json(evaluate)
    } catch (error) {
        res.status(500).send(error)
    }
};

//search evaluates approved
const evaluate_notapproved_search = async (req,res)=> {
    try {
        const evaluate = await Evaluate.find({
             approved: "false",
             "$or":[
                {
                    homestayname: { $regex: req.params.key}
                },
                {
                    customername: { $regex: req.params.key}
                },
                {
                    roomtype: { $regex: req.params.key}
                },

                {
                    service: { $regex: req.params.key}
                },
                {
                    customers: { $regex: req.params.key}
                },
            ]
            });
        res.status(200).json(evaluate)
    } catch (error) {
        res.status(500).send(error)
    }
};


//add new evaluate
const evaluate_create = async (req,res,next)=> {
    const homestayId = req.params.homestayId;
    console.log(req.body);
    const evaluate = new Evaluate({
        homestayname : req.body.homestayname,
        customername : req.body.customername,
        roomtype : req.body.roomtype,
        evaluatedate : req.body.evaluatedate,
        comment : req.body. comment,
        service : req.body.service,
        point : req.body.point,
        customers : req.body.customers,
    });
    try {
        const savedEvaluate = await evaluate.save();
        try {
            await Homestay.findByIdAndUpdate(homestayId,
                {$push: {evaluates: savedEvaluate._id},
            });
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedEvaluate);
    } catch (error) {
        res.status(400).send(error)
    }
};




// update evaluate approved
const evaluate_updateApproved = async (req,res)=> {
    try {
        const updatedEvaluateApproved = await Evaluate.findByIdAndUpdate(
            { _id: req.params.evaluateId },
            {$set: { approved: "true"}},
            {new:true}
        );

        res.status(200).json(updatedEvaluateApproved)
    } catch (error) {
        res.json({message: error})
    }
};



//delete evaluate
const evaluate_delete = async (req,res,next)=> {
    const homestayId = req.params.homestayId;
    try {
        await Evaluate.findByIdAndDelete(req.params.evaluateId);
        try {
            await Homestay.findByIdAndUpdate(homestayId, {
                $pull: { evaluates: req.params.evaluateId },
              });
        } catch (error) {
            next(error)
        }
        res.status(200).json("Đánh giá đã được xóa");
    } catch (error) {
        res.json({message: error})
    }
};


module.exports = {
    evaluate_all,
    evaluate_details,
    evaluate_name,
    evaluate_create,
    evaluate_delete,
    evaluate_approved,
    evaluate_notapproved,
    evaluate_updateApproved,
    evaluate_approved_search,
    evaluate_notapproved_search,
}
