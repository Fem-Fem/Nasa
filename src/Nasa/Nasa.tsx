import { validResponse } from "../App";

const Nasa = (response: validResponse) => {
  const {
    date,
    title,
    url,
    hdurl,
    copyright,
    explanation,
    media_type,
    service_version,
  } = response;
  return (
    <>
      <p>Date: {date}</p>
      <h4>Title: {title}</h4>
      <h5>Copyright: {copyright ? copyright : "Public Domain!"}</h5>

      <img src={url} alt={title} />
      <p className="explanation">Explanation: {explanation}</p>
      <p>Extra Info:</p>
      <div className="extraInfo">
        <p>Media Type: {media_type}</p>
        <p>Service Version: {service_version}</p>
        <p>Url: {url}</p>
        <p>HDUrl: {hdurl}</p>
      </div>
    </>
  );
};

export default Nasa;
