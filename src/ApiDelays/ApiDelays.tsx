import React, { FunctionComponent } from "react";
import { DelayHandling } from "../App";

// const ApiDelays = ({ response }: { response: DelayHandling }) => {
//   console.log(response);
//   return (
//     <>
//       {response === "initializing" && <p>Searching the api!</p>}
//       {response === "error" && (
//         <p>
//           Sorry! An issue appeared with the api - please refresh and try again!
//         </p>
//       )}
//     </>
//   );
// };

type DelayHandlingPropType = {
  response: DelayHandling;
};

const ApiDelays: React.FunctionComponent<DelayHandlingPropType> = ({
  response,
}) => {
  console.log(response);
  return (
    <>
      {response === "initializing" && <p>Searching the api!</p>}
      {response === "error" && (
        <p>
          Sorry! An issue appeared with the api - please refresh and try again!
        </p>
      )}
    </>
  );
};

export default ApiDelays;
