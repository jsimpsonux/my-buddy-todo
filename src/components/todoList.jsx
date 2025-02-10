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

    const DeleteTask = (index) => {
        setTask(task.filter((_, i) => i!==index));

      //   useEffect(() => {
      //     setProgress((completed.length / task.length) * 100);
      // }, [completed, task]);
    };

    // const TaskDone = (index) => {
    //     setCompleted((prev) =>
    //         prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    //     );
    // };

    const TaskDone = (index) => {
      if (!completed.includes(index)) {
        setCompleted([...completed, index]);
      }
    }

    const LevelUp = ({ completed = [], task = [] }) => {
      const [progress, setProgress] = useState(0);
  
      useEffect(() => {
          if (task.length > 0) {
              setProgress((completed.length / task.length) * 100);
          } else {
              setProgress(0);
          }
      }, [completed, task]);
  
      return (
          <div className="progress-container" style={{ width: "100%", background: "#ddd", borderRadius: "10px", padding: "5px" }}>
              <div 
                  className="progress-bar" 
                  style={{ 
                      width: `${progress}%`, 
                      height: "20px", 
                      background: "green", 
                      borderRadius: "10px",
                      transition: "width 0.5s ease-in-out"
                  }} 
              />
              <div style={{ textAlign: "center", marginTop: "5px", fontWeight: "bold" }}>
                  {completed.length} / {task.length}
              </div>
          </div>
      );
  };

    // const LevelUp = () => {
    //     const [progress, setProgress] = useState(0);
        
    //     useEffect((index) => {
    //       const taskCompleted = completed.includes(index);
    //         if (taskCompleted > 0) {
    //             setProgress((taskCompleted.length / task) * 100);
    //         } else {
    //             setProgress(0);
    //         }

    //     }, [completed, task]);
    //     return (
    //         <div className="progress-container">
    //             <div className="progress-bar" style={{ width: `${progress}%` }}>
    //                 {completed.length}/{task.length} Completed
    //             </div>
    //         </div>
    //     );
    // }

    // const ProgressBar = ({ completed = [], task = [] }) => {
    //     const [progress, setProgress] = useState(0);
    
    //     useEffect(() => {
    //         if (task.length > 0) { // Prevent division by zero
    //             setProgress((completed.length / task.length) * 100);
    //         } else {
    //             setProgress(0); // Reset if no tasks
    //         }
    //     }, [completed, task]); // Runs when `completed` or `task` changes
    
    //     return (
    //         <div className="progress-container">
    //             <div className="progress-bar" style={{ width: `${progress}%` }}>
    //                 {completed?.length || 0}/{task?.length || 0} Completed
    //             </div>
    //         </div>
    //     );
    // };
    

    return (
        <div className="todo-list">
            <h2>My To-Do List</h2>
            {/* <ProgressBar/> */}
            <LevelUp completed={completed} task={task} />
            <TodoItem addTask={addTask} />
            <MotivationalQuote />
            <ul className="items">
                {task.map((tasks, index) => {
                    const isCompleted = completed.includes(index);
                    const taskColour = isCompleted ? { color: "green", textDecoration: "line-through"} : { color: "black" };

                    return (
                        <li key={index} style={taskColour}>
                            {tasks}
                            <input type="checkbox" onChange={() => DeleteTask(index)} />
                            <input type="checkbox" onChange={() => TaskDone(index)} checked={isCompleted} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default TodoList;