import { useState, useEffect } from "react";
import axios from "axios";
import he from "he";
import MyFormComponent from "./component/MyFormComponent";
import Correct from "./component/Correct";

export default function App() {
  const [myQuestions, setMyQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [nextQuestion, setNextQuestion] = useState(0);
  const [isTrue, setisTrue] = useState({
    condition: false,
    tag: null,
    correct: 0,
  });
  console.log(isTrue);

  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=10").then((response) => {
      const formattedQuestions = response.data.results?.map((el) => ({
        question: he.decode(el.question),
        options: he.decode(
          [...el.incorrect_answers, el.correct_answer].sort(
            () => Math.random() - 0.5
          )
        ),
        correctAnswer: el.correct_answer,
      }));
      setMyQuestions(formattedQuestions);
    });
  }, []);
  function myNextQuestion() {
    setNextQuestion((prevValue) => prevValue + 1);
    setisTrue((prevValue) => {
      return {
        ...prevValue,
        condition: false,
        tag: null,
      };
    });
  }
  function myBeforeQuestion() {
    setNextQuestion((prevValue) => prevValue - 1);
    setisTrue((prevValue) => {
      return { ...prevValue, condition: false, tag: null };
    });
  }

  const handleDropdownChange = (event) => {
    event.preventDefault();
    setSelectedOption(event.target.value);
  };
  function changeBoolean() {
    selectedOption === myQuestions[nextQuestion]?.correctAnswer
      ? setisTrue((prevValue) => ({
          ...prevValue,
          condition: true,
          tag: <p>Correct Answer</p>,
          correct: prevValue.correct + 1,
        }))
      : setisTrue((prevValue) => ({
          ...prevValue,
          condition: false,
          tag: <p>Wrong Answer</p>,
        }));
  }

  /*mudar para radio */

  return (
    <div className="container">
      {nextQuestion === 10 ? (
        <Correct
          text={"Correct answers:"}
          number={isTrue.correct}
          send={() => {
            window.location.reload();
          }}
        >
          Click here
        </Correct>
      ) : (
        <MyFormComponent
          myQuestions={myQuestions}
          handleDropdownChange={handleDropdownChange}
          nextQuestion={nextQuestion}
          changeBoolean={changeBoolean}
          myNextQuestion={myNextQuestion}
          myBeforeQuestion={myBeforeQuestion}
          isTrue={isTrue}
          selectedOption={selectedOption}
        />
      )}
    </div>
  );
}
