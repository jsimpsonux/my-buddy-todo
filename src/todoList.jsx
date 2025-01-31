import React, { useState } from "react";
import TodoItem from "./todoItem";

function TodoList() {
    const [task, setTask] = useState([]);
    const [completed, setCompleted] = useState([]);

    const addTask = (newTask) => {
        setTask([...task, newTask]);
    };

    const deleteTask = (index) => {
        setTask(task.filter((_, i) => i!==index));
    };

    const TaskDone = (index) => {
        setCompleted((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    return (
        <div>
            <h2>My To-Do List</h2>
            <TodoItem addTask={addTask} />
            <ul>
                {task.map((tasks, index) => {
                    const isCompleted = completed.includes(index);
                    const taskColour = isCompleted ? { color: "green" } : { color: "black" };

                    return (
                        <li key={index} style={taskColour}>
                            {tasks}
                            <input type="checkbox" onChange={() => deleteTask(index)} />
                            <input type="checkbox" onChange={() => TaskDone(index)} checked={isCompleted} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default TodoList;