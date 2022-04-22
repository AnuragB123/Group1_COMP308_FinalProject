/*
Group 1: Anurag Bhattacharya, Aaishi Sinha, Illah Song, Joseph Volpe, Prajwal Regmi
*/

/*
The Model for Nurse. Anurag Developed this 
*/

import mongoose from 'mongoose';

let nurseSchema = new mongoose.Schema({
    nurseId: {
        type: Number,
        default: '',
        trim: true,
        required: true
    },
    bodyTemperature: {
        type: Number,
        default: '',
        trim: true,
        required: true
    },
    heartRate: {
        type: Number,
        default: '',
        trim: true,
        required: true
    },
    bloodPressure: {
        type: Number,
        default: '',
        trim: true,
        required: true
    },
    resporitoryRate: {
        type: Number,
        default: '',
        trim: true,
        required: true
    },
    dailyMotivationTips: {
        type: String,
        default: '',
        trim: true,
        required: true
    },
    patient : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    }
},
{
    collection: 'Nurses'
});

let Nurse = mongoose.model('Nurse', nurseSchema);

export default Nurse;
