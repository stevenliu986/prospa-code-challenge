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

  const deleteFlight = (flightNumber: any) => {
    const flightRemained = data.filter(
      (flight) => flight.flight_number !== flightNumber
    );
    setData(flightRemained);
  };

  return (
    <div className="App">
      {data.map((flight) => {
        return (
          <div key={flight.flight_number} className="flight-box">
            <p>{flight.flight_number}</p>
            <p>{flight.mission_name}</p>
            <p>{flight.rocket.rocket_name}</p>
            <p>{flight.launch_success ? "success" : "false"}</p>
            <button
              onClick={() => deleteFlight(flight.flight_number)}
              className="delete-btn"
            >
              Delete
            </button>
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
