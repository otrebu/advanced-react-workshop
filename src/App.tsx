import { useEffect } from "react";

function App() {
  //  https://staging-workshop-cityjs-london-2024-auJTOQ.keelapps.xyz/api/json/listTodos

  useEffect(() => {
    fetch(
      "https://staging-workshop-cityjs-london-2024-auJTOQ.keelapps.xyz/api/json/listTodos"
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  });

  const options = [
    {
      label: "cheese",
      isDone: false,
    },
    {
      label: "Buy eggs",
      isDone: false,
    },
  ];

  return (
    <>
      <h1>Todos</h1>
      <ul>
        {options.map((item) => (
          <li key={item.label.split(" ").join("-")}>
            <input
              type="checkbox"
              checked={item.isDone}
              name={item.label}
              id={item.label}
            />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
