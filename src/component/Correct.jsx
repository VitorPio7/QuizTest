export default function Correct(props) {
  return (
    <div className="container2">
      <h1>{props.text}</h1>
      <button onClick={props.send}>{props.child}</button>
    </div>
  );
}
