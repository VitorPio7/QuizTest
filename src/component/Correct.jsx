export default function Correct(props) {
  return (
    <div className="container2">
      <h1>
        {props.text} {props.number}
      </h1>
      <button onClick={props.send}>{props.children}</button>
    </div>
  );
}
