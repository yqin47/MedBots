/**
 * Created by kaniska_mac on 10/29/15.
 */
var sys      = require("sys");
var util     = require("util");
var fs     = require("fs");
//var config = JSON.parse(fs.readFileSync("./service-defaults.json","utf8"));

var mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

var DrugSchema = new Schema({
    id: { type: String },
    code: { type: String },
    title: { type: String },
    indications: { type: String },
    sideEffects: { type: String },
    drugInterations: { type: String }
});
mongoose.model('drugs', DrugSchema);

//var mongoConfig = config.mongo;
//var db = mongoose.createConnection("mongodb://" + mongoConfig.username + ":" + mongoConfig.password + "@" + mongoConfig.hostname + ":" + mongoConfig.port + "/" + mongoConfig.db);
var db = mongoose.createConnection("mongodb://" + "medbots" + ":" + "mongolab12345" + "@" + "ds045464.mongolab.com" + ":" + 45464 + "/" + "medbots");

var modelData = db.model('drugs', 'drugs');

exports.findIndications = function findIndications(params, cb) {
    util.debug("searching drugs that match the symptoms >>>>  "+params.indications);
    modelData.find({"indications":{'$regex': params.indications}}, function (err, result) {
        if (err) {
            util.debug(" DB Error");
        } else {
            util.debug(" Matching Indications : " + result);
        }
        cb(err, result);
    })

};

exports.findSideEffects = function findSideEffects(params, cb) {
    util.debug("searching drugs that matches side effects >>>>  "+params.sideEffects);
    modelData.find({"sideEffects":{'$regex': params.sideEffects}}, function (err, result) {
        if (err) {
            util.debug(" DB Error");
        } else {
            util.debug(" Matching Side Effect : " + result);
        }
        cb(err, result);
    })

};
