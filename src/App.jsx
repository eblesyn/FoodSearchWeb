import { useState, useEffect } from "react";
import React from "react";
import logo from "./assets/bee.png";

const App = () => {
  const [endPoint, setEndPoint] = useState(" ");

  const [container, setContainer] = useState([]);

  const [finalPoint, setFinalPoint] = useState ('')

  useEffect(() => {
    fetchMe();
  }, [finalPoint]);

  const fetchMe = () => {
    fetch(
      `https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser?ingr=+${endPoint}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "843b58efb1mshc0657f246f366f1p148b28jsnb01522c9f7d9",
          "X-RapidAPI-Host": "edamam-food-and-grocery-database.p.rapidapi.com",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setContainer(data.hints);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const onChangeHandler = (e) => {
    setEndPoint(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setFinalPoint(endPoint)
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="flex flex-col items-center justify-center ">
        <form className="mt-10" onSubmit={submitHandler}>
          <div className=" flex items-center justify-center mt-5 ">
            <img src={logo} alt="" className="size-28" />
            <p className="text-white text-2xl">Queen Foods</p>
          </div>

          <input
            type="text"
            value={endPoint}
            onChange={onChangeHandler}
            className="w-[720px] h-10 text-white border border-s-white rounded-md bg-transparent"
          />
          <button
            type="submit"
            className="text-white ml-2 bg-transparent border border-s-white h-10 w-20 rounded-md "
          >
            Submit
          </button>
        </form>
        <div className="grid grid-cols-4 gap-4 mt-5 p-8">
          {container.map((item,index) => {
            return (
              <div className="border border-s-white p-6 " key={index}>
                <img src={item.food.image} alt="" />
                <div className="mt-2">
                <p className="text-white">{item.food.label}</p>
                </div>
               
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
