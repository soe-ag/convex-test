import "./App.css";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function App() {
  const tasks = useQuery(api.tasks.getTasks);
  // This is not a one-time fetch. Convex opens a live subscription to that query.
  // The moment any task changes in the database — from any client, anywhere — this component
  // automatically re-renders with the new data.

  const toggleTask = useMutation(api.tasks.toggleTask);
  //   When I click a checkbox, it calls toggleTask({ id: _id }). That runs the mutation on the server —
  //   Convex fetches the current document, flips isCompleted, and patches it back.
  //   It's transactional, it runs server-side, and the argument id is validated as a real tasks
  //   document ID at runtime — not just a plain string.

  // The moment it completes, every useQuery subscribed to the tasks table updates automatically.
  // Open this in two browser tabs and you'll see both checkboxes flip at the same time."

  // no backend server, no REST API, no manual data fetching — we have a fully reactive, type-safe, full-stack app.
  // That's the Convex model."

  return (
    <div className="App">
      <div className="App-header">
        <h1>Convex Tasks</h1>
        <p>Click a checkbox to toggle via Convex mutation</p>
      </div>
      {tasks === undefined ? (
        <p className="task-empty">Loading…</p>
      ) : tasks.length === 0 ? (
        <p className="task-empty">No tasks yet.</p>
      ) : (
        <ul className="task-list">
          {tasks.map(({ _id, text, isCompleted }) => (
            <li
              key={_id}
              className={`task-item${isCompleted ? " task-item--done" : ""}`}
              onClick={() => toggleTask({ id: _id })}
            >
              <input
                type="checkbox"
                className="task-checkbox"
                checked={isCompleted}
                onChange={() => toggleTask({ id: _id })}
                onClick={(e) => e.stopPropagation()}
              />
              <span className="task-text">{text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
