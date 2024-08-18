import { BoardContext } from "@/features/boards/providers/BoardContext";
import { useContext } from "react";

const DebugBoard: React.FC = () => {
  const items = useContext(BoardContext);

  return (
    <div>
      <h1>{Object.entries(items).length} Components</h1>
      <ul>
        {Object.entries(items).map(([id, block], index) => {
          return (
            <li key={index}>
              <table>
                <tbody>
                  {Object.entries(block).map(([key, value], index) => {
                    return (
                      <tr key={index}>
                        <td>{key}</td>
                        <td>{value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DebugBoard;
