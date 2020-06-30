const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    _user : { type: Schema.Types.ObjectId,ref:"User",required:true },
    title : String,
    subject : String,
    body : String,
    recipients : [RecipientSchema] ,
    yes :{ type: Number , default:0},
    no: { type: Number,default:0},
    dateSent : Date,
    lastResponded : Date
});
mongoose.model('surveys',surveySchema);