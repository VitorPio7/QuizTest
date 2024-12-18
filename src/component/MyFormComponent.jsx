import he from "he";
import styles from "./styles/MyForm.module.css";

export default function MyFormComponent(props) {
  let myArrayOption = ["A", "B", "C", "D"];

  if (props.myQuestions?.length === 0) {
    return <p>Loading questions...</p>;
  }
  console.log("this:");
  let changeClass = props.isTrue.class;
  if (changeClass === null) {
    changeClass = "button_blue";
  }
  return (
    <div className={styles.containerAnswers}>
      <p>
        Question {props.nextQuestion + 1}/{props.myQuestions?.length}
      </p>
      <form className={styles.myForm} onSubmit={(e) => e.preventDefault()}>
        <p className={styles.MyQuestion}>
          {he.decode(props.myQuestions[props.nextQuestion]?.question)}
        </p>
        <div>
          {props.myQuestions[props.nextQuestion]?.options.map((el, index) => (
            <label
              key={index}
              onClick={() => setChange((prevValue) => !prevValue)}
            >
              <input
                type="radio"
                name="selectedOption"
                value={el}
                checked={props.selectedOption === el}
                onChange={() => props.handleDropdownChange(el)}
              />
              <div className={`${styles.radio_button} ${styles[changeClass]} `}>
                {" "}
                <span className={styles.questionLetter}>
                  {myArrayOption[index]}
                </span>{" "}
                {he.decode(el)}
              </div>
            </label>
          ))}
        </div>
        <button
          type="submit"
          className={styles.button_start}
          onClick={props.changeBoolean}
        >
          Send
        </button>
      </form>
      <div className={styles.divButtons}>
        <button onClick={props.myNextQuestion} className={styles.nextButton}>
          Next
        </button>
        {props.nextQuestion > 0 && (
          <button
            onClick={props.myBeforeQuestion}
            className={styles.beforeButton}
          >
            Before
          </button>
        )}
      </div>
      {props.isTrue.tag}
    </div>
  );
}
