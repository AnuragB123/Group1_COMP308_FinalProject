//Patient Model
//Daily Information Data, similar attributes as what a Nurse can enter 

//List of Medical Conditions, For each condition, using machine learning (AI), advice on how to tackle (AI) - BERT ML
//Patient can input a list of medical conditions (data, AI), able to ask a question and get answer on how to deal with medical conditions 

//Emergency Alert Model  

//A Patient has a reference to Emergency Alert Model, will be able to create a Emergency Alert item

//Motivational Video.... attribute... (Reference to Daily Motivation Tips Attribute of Nurse)

//body temperature, heart rate, blood pressure, Input these
//Prajwal/Illah
//Prajwal
import mongoose from 'mongoose';

let patientSchema = new mongoose.Schema({
  patientId: {
        type: Number,
        default: '',
        trim: true,
        required: true
    },
  patientName: {
      type: String,
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
  signsSymptoms:{
      type: String,
      default: '',
      trim: true,
      required: true
  },
  nurse:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Nurse'
  },
  emergencyAlert:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Alert'
  }
},
{
  collection: 'Patient'
});

let Patient = mongoose.model('Patient', patientSchema);

export default Patient;
