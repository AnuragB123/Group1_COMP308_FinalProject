/*
Group 1: Anurag Bhattacharya, Aaishi Sinha, Illah Song, Joseph Volpe, Prajwal Regmi
*/

/*
The Model for Patient. Prajwal and Illag Developed this
 */
import mongoose from 'mongoose';

let patientSchema = new mongoose.Schema({
  patientId: {
        type: String,
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
