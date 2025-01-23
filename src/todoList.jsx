import React, { useState } from "react";
import TodoItem from "./todoItem";

function TodoList() {
    const [task, setTask] = useState([]);

    const addTask = (newTask) => {
        setTask([...task, newTask]);
    };

    return (
        <div>
            <h2>My To-Do List</h2>
            <TodoItem addTask={addTask} />
            <ul>
                {task.map((tasks, index) => (
                    <li key={index}>{tasks}</li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;