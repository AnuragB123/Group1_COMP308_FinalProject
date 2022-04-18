//Attributes to be discussed
//Emergency ID, Emergency Name, Emergency Status (Minor, "Medium", Severe), Emergency Date
//Joseph

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