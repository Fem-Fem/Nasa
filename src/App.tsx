import React, { useState, useEffect } from "react";
import "./App.css";

// Things that I would do as part of a broader project?
// Display multiple pics at once, potentially?
// Discuss input box? vs including button? debouncing?
// ask users if they want to see low res or high res?
// add explanation for choice of layout of response info
// fan favorites!
// loading
// switch img?

const App = () => {
  const currentDate = new Date().toLocaleDateString("en-CA");

  type Response =
    | {
        date: string;
        explanation: string;
        media_type: string;
        service_version: string;
        title: string;
        url: string;
        hdurl: string;
      }
    | "pending"
    | "error";

  const [date, setDate] = useState(currentDate);
  const [response, setResponse] = useState<Response>("pending");

  const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLButtonElement).value;
    setDate(value);
  };

  useEffect(() => {
    let dateParameter = `date=${date}`;
    const apiKey = `api_key=${process.env.REACT_APP_NASA_API_KEY}`;
    const url = `https://api.nasa.gov/planetary/apod?${dateParameter}&${apiKey}`;

    fetch(url)
      .then(async (data) => {
        if (data.ok) {
          setResponse(await data.json());
        } else {
          setResponse("error");
          console.error(data);
        }
      })
      .catch((error) => {
        setResponse("error");
        console.error(error);
      });
  }, [date]);

  return (
    <div className="App">
      <header className="App-header">
        <>
          <h1>Astronomy Picture of the Day</h1>
          <input
            type="date"
            id="start"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              onDateChange(e)
            }
          />
          {response !== "error" && response !== "pending" && (
            <>
              <p>Date: {response.date}</p>
              <h2>Title: {response.title}</h2>
              <img src={response.url} alt={response.title} />
              <p className="explanation">Explanation: {response.explanation}</p>
              <p>Extra Info:</p>
              <div className="extraInfo">
                <p>Media Type: {response.media_type}</p>
                <p>Service Version: {response.service_version}</p>
                <p>Url: {response.url}</p>
                <p>HDUrl: {response.hdurl}</p>
              </div>
            </>
          )}
          {response === "pending" && <p>Searching the api!</p>}
          {response === "error" && (
            <>
              <p>
                Sorry! An issue appeared with the api - please refresh and try
                again!
              </p>
            </>
          )}
        </>
      </header>
    </div>
  );
};

export default App;
