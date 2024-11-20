import { useEffect, useState } from "react";
import Form from "../component/Form";
import axios from "axios";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";
import "./styles/Home.css";

export default function Home() {
  let [myDatas, setMyDatas] = useState([]);

  let [formData, setFormData] = useState({
    number: 0,
    category: "",
  });

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((response) => {
      setMyDatas(response.data);
    });
  }, []);

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/GamePage", { state: formData });
  }

  return (
    <div className="class--home">
      <p>BachQuizz</p>
      <Form onSubmit={handleSubmit}>
        <label>
          Number of questions:
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
            min="1"
            max="50"
          />
        </label>
        <label>
          Select category
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {myDatas.trivia_categories?.map((el) => {
              return (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              );
            })}
          </select>
        </label>
        <Button nameClass={"start"}>Start</Button>
      </Form>
    </div>
  );
}