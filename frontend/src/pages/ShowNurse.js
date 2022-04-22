/*
Group 1: Anurag Bhattacharya, Aaishi Sinha, Illah Song, Joseph Volpe, Prajwal Regmi
*/

/*
In this page, A Nurse User would be able to view the inputted information for a Patient
Anurag Developed this 
*/
//Import libraries
import React from 'react';
import {gql, useQuery} from "@apollo/client";

//GraphQL Query to get Nurse based on ID
const Nurse = gql`
{
    query($id: String) {
        course(nurseId: $nurseId)(
            nurseId,
            bodyTemperature,
            heartRate,
            bloodPressure,
            resporitoryRate,
            dailyMotivationTips
        ) {
            nurseId
        }
    }
}
`;
//Page to show a Nurse
const NurseList = () => {
    const { loading, error, data, refetch } = useQuery(Nurse);

    if (loading) return <p>Loading...</p>;
    if (error) return <p> Error:(</p>;

    return (
        <div>
            <table>
                <tr>
                    <th>Nurse ID</th>
                    <th>Body Temperature</th>
                    <th>Heart Rate</th>
                    <th>Blood Pressure</th>
                    <th>Resporitory Rate</th>
                    <th>DailyMotivationTips</th>
                </tr>
                {data.nurses.maps((nurse, index) => (
                    <tr key={index}>
                        <td>{nurse.nurseId}</td>
                        <td>{nurse.bodyTemperature}</td>
                        <td>{nurse.heartRate}</td>
                        <td>{nurse.bloodPressure}</td>
                        <td>{nurse.resporterRate}</td>
                        <td>{nurse.dailyMotivationTips}</td>
                    </tr>
                ))}
            </table>

            <div class="center">
                <button class="center" onClick={() => refetch()}>Refetch</button>
            </div>
        </div>
    );
}

export default NurseList