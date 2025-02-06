import React, { useState, useEffect } from "react";
import TodoItem from "./todoItem";
import './todoList.css';
import MotivationalQuote from "../api/zenquotes";

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

    // const LevelUp = (index) => {
    //     const [progress, setProgress] = useState(0);
    //     const taskCompleted = completed.includes(index);
    //     if (taskCompleted) {
    //         setProgress(progress + 10);
    //     }
    // }

    const ProgressBar = ({ completed, task }) => {
        const [progress, setProgress] = useState(0);
    
        useEffect(() => {
            setProgress((completed.length / task) * 100);
        }, [completed, task]);
    
        return (
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `100%` }}>
                    {completed.length}/{task} Completed
                </div>
            </div>
        );
    };

    return (
        <div className="todo-list">
            <h2>My To-Do List</h2>
            <ProgressBar/>
            <TodoItem addTask={addTask} />
            <MotivationalQuote />
            <ul className="items">
                {task.map((tasks, index) => {
                    const isCompleted = completed.includes(index);
                    const taskColour = isCompleted ? { color: "green", textDecoration: "line-through"} : { color: "black" };

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