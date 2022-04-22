import { buildSchema } from "graphql";

export default buildSchema(`
    type Patient{
        _id: String!
        patientName: Int!
        bodyTemperature: Int!
        heartRate: Int!
        bloodPressure: Int!
        resporitoryRate: Int!
        signsSymptoms: String!
    }
    input PatientInput{
        _id: String!
        patientName: Int!
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
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`)