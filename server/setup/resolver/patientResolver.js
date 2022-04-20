import Patient from '../../models/patientinfo.js';

export default {
    patients: async () => {
        const patientinfo = await Patient.find();
        if (!patientinfo) {
                throw new Error('Error')
            }
        return patientinfo;
    },
    patient: async (res, req, patientId) => {
        const patientinfo = await Patient.findOne({_id: patientId});
        if (!patientinfo) {
                throw new Error('Error')
            }
        return patientinfo;
    },
    createPatient: async (args, req, res) => {
        try {
            const existingpatient = await Alert.findOne({ patientId: args.userInput.patientId});
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
                nurse: req.nurse,
                emergencyAlert: req.emergencyAlert,
            });
            return res.status(200).json({
                success: true,
                message: 'Patient Add!',
            });
        } catch (err) {
            throw err;
        }
    },
    updatePatient: async (args, req, res) => {
        try {
            const existingpatient = await Alert.findOne({ patientId: args.userInput.patientId});
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
                nurse: req.nurse,
                emergencyAlert: req.emergencyAlert,
            });
            return res.status(200).json({
                success: true,
                message: 'Patient Updated!',
            });
        } catch (err) {
            throw err;
        }
    }
}
