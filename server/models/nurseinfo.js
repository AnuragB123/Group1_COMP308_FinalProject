//Nurse Model
//body temperature, heart rate, blood pressure (Create and Read), Daily Motivation Tips
//Reference to Patient
//Anurag

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
