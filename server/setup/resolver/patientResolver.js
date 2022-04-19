import Patient from '../../models/patientinfo.js';

export default {
  patient: async (res, req, patientId) => {
    const patientinfo = await Patient.findOne({_id: patientId});
    if (!patientinfo) {
            throw new Error('Error')
        }
    return patientinfo;
  },
  createpatient: async (args, res) => {
    try {
        const existingalert = await Alert.findOne({ patientId: args.userInput.patientId});
        if (existingpatient) {
            throw new Error('Patient exists already');
        }
        const patient = new Patient({
            patientId: args.userInput.patientId,
            patientName: args.userInput.patientName,
            bodyTemperature: args.userInput.bodyTemperature,
            heartRate: args.userInput.heartRate,
            bloodPressure: args.userInput.bloodPressure,
            resporitoryRate: args.userInput.resporitoryRate,
            signsSymptoms: args.userInput.signsSymptoms,
            nurse: args.userInput.nurse,
            emergencyAlert: args.userInput.emergencyAlert,
        });
      patient.save().then(() => {
          return res.status(200).json({
                success: true,
                message: 'Patient Add!',
         })
      });
     } catch (err) {
         throw err;
     }
  },
  updatepatient: async (args) => {
    try {
        const existingalert = await Alert.findOne({ patientId: args.userInput.patientId});
        if (!existingpatient) {
            throw new Error('Patient does not exists');
        }
        const patient = new Patient({
            patientId: args.userInput.patientId,
            patientName: args.userInput.patientName,
            bodyTemperature: args.userInput.bodyTemperature,
            heartRate: args.userInput.heartRate,
            bloodPressure: args.userInput.bloodPressure,
            resporitoryRate: args.userInput.resporitoryRate,
            signsSymptoms: args.userInput.signsSymptoms,
            nurse: args.userInput.nurse,
            emergencyAlert: args.userInput.emergencyAlert,
        });
        patient.save().then(() => {
          return res.status(200).json({
                success: true,
                message: 'Patient Updated!',
           })
        });
     } catch (err) {
         throw err;
     }
   }
}
