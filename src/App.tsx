import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

type FlightData = {
  flight_number: number;
  mission_name: string;
  rocket: {
    rocket_name: string;
  };
  launch_success: boolean;
};

function App() {
  const [data, setData] = useState<Array<FlightData>>();
  const [limit, setLimit] = useState(5);

  const loadMore = () => {
    setLimit((limit) => limit + 5);
  };

  // const deleteItem = (id: number) => {
  //   setData(data?.filter(id=> id !== undefined))
  // }

  useEffect(() => {
    axios
      .get(`https://api.spacexdata.com/v3/launches?limit=${limit}`)
      .then((res) => {
        const { data } = res;
        setData(data);
      })
      .catch((err) => console.log(err));
  }, [limit]);

  if (!data) {
    return <div>Page is Loading...</div>;
  }

  return (
    <div className="App">
      {data.map((item) => {
        return (
          <div key={item.flight_number} className="flight-box">
            <p>{item.flight_number}</p>
            <p>{item.mission_name}</p>
            <p>{item.rocket.rocket_name}</p>
            <p>{item.launch_success ? "success" : "false"}</p>
            {/* <button onClick={deleteItem}>Delete</button> */}
          </div>
        );
      })}
      <button onClick={loadMore} className="load-btn">
        Load More
      </button>
    </div>
  );
}

export default App;
