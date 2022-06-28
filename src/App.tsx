import React, { useState, useEffect } from "react";
import "./App.css";

// Next steps:

// edit error handling from switch to if case
// add styling
// add unit testing

// Things that I would do as part of a broader project?
// Display multiple pics at once, potentially?
// Linting, TS considerations?
// Discuss input box? vs including button? debouncing?
// ask users if they want to see low res or high res?
// add explanation for choice of layout of response info
// fan favorites!
// loading

const App = () => {
  const currentDate = new Date().toLocaleDateString("en-CA");
  const apiKey = "api_key=FeONMuyEyNh9VfhKSPRFtD9QdKM01D3LKOyEDhjF";
  const baseUrl = "https://api.nasa.gov/planetary/apod?" + apiKey;

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
    | null
    | "error";

  const [date, setDate] = useState(currentDate);
  const [url, setUrl] = useState(baseUrl);
  const [response, setResponse] = useState<Response>(null);

  const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLButtonElement).value;
    setDate(value);
  };

  useEffect(() => {
    let dateParameter = "date=" + date;
    const url =
      "https://api.nasa.gov/planetary/apod?" + dateParameter + "&" + apiKey;

    setUrl(url);
  }, [date]);

  useEffect(() => {
    fetch(url)
      .then(async (data) => {
        setResponse(await data.json());
      })
      .catch((error) => {
        setResponse(error);
        console.error(error);
      });
  }, [url]);

  return (
    <div className="App">
      <header className="App-header">
        <>
          <p>Astronomy Picture of the Day</p>
          <input
            type="date"
            id="start"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              onDateChange(e)
            }
          />
          {response && response !== "error" ? (
            <>
              <p>Date: {response.date}</p>
              <p>Title: {response.title}</p>
              <img src={response.url} />
              <p className="explanation">Explanation: {response.explanation}</p>
              <p>Media Type: {response.media_type}</p>
              <p>Service Version: {response.service_version}</p>
              <p>Url: {response.url}</p>
              <p>HDUrl: {response.hdurl}</p>
            </>
          ) : response !== "error" ? (
            <>
              <p>Searching the api!</p>
            </>
          ) : (
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
