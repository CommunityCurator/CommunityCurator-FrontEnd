
import { MultiStepProgressBar } from "../components/RegistrationStepper/MultiStepProgressBar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { StepForm } from "../components/RegistrationStepper/StepForm";
import { prompt } from "../components/RegistrationStepper/prompt";

export default function Signup() {
    const [index, setIndex] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const totalPagesCount = prompt?.length || 0;
    // numbered by pages. for exampe { 1: [{"key" : "value"}], 2:["key": "value"], 3: []}
    const [pagesAnswers, setPagesAnswers] = useState({});
  
    const prevButton = () => {
      if (index > 1) {
        setIndex(prevIndex => prevIndex - 1);
      }
    }
  
    const nextButton = () => {
      if (index - 3) {
        setIndex(prevIndex => prevIndex + 1);
      } else {
        // clear the form on submit
        setPagesAnswers({});
        setSubmitted(true);
      }
    }
  
    const onPageAnswerUpdate = (step, answersObj) => {
      setPagesAnswers({...pagesAnswers, [step]: answersObj});
    }
  
    const handleStart = () => {
      setIndex(1);
      setSubmitted(false);
    }
  
    return (
      <div className="App">
        <Container className="h-100">
          <Row className="m-5">
            <Col className="align-self-center">
              <MultiStepProgressBar
                step={index}
                />
            </Col>
          </Row>
          <Row>
            {
              submitted ?
              <Card>
                <Card.Body>
                  <p>Your answers have been submitted!</p>
                </Card.Body>
                
              </Card> :
            <Card>
              <Card.Body>
                <StepForm
                  list={prompt}
                  step={index}
                  onPageUpdate={onPageAnswerUpdate}
                  pagesAnswers={pagesAnswers}
                  />
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <button 
                    className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
                    onClick={prevButton} disabled={index === 1}>Previous
                </button>
                <button 
                    className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
                    onClick={nextButton}>{index === totalPagesCount ? 'Submit' : 'Next'}
                    </button>
              </Card.Footer>
            </Card>
          }
          </Row>
        </Container>
      </div>
    );
}