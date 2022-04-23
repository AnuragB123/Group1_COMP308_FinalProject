/*
Group 1: Anurag Bhattacharya, Aashi Sinha, Illah Song, Joseph Volpe, Prajwal Regmi
*/

/*
In this Page, Once a Nurse User is logged in, they would be able to input the necessary attributes for a Patient
Anurag Developed this 
*/
//Import libraries
import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { gql, useMutation } from '@apollo/client';
import { Link} from 'react-router-dom';

//GraphQL Mutation to Create a Nurse
const CREATENURSE = gql`
mutation CreateNurse(
    $nurseId: Int!,
    $bodyTemperature: Int!,
    heartRate: Int!,
    bloodPressure: Int!,
    resporitoryRate: Int!,
    dailyMotivationTips: String!,
) {
    createNurse(
        nurseId: $nurseId,
        bodyTemperature: $bodyTemperature,
        heartRate: $heartRate,
        bloodPressure: $bloodPressure,
        resporitoryRate: $resporitoryRate,
        dailyMotivationTips: $dailyMotivationTips
        ) {
            nurseId
        }
}
`;

//Form to create a Nurse using GraphQL
const CreateNurse = () => {
    let nurseId, bodyTemperature, heartRate, bloodPressure, resporitoryRate, dailyMotivationTips;
    const [createNurse, {data, loading, error}] = useMutation(createNurse);
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    return (
        <div>
            <Jumbotron>
                <form onSubmit={e => {    
                    e.preventDefault();
                    createNurse({ variables: { nurseId: nurseId.value, bodyTemperature: bodyTemperature.value, 
                        heartRate: heartRate.value, bloodPressure: bloodPressure.value, resporitoryRate: resporitoryRate.value, 
                        dailyMotivationTips: dailyMotivationTips.value
                      } });
                      nurseId.value = '';
                      bodyTemperature.value = '';
                      heartRate.value = '';
                      bloodPressure.value = '';
                      resporitoryRate.value = '';
                      dailyMotivationTips.value = '';
                }}
                >
                <div class="outer_container">
                <div class="container">
                    <label>
                        <b>Nurse ID:</b>
                    </label>
                    <input type="number" class="fields" name="nurseID" ref={node => {nurseId = node; }} 
                    placeholder="Nurse ID:" />
                </div>
                <div class="container">
                    <label>
                        <b>Body Temperature:</b>
                    </label>
                    <input type="number" class="fields" name="bodyTemperature" ref={node => {bodyTemperature = node; }} 
                    placeholder="Body Temperature:" />
                </div>
                <div class="container">
                    <label>
                        <b>Heart Rate:</b>
                    </label>
                    <input type="number" class="fields" name="heartRate" ref={node => {heartRate = node; }}
                    placeholder="Heart Rate:" />
                </div>
                <div class="container">
                    <label>
                        <b>Blood Pressure:</b>
                    </label>
                    <input type="number" class="fields" name="bloodPressure" ref={node => {bloodPressure = node; }}
                    placeholder="Blood Pressure:" />
                </div>
                <div class="container">
                    <label>
                        <b>Resporitory Rate:</b>
                    </label>
                    <input type="number" class="fields" name="resporitoryRate" ref={node => {resporitoryRate = node; }}
                    placeholder="Resporitory Rate:" />
                </div>
                <div class="container">
                    <label>
                        <b>Daily Motivation Tips:</b>
                    </label>
                    <input type="text" class="fields" name="dailyMotivationTips" ref={node => {dailyMotivationTips = node; }}
                    placeholder="Daily Motivation Tips:" />
                </div>
                <div class="container">
                    <button type="submit" class="fields">Save Nurse</button>
                </div>
                </div>
            </form>
            </Jumbotron>
        </div>
    );
}
export default CreateNurse