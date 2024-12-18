import { useState, useEffect } from "react";
import axios from "axios";
import MyFormComponent from "../component/MyFormComponent";
import Correct from "./Correct";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import style from "./styles/GamePage.module.css";

export default function GamePage() {
  const [myQuestions, setMyQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [nextQuestion, setNextQuestion] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state || {};

  const [isTrue, setisTrue] = useState({
    condition: false,
    tag: null,
    correct: 0,
    class: null,
  });
  console.log(isTrue);

  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=${formData.number}&category=${formData.category}`
      )
      .then((response) => {
        const formattedQuestions = response.data.results?.map((el) => ({
          question: el.question,
          options: [...el.incorrect_answers, el.correct_answer].sort(
            () => Math.random() - 0.5
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
        class: null,
      };
    });
  }
  function myBeforeQuestion() {
    setNextQuestion((prevValue) => prevValue - 1);
    setisTrue((prevValue) => {
      return { ...prevValue, condition: false, tag: null, class: null };
    });
  }

  const handleDropdownChange = (event) => {
    setSelectedOption(event);
  };
  function changeBoolean() {
    if (selectedOption === myQuestions[nextQuestion]?.correctAnswer) {
      setisTrue((prevValue) => ({
        ...prevValue,
        condition: true,
        tag: <p className="correctAnswer">Correct Answer</p>,
        class: "trueClass",
        correct: prevValue.correct + 1,
      }));
    } else if (selectedOption !== myQuestions[nextQuestion]?.correctAnswer) {
      setisTrue((prevValue) => ({
        ...prevValue,
        condition: false,
        class: "falseClass",
        tag: <p className="wrongAnswer">Wrong Answer</p>,
      }));
    }
  }

  /*mudar para radio */

  return (
    <div className={style.containerbody}>
      {nextQuestion === myQuestions.length ? (
        <Correct
          text={"Correct answers:"}
          number={isTrue.correct}
          totalQuestion={myQuestions.length}
          text2={"Would you like to play again?"}
          send={() => {
            navigate("/");
          }}
        >
          Start again
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
