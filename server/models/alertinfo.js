/*
Group 1: Anurag Bhattacharya, Aaishi Sinha, Illah Song, Joseph Volpe, Prajwal Regmi
*/

/*
This is the Model for Alert. Joseph Developed this.
*/

import mongoose from 'mongoose';

// Alert model class

let alertSchema = new mongoose.Schema({
    alertContent: {
        type: String,
        default: '',
        trim: true,
        required: true
    }, 
    alertStatus: {
        type: String,
        default: '',
        trim: true,
        required: true
    }, 
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }
},
{
    collection: "Alerts"
});

let Alert = mongoose.model('Alert', alertSchema);

export default Alert;