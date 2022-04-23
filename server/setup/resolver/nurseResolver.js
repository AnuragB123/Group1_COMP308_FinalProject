/*
Group 1: Anurag Bhattacharya, Aashi Sinha, Illah Song, Joseph Volpe, Prajwal Regmi
*/

//Resolver for Nurse Model. Anurag Developed this

//Import model
import Nurse from '../../models/nurseinfo.js'

export default {
    nurse:({nurseId}, req) => {
        const nurseInfo = Nurse.findById(nurseId).exec()
        if (!nurseInfo) {
            throw new Error('Error')
        }

        return nurseInfo
    },
    createNurse: async (args) => {
        const newNurse = new Nurse(args.userInput);
        const nurse = await newNurse.save();
        return nurse
    }
}