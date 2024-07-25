// import { useDrag } from "react-dnd";

// export const canMove = (toX: number, toY: number) => {
//   return true;
// };

// const Knight: React.FC = () => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: "knight",
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   }));

//   return drag(
//     <div
//       style={{
//         opacity: isDragging ? 0.5 : 1,
//         fontSize: 25,
//         fontWeight: "bold",
//       }}
//     >
//       ♘
//     </div>
//   );
// };

// export default Knight;
