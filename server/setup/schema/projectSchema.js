import { buildSchema } from "graphql";

export default buildSchema(`
    type Nurse{
        nurseId: String!
        bodyTemperature: Int!
        heartRate: Int!
        bloodPressure: Int!
        resporitoryRate: Int!
        dailyMotivationTips: String!
    }
    type Patient{
        patientId: String!
        patientName: String!
        bodyTemperature: Int!
        heartRate: Int!
        bloodPressure: Int!
        resporitoryRate: Int!
        signsSymptoms: String!
        nurse: Nurse!
        emergencyAlert: [Alert!]! 
    }
    type Alert{
        alertContent: String!
        alertStatus: String!
        patientId: Patient!
    }
    input NurseInput{
        nurseId: String!
        bodyTemperature: Int!
        heartRate: Int!
        bloodPressure: Int!
        resporitoryRate: Int!
        dailyMotivationTips: String!
    }
    input PatientInput{
        patientId: String!
        patientName: String!
        bodyTemperature: Int!
        heartRate: Int!
        bloodPressure: Int!
        resporitoryRate: Int!
        signsSymptoms: String!
        nurse: Nurse!
        emergencyAlert: [Alert!]! 
    }
    input AlertInput{
        alertContent: String!
        alertStatus: String!
        patientId: Patient!
    }
    type RootMutation{
        createNurse(nurseInput:NurseInput): Nurse
        createPatient(patientInput:PatientInput): Patient
        createalert(alertInput:AlertInput): [Alert!]!
    }
    type RootQuery{
        nurse(nurseId: String!): Nurse
        patient(patientId: String!): Patient
        patients(): [Patient!]!
        alert(alertId): [Alert!]!
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`)