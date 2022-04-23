/*
Group 1: Anurag Bhattacharya, Aashi Sinha, Illah Song, Joseph Volpe, Prajwal Regmi
*/

//Resolver for patient Model. Prajwal and Illah Developed this

//Import model
import Patient from '../../models/patientinfo.js';

export default {
    patient:({patientId}, req) => {
        const patientInfo = Patient.findById(patientId).exec()
        if (!patientInfo) {
            throw new Error('Error')
        }
        return patientInfo
    },
    createPatient: async (args) => {
        const newPatient = new patient(args.userInput);
        const patient = await newPatient.save();
        return patient
    },
    patients:() => {
        const patientInfo = Patient.find().exec()
        if (!patientInfo) {
            throw new Error('Error')
        }
        return patientInfo
    }
}