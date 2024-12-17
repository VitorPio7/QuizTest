import Confetti from "react-confetti";
import style from "./styles/Correct.module.css";
export default function Correct(props) {
  return (
    <div className={style.container2}>
      <Confetti />
      <p className={style.ptext1}>{props.text}</p>
      <p className={style.ptext2}>
        {props.number}/{props.totalQuestion}
      </p>
      <p className={style.ptext1}>{props.text2}</p>
      <button className={style.button_start} onClick={props.send}>
        {props.children}
      </button>
    </div>
  );
}
