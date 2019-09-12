var express = require('express');
var mongoose = require('mongoose');
var app = new express;
//connect to db

mongoose.connect('mongodb://localhost:27017/warehouseDB', function (err) {
    if (err) {
        throw err;
    } else {
        console.log("connected successfully");
    }

});
var warehouse = require('./models/warehouse');
var item = require("./models/item");

//add a new warehouse
app.get("/addstore/:name/:capacity/:address", function (req, res) {
    warehouse.create({
        name: req.params.name,
        capacity: parseInt(req.params.capacity),
        address: req.params.address
    }, function (err) {
        if (err) {
            console.log(err);
            throw err;
        } else {
            res.redirect("/getstores");
        }
    });
});

//list all warehouse
app.get("/getstores", function (req, res) {
    warehouse.find().exec(function (err, data) {
        if (err) {
            console.log(err);
            throw err;
        } else {
            res.send(data);
        }
    });
});
//add a new item
app.get("/additem/:name/:price/:created/:warehouse", function (req,res) {
    item.create({
        name: req.params.name,
        price: parseInt(req.params.price),
        created: new Date(req.params.created),
        warehouse: new mongoose.Types.ObjectId(req.params.warehouse)
    }, function (err) {
        if (err) {
            console.log(err);
            throw err;
        } else {
            res.redirect("/getitems");
        }
    });

});

app.get("/getitems", function (req, res) {
    item.find().populate('warehouse').exec(function (err, data) {
        if (err) { throw err; }
        else {
            res.send(data);
        }

    });
});
app.listen(8888);



//localhost:8888/additem/uv/1000/1997-10-1/