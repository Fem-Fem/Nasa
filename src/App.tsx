// https://api.nasa.gov/
import React, { useState, useEffect } from "react";
import "./App.css";
import Nasa from "./Nasa/Nasa";
import ApiDelays from "./ApiDelays/ApiDelays";

export type validResponse = {
  date: string;
  explanation: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  hdurl: string;
  copyright?: string;
};

export type DelayHandling = "initializing" | "error";

const App = () => {
  type Response = validResponse | DelayHandling;

  const currentDate = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD
  const [date, setDate] = useState(currentDate);
  const [response, setResponse] = useState<Response>("initializing");

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
      <header className="App-content">
        <>
          <h1>Astronomy Picture!</h1>
          <input
            type="date"
            id="start"
            defaultValue={date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              onDateChange(e)
            }
          />
          {console.log(response)}
          {response !== "error" && response !== "initializing" ? (
            <Nasa {...response} />
          ) : (
            <ApiDelays response={response} />
          )}
        </>
      </header>
    </div>
  );
};

export default App;

// Considerations for a broader project:

// Features:
// The api has a few different query parameters we can use,
// letting us get data from a range of dates, access random dates,
// see higher res photos, and even get video!
// We could have an "I'm feeling lucky" button, for example.
// This would be more work, but it could be cool to show a list of
// photos of the day where the day is one's birthday!

// Error handling:
// Would love to have stock photos in case there's an issue with the api
// Like maybe star wars photos. There's a star wars joke to be made with
// the error statement, but I can't think of one right now!

// We could also show a specific error if someone picks a date
// that's too far in the future or the past

// Possible Improvements:
// It's possible that we don't want to immediately search the api
// upon any date change. Currently whenever a user changes the date input
// we search a new url, but it's possible that it's annoying to the user
// and causes unnecessary api hits. There could be a 'submit' button.
// I think it's more fun this way though!
// Also, you can always look to improve your unit tests!

// Limitations:
// Web Service Rate Limits (Caching?)
