import { useState, useEffect } from "react";

export default function App() {
  const [myQuestions, setMyQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [nextQuestion, setNextQuestion] = useState(0);
  const [isTrue, setisTrue] = useState({
    condition: false,
    tag: null,
  });

  console.log(myQuestions);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=2")
      .then((response) => response.json())
      .then((data) => {
        const formattedQuestions = data.results?.map((el) => ({
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
    setisTrue(() => {
      return {
        condition: false,
        tag: null,
      };
    });
  }
  function myBeforeQuestion() {
    setNextQuestion((prevValue) => prevValue - 1);
    setisTrue(() => {
      return { condition: false, tag: null };
    });
  }

  const handleDropdownChange = (event) => {
    event.preventDefault();
    setSelectedOption(event.target.value);
  };
  function changeBoolean() {
    selectedOption === myQuestions[nextQuestion]?.correctAnswer
      ? setisTrue(() => {
          return { condition: true, tag: <p>Correct Answer</p> };
        })
      : setisTrue(() => {
          return { condition: false, tag: <p>Wrong Answer</p> };
        });
  }

  /*mudar para radio */
  function MyComponent() {
    if (myQuestions?.length === 0) {
      return <p>Loading questions...</p>;
    }
    return (
      <>
        <form onSubmit={handleDropdownChange}>
          <p>{myQuestions[nextQuestion]?.question}</p>
          <label>
            <select value={selectedOption} onChange={handleDropdownChange}>
              <option value={myQuestions[nextQuestion]?.options[1]}>
                {myQuestions[nextQuestion]?.options[1]}
              </option>
              <option value={myQuestions[nextQuestion]?.options[0]}>
                {myQuestions[nextQuestion]?.options[0]}
              </option>
              <option value={myQuestions[nextQuestion]?.options[2]}>
                {myQuestions[nextQuestion]?.options[2]}
              </option>
              <option value={myQuestions[nextQuestion]?.options[3]}>
                {myQuestions[nextQuestion]?.options[3]}
              </option>
              <option value={myQuestions[nextQuestion]?.options[4]}>
                {myQuestions[nextQuestion]?.options[4]}
              </option>
            </select>
            <button type="submit" onClick={changeBoolean}>
              Send
            </button>
          </label>
        </form>
        <button onClick={myNextQuestion}>next</button>
        {nextQuestion > 0 && <button onClick={myBeforeQuestion}>before</button>}
        {isTrue.tag}
      </>
    );
  }
  return <div>{MyComponent()}</div>;
}
