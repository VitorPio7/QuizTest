import { useEffect, useState } from "react";
import Form from "../component/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <Form onSubmit={handleSubmit}>
      <label>
        Number of questions:
        <input
          type="text"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
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
      <button type="submit">Send</button>
    </Form>
  );
}
