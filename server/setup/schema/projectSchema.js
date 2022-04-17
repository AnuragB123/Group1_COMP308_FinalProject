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
    input NurseInput{
        nurseId: String!
        bodyTemperature: Int!
        heartRate: Int!
        bloodPressure: Int!
        resporitoryRate: Int!
        dailyMotivationTips: String!
    }
    type RootMutation{
        createNurse(nurseInput:NurseInput): Nurse
    }
    type RootQuery{
        nurse(nurseId: String!): Nurse
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`)