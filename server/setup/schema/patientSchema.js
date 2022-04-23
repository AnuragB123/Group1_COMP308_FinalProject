/*
Group 1: Anurag Bhattacharya, Aashi Sinha, Illah Song, Joseph Volpe, Prajwal Regmi
*/

//Schema for Patient. Illah and Prajwal Developed this.
import { buildSchema } from "graphql";

export default buildSchema(`
    type Patient{
        _id: String!
        patientId: String!
        patientName: String!
        bodyTemperature: Int!
        heartRate: Int!
        bloodPressure: Int!
        resporitoryRate: Int!
        signsSymptoms: String!
        nurse: Nurse!
        emergencyAlert: Alert!
    }
    input PatientInput{
        patientId: String!
        patientName: String!
        bodyTemperature: Int!
        heartRate: Int!
        bloodPressure: Int!
        resporitoryRate: Int!
        signsSymptoms: String!
    }
    type RootMutation{
        createPatient(patientInput:PatientInput): Patient
    }
    type RootQuery{
        patient(patientId: String!):Patient
        patients:[Patient]
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`)