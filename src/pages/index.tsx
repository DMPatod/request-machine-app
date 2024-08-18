import Board from "@/features/boards/components/Board";
import BoardProvider from "@/features/boards/providers/BoardContext";
import React from "react";

const IndexPage: React.FC = () => {
  return (
    <div>
      {/* <Dev /> */}
      <div style={{ backgroundColor: "red", height: 37 }}>
        Application Header
      </div>
      <BoardProvider />
    </div>
  );
};

export default IndexPage;
