import he from "he";
export default function MyFormComponent(props) {
  let myArrayOption = ["A", "B", "C", "D"];
  if (props.myQuestions?.length === 0) {
    return <p>Loading questions...</p>;
  }
  console.log(props.isTrue.class);

  return (
    <div className="containerAnswers">
      <p>
        Question {props.nextQuestion + 1}/{props.myQuestions?.length}
      </p>
      <form className="myForm" onSubmit={(e) => e.preventDefault()}>
        <p className="MyQuestion">
          {he.decode(props.myQuestions[props.nextQuestion]?.question)}
        </p>
        <div>
          {props.myQuestions[props.nextQuestion]?.options.map((el, index) => (
            <label key={index} className={`mylabels`}>
              <input
                type="radio"
                name="selectedOption"
                value={el}
                checked={props.selectedOption === el}
                onChange={() => props.handleDropdownChange(el)}
              />
              <div className={`radio-button ${props.isTrue.class}`}>
                {" "}
                <span className="questionLetter">
                  {myArrayOption[index]}
                </span>{" "}
                {he.decode(el)}
              </div>
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="button-start"
          onClick={props.changeBoolean}
        >
          Send
        </button>
      </form>
      <div className="divButtons">
        <button onClick={props.myNextQuestion} className="nextButton">
          Next
        </button>
        {props.nextQuestion > 0 && (
          <button onClick={props.myBeforeQuestion} className="beforeButton">
            Before
          </button>
        )}
      </div>
      {props.isTrue.tag}
    </div>
  );
}
