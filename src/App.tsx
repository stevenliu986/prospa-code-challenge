import React, { useState, useEffect } from "react";
import axios from "axios";

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

  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v3/launches/past")
      .then((res) => {
        const { data } = res;
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!data) {
    return <div>Page is Loading...</div>;
  }

  return (
    <div className="App">
      {data.map((item) => {
        return (
          <div key={item.flight_number}>
            <p>{item.flight_number}</p>
            <p>{item.mission_name}</p>
            <p>{item.rocket.rocket_name}</p>
            <p>{item.launch_success ? "success" : "false"}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
