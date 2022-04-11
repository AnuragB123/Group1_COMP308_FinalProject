import Nurse from '../../models/nurseinfo.js'

export default {
    nurse: async (res,req, nurseId) => {
        const nurseinfo = await Nurse.findOne({_id: nurseId});
        if (!nurseinfo) {
            throw new Error('Error')
        }
        return nurseinfo
    },
    createNurse: async (args) => {
        try {
            const existingNurse = await Nurse.findOne({ nurseId: args.userInput.nurseId});
            if (existingNurse) {
                throw new Error('Nurse exists already');
            }
            const nurse = new Nurse({
                nurseId: args.userInput.nurseId,
                bodyTemperature: args.userInput.bodyTemperature,
                heartRate: args.userInput.heartRate,
                bloodPressure: args.user.bloodPressure,
                resporitoryRate: args.user.resporitoryRate,
                dailyMotivationTips: args.user.dailyMotivationTips
            })
        } catch (err) {
            throw err;
        }
    }
}