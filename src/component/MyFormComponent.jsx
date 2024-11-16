export default function myFormComponent(props) {
  if (props.myQuestions?.length === 0) {
    return <p>Loading questions...</p>;
  }
  return (
    <div>
      <form onSubmit={props.handleDropdownChange}>
        <p>{props.myQuestions[props.nextQuestion]?.question}</p>
        <label>
          <select
            value={props.selectedOption}
            onChange={props.handleDropdownChange}
          >
            {props.myQuestions[props.nextQuestion]?.options.map((el, index) => {
              return (
                <option key={index} value={el}>
                  {el}
                </option>
              );
            })}
          </select>
          <button type="submit" onClick={props.changeBoolean}>
            Send
          </button>
        </label>
      </form>
      <button onClick={props.myNextQuestion}>next</button>
      {props.nextQuestion > 0 && (
        <button onClick={props.myBeforeQuestion}>before</button>
      )}
      {props.isTrue.tag}
      <p>{props.nextQuestion + 1}/10</p>
    </div>
  );
}
