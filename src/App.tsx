import { useEffect, useState } from "react";

interface Todo {
  label: string;
  isDone: boolean;
  id: string;
}

const baseUrl =
  "https://staging-workshop-cityjs-london-2024-auJTOQ.keelapps.xyz/api/json";

function App() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [searchText, setSearchText] = useState("");
  const [inputText, setInputText] = useState("");

  const clickHandler = async (id: string) => {
    console.log(`Trying to update the ${id} todo item`);
    await fetch(`${baseUrl}/updateTodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const createTodo = async (item: string) => {
    // Optimistic updates as a TODO
    // setTodos([...todos, { label: item, isDone: false }]);
    await fetch(`${baseUrl}/createTodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ label: item }),
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error("Failed to create todo");
      }
      const res = await response.json();
      console.log("Res: ", res);
      if (res.label) {
        setTodos([
          ...todos,
          { label: res.label, isDone: res.isDone, id: res.id },
        ]);
      }
    });
  };

  useEffect(() => {
    fetch(`${baseUrl}/listTodos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first: 10000000 }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos(data.results);
      });
  }, []);

  return (
    <>
      <form>
        <label htmlFor="todo">Add todo:</label>
        <input
          onChange={(e) => setInputText(e.target.value)}
          type="text"
          id="todo"
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            createTodo(inputText);
          }}
        >
          Add
        </button>
      </form>
      <h2>Todos</h2>
      <input
        type="text"
        placeholder="Search todos"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <ul>
        {todos
          .filter((todo) => todo.label.includes(searchText))
          .map((item, i) => (
            <li key={item.label.split(" ").join("-") + "-" + i}>
              <input
                type="checkbox"
                checked={item.isDone}
                onChange={() => clickHandler(item.id)}
                name={item.label}
                id={item.id}
              />
              <span>{item.label}</span>
            </li>
          ))}
      </ul>
    </>
  );
}

export default App;
