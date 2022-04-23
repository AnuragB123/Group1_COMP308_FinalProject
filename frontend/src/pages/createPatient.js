/*
Group 1: Anurag Bhattacharya, Aaishi Sinha, Illah Song, Joseph Volpe, Prajwal Regmi
*/

//This page allows a Patient to create and input 
import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Form, Row, Col } from 'react-bootstrap';

const CREATEPATIENT = gql`
    mutation CreatePatient(
        $patientId: String!,
        $patientName:String!,
        $bodyTemperature: Int!,
        $heartRate: Int!,
        $bloodPressure: Int!,
        $resporitoryRate: Int!,
        $signsSymptoms: String!,
    ) {
        createPatient( patientInput:{
            patientId: $patientId,
            patientName: $patientName,
            bodyTemperature: $bodyTemperature,
            heartRate: $heartRate,
            bloodPressure: $bloodPressure,
            resporitoryRate: $resporitoryRate,
            signsSymptoms: $signsSymptoms
        }) {
                patientId
                patientName
            }
    }
`;

const NewPatient = (props) => {
    let patientId, patientName, bodyTemperature, heartRate, bloodPressure, resporitoryRate, signsSymptoms;
    const [createPatient, {data, loading, error}] = useMutation(CREATEPATIENT);
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    return(
        <div>
            {(!props.data)?(        
            <Form onSubmit={e=>{
                e.preventDefault();
                createPatient({variables: {
                    patientId: patientId.value,
                    patientName: patientName.value,
                    bodyTemperature: bodyTemperature.value,
                    heartRate: heartRate.value,
                    bloodPressure: bloodPressure.value,
                    resporitoryRate: resporitoryRate.value,
                    signsSymptoms: signsSymptoms.value
                }})
            }}>
                <p><b>Add Patient</b></p>   
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Patient ID: </Form.Label>
                        <Form.Control type="text" id="patientId" disabled value={`P${Math.floor(Math.random() * 1000)}`} name="patientId" ref={node => {patientId = node}} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Patient Name: </Form.Label>
                        <Form.Control type="text" id="patientName" placeholder="Name" value='Name' name="patientName" ref={node => {patientName = node}} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Body Temperature: </Form.Label>
                        <Form.Control type="number" id="bodyTemperature" value='0' name="bodyTemperature" ref={node => {bodyTemperature = node}} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Heart Rate: </Form.Label>
                        <Form.Control type="number" id="heartRate" value='0' name="heartRate" ref={node => {heartRate = node}} />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Blood Pressure: </Form.Label>
                        <Form.Control type="number" id="bloodPressure" value='0' name="bloodPressure" ref={node => {bloodPressure = node}} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Resporitory Rate: </Form.Label>
                        <Form.Control type="number" id="resporitoryRate" value='0' name="resporitoryRate" ref={node => {resporitoryRate = node}} />
                    </Form.Group>
                </Row>
                <Form.Group as={Col}>
                    <Form.Label>Signs &#38; Symptoms: </Form.Label> 
                    <Form.Check inline label="Runny nose" value='Runny nose' name="signsSymptoms" type={'checkbox'} id="signsSymptoms" ref={node => {signsSymptoms = +node}} />
                    <Form.Check inline label="Sinus pain from congestion" value="Sinus pain from congestion" name="signsSymptoms" type={'checkbox'} id="signsSymptoms" ref={node => {signsSymptoms = +node}} />
                    <Form.Check inline label="Spots and blisters" value="Spots and blisters" type={'checkbox'} id="signsSymptoms" ref={node => {signsSymptoms = +node}} />
                    <Form.Check inline label="Poor wound healing" value="Poor wound healing"name="signsSymptoms" type={'checkbox'} id="signsSymptoms" ref={node => {signsSymptoms = +node}} />
                    <Form.Check inline label="Thirst" value="Thirst" name="signsSymptoms" type={'checkbox'} id="signsSymptoms" ref={node => {signsSymptoms = +node}} />
                    <Form.Check inline label="Fast heart rate" value="Fast heart rate" type={'checkbox'} id="signsSymptoms" ref={node => {signsSymptoms = +node}} />
                    <Form.Check inline label="Chest Pain" value="Chest Pain" type={'checkbox'} id="signsSymptoms" ref={node => {signsSymptoms = +node}} />
                    <Form.Check inline label="Fever" value="Fever" name="signsSymptoms" type={'checkbox'} id="signsSymptoms" ref={node => {signsSymptoms = +node}} />
                    <Form.Check inline label="Feelings of misery" value="Feelings of misery" name="signsSymptoms" type={'checkbox'} id="signsSymptoms" ref={node => {signsSymptoms = +node}} />   
                </Form.Group>
                <button type="submit" > Confirm</button>
            </Form>
            ):(
                <Form onSubmit={e=>{
                    e.preventDefault();
                    createPatient({variables: {
                        patientId: patientId.value,
                        patientName: patientName.value,
                        bodyTemperature: bodyTemperature.value,
                        heartRate: heartRate.value,
                        bloodPressure: bloodPressure.value,
                        resporitoryRate: resporitoryRate.value,
                        signsSymptoms: signsSymptoms.value
                    }})
                }}>
                    <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Patient ID: </Form.Label>
                        <Form.Control type="text" id="patientId" disabled value={props.data.patientId} name="patientId" ref={node => {patientId = node}} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Patient Name: </Form.Label>
                        <Form.Control type="text" id="patientName" disabled value={props.data.patientName} name="patientName" ref={node => {patientName = node}} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Body Temperature: </Form.Label>
                        <Form.Control type="number" id="bodyTemperature" value='0' name="bodyTemperature" ref={node => {bodyTemperature = node}} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Heart Rate: </Form.Label>
                        <Form.Control type="number" id="heartRate" value='0' name="heartRate" ref={node => {heartRate = node}} />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Blood Pressure: </Form.Label>
                        <Form.Control type="number" id="bloodPressure" value='0' name="bloodPressure" ref={node => {bloodPressure = node}} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Resporitory Rate: </Form.Label>
                        <Form.Control type="number" id="resporitoryRate" value='0' name="resporitoryRate" ref={node => {resporitoryRate = node}} />
                    </Form.Group>
                </Row>
                    <Form.Group as={Col}>
                    <Form.Label>Signs &#38; Symptoms: </Form.Label> 
                    <Form.Check inline label="Runny nose" value='Runny nose' name="signsSymptoms" type={'checkbox'} id="signsSymptoms" ref={node => {signsSymptoms = +node}} />
                    <Form.Check inline label="Sinus pain from congestion" value="Sinus pain from congestion" name="signsSymptoms" type={'checkbox'} id="signsSymptoms" ref={node => {signsSymptoms = +node}} />
                    <Form.Check inline label="Spots and blisters" value="Spots and blisters" type={'checkbox'} id="signsSymptoms" ref={node => {signsSymptoms = +node}} />
                    <Form.Check inline label="Poor wound healing" value="Poor wound healing"name="signsSymptoms" type={'checkbox'} id="signsSymptoms" ref={node => {signsSymptoms = +node}} />
                    <Form.Check inline label="Thirst" value="Thirst" name="signsSymptoms" type={'checkbox'} id="signsSymptoms" ref={node => {signsSymptoms = +node}} />
                    <Form.Check inline label="Fast heart rate" value="Fast heart rate" type={'checkbox'} id="signsSymptoms" ref={node => {signsSymptoms = +node}} />
                    <Form.Check inline label="Chest Pain" value="Chest Pain" type={'checkbox'} id="signsSymptoms" ref={node => {signsSymptoms = +node}} />
                    <Form.Check inline label="Fever" value="Fever" name="signsSymptoms" type={'checkbox'} id="signsSymptoms" ref={node => {signsSymptoms = +node}} />
                    <Form.Check inline label="Feelings of misery" value="Feelings of misery" name="signsSymptoms" type={'checkbox'} id="signsSymptoms" ref={node => {signsSymptoms = +node}} />    
                    </Form.Group>
                </Form>
                
            )}
        </div>
        
    );
}
export default NewPatient;