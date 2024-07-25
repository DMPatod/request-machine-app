import React from "react";
import Draggable from "react-draggable";

const IndexPage: React.FC = () => {
  return (
    <div>
      {/* <Dev /> */}
      {/* <Board /> */}
      <Draggable>
        <div
          style={{
            border: 1,
            width: 150,
            height: 150,
            backgroundColor: "lightgray",
          }}
        ></div>
      </Draggable>
    </div>
  );
};

export default IndexPage;
