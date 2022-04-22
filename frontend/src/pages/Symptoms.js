import React, {useRef, useEffect, useState} from 'react';
import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Fragment } from 'react';

const Symptoms = () => {

    const symptomsRef = useRef(null);
    const questionRef = useRef(null);
    const [answer, setAnswer] = useState();
    const [model, setModel] = useState(null);

    const loadModel = async ()=>{
        const loadedModel = await qna.load()
        setModel(loadedModel);
        console.log('Model loaded')
    }

    const getSymptom = async (e)=>{
        if (e.which === 13 && model != null) {
            console.log('Question for symptoms submitted')
            const symptoms = symptomsRef.current.value
            const question = questionRef.current.value

            const answers = await model.findAnswers(question, symptoms)
            setAnswer(answers);
            console.log(answers)
        }
    }

    useEffect(() => {loadModel()}, [])

    return (
        <div>
            <header>
                {model ==null?
                    <div>
                        <div>Model Loading</div>
                        <Loader
                        type="Puff"
                        color="primary"
                        height={100}
                        width={300}/>
                    </div>
                    :
                    <React.Fragment>
                        Symptoms
                        <textarea ref={symptomsRef} rows="30" cols="100"></textarea>
                        Get Solution to Symptoms
                        <input ref={symptomsRef} onKeyPress={getSymptom} size="80"></input>
                        <br />
                        Common Solutions
                        {answer ? answer.map((ans, idx) => <div><b>Answer {idx+1} - </b> {ans.text} ({Math.floor(ans.score*100)/100})</div>) : ""}
                    </React.Fragment>}
            </header>
        </div>
    );
}

export default Symptoms