var mongoose = require('mongoose');
let warehouseSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    capacity:{
        type:Number,
        min:1,
        max:200
    },
    address:String

});

let warehouseModel = mongoose.model('warehouse',warehouseSchema,'warehouse');
module.exports = warehouseModel;