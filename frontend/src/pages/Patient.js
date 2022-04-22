/*
Group 1: Anurag Bhattacharya, Aaishi Sinha, Illah Song, Joseph Volpe, Prajwal Regmi
*/

/*
In this Page, a Patient User would be able to input their vital signs
Prajwal and Illah developed this
 */

//Import libraries
import React from 'react';
import { gql, useQuery, useMutation } from "@apollo/client";
import { Form, Container, Row, Col, Checkbox } from 'react-bootstrap';

//GraphQL Query to get Patient based on ID
const PATIENT = gql`
{
    query($id: String) {
        patient(patientId: $patientId)(
            patientId,
            patientName,
            bodyTemperature,
            heartRate,
            bloodPressure,
            resporitoryRate,
            dailyMotivationTips
        ) {
            patientId
        }
    }
}
`;

const CREATEPATIENT = gql``;

//Page to show a Patient
const PatientList = () => {
    const { loading, error, data, refetch } = useQuery(PATIENT);

    if (loading) return <p>Loading...</p>;
    if (error) return <p> Error:(</p>;

    return (
        <div>
            {(data)?(
                <div>
                    <p style={padding="16px"}>
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
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Body Temperature: </Form.Label>
                                <Form.Control type="number" id="bodyTemperature" value='0' name="bodyTemperature" ref={node => {bodyTemperature = node;}} />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Heart Rate: </Form.Label>
                                <Form.Control type="number" id="heartRate" value='0' name="heartRate" ref={node => {heartRate = node;}} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Blood Pressure: </Form.Label>
                                <Form.Control type="number" id="bloodPressure" value='0' name="bloodPressure" ref={node => {bloodPressure = node;}} />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Resporitory Rate: </Form.Label>
                                <Form.Control type="number" id="resporitoryRate" value='0' name="resporitoryRate" ref={node => {resporitoryRate = node;}} />
                            </Form.Group>
                        </Row>
                        <Form.Group as={Col}>
                            <Form.Label>Signs &#38; Symptoms: </Form.Label> 
                            <Form.Check inline label="Runny nose" value='Runny nose' name="signsSymptoms" type={'checkbox'} id="signsSymptoms"/>
                            <Form.Check inline label="Sinus pain from congestion" value="Sinus pain from congestion" name="signsSymptoms" type={'checkbox'} id="signsSymptoms" />
                            <Form.Check inline label="Spots and blisters" value="Spots and blisters" type={'checkbox'} id="signsSymptoms" />
                            <Form.Check inline label="Poor wound healing" value="Poor wound healing"name="signsSymptoms" type={'checkbox'} id="signsSymptoms" />
                            <Form.Check inline label="Thirst" value="Thirst" name="signsSymptoms" type={'checkbox'} id="signsSymptoms" />
                            <Form.Check inline label="Fast heart rate" value="Fast heart rate" type={'checkbox'} id="signsSymptoms" />
                            <Form.Check inline label="Chest Pain" value="Chest Pain" type={'checkbox'} id="signsSymptoms" />
                            <Form.Check inline label="Fever" value="Fever" name="signsSymptoms" type={'checkbox'} id="signsSymptoms" />
                            <Form.Check inline label="Feelings of misery" value="Feelings of misery" name="signsSymptoms" type={'checkbox'} id="signsSymptoms" />   
                        </Form.Group>
                    </Form>
                    </div>
                </div>
                ):(
                    <p style={padding="16px"}><b>Loading....</b></p>
                )
            }                         
        </div>
    );
}

export default PatientList