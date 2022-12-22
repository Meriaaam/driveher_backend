var express = require('express');
var router = express.Router();
require("../models/connection");
var Order = require('../models/orders');
var User = require('../models/users');

var {checkBody} = require('../modules/checkBody')


router.post('/newOrder', (req, res) => {
    if (
        !checkBody(req.body, [
          "departure",
          "arrival",
          "paymentAmount",
          
        ])
      ) {
        res.json({ result: false, error: "Missing fields" });
        return;
    }
    
    User.findOne({token: req.body.token}).then(data => {
        const newOrder = new Order({
            departure: req.body.departure,
            arrival: req.body.arrival,
            date: new Date(),
            paymentAmount: req.body.paymentAmount,
            user: data._id,
        });

        newOrder.save().then(newDoc => {
            res.json({result: true, order: newDoc});
        })

    })

    

});


router.get('/userOrders/:token', (req, res) => {
    User.findOne({token: req.params.token}).then(data => {
        if(data){
            Order.find({user: data._id}).then(history => {
                if(history.length === 0){
                    res.json({result: false, error: "No orders found"})
                }
                else{
                    res.json({result: true, userOrders: history})
                }
            })
        }
    })
});

router.delete('/deleteOrder/:id', (req, res) => {
    Order.deleteOne({_id: req.params.id}).then(data => {
        res.json({result: true, message: 'Deleted successfully!'})
    });
})


module.exports = router;
