/*
Group 1: Anurag Bhattacharya, Aaishi Sinha, Illah Song, Joseph Volpe, Prajwal Regmi
*/

//Show the Patient

//Import libraries
import React from 'react';
import { gql, useQuery } from "@apollo/client";
import NewPatient from './createPatient';

//GraphQL Query to get Patient based on ID
const PATIENT = gql`
    query Patient($patientId: String!) {
        patient(patientId: $patientId){
            patientId
            patientName
            bodyTemperature
            heartRate
            bloodPressure
            resporitoryRate
            signsSymptoms
        }
    }
`;

//Page to show a Patient
const PatientList = () => {
    const { loading, error, data, refetch } = useQuery(PATIENT);
    if (loading) return <p>Loading...</p>;
    if (error) return <p> <NewPatient/></p>;

    return (
        <div>
            {(data)?(
                <div>
                    <p>
                        <b>Patient Name: {data.patients.patientName}</b>
                        <b>Patient ID: {data.patients.patientId}</b>
                    </p>
                    <table>
                        <tr>
                            <th>Patient ID</th>
                            <th>Body Temperature</th>
                            <th>Heart Rate</th>
                            <th>Blood Pressure</th>
                            <th>Resporitory Rate</th>
                            <th>DailyMotivationTips</th>
                        </tr>
                        {data.patients.maps((patient, index) => (
                            <tr key={index}>
                                <td>{patient.patientId}</td>
                                <td>{patient.bodyTemperature}</td>
                                <td>{patient.heartRate}</td>
                                <td>{patient.bloodPressure}</td>
                                <td>{patient.resporterRate}</td>
                                <td>{patient.dailyMotivationTips}</td>
                            </tr>
                        ))}
                    </table>

                    <div class="center">
                        <button class="center" onClick={() => refetch()}>Refetch</button>
                    </div>  
                    <div>                
                        <NewPatient/>
                    </div>
                </div>
                ):(
                    <div>                                   
                        <p>Error :(</p>
                    </div>
                )
            }                         
        </div>
    );
}

export default PatientList