import Confetti from "react-confetti";
export default function Correct(props) {
  return (
    <div className="container2">
      <Confetti />
      <p className="ptext1">{props.text}</p>
      <p className="ptext2">
        {props.number}/{props.totalQuestion}
      </p>
      <p className="ptext1">{props.text2}</p>
      <button className="button-start" onClick={props.send}>
        {props.children}
      </button>
    </div>
  );
}
