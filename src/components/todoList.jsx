import React, { useState, useEffect, use } from "react";
import TodoItem from "./todoItem";
import "./todoList.css";
import artcat from "../assets/artcat.gif";

function TodoList() {
  const [task, setTask] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [progress, setProgress] = useState(0);
  const [hasReachedFive, setHasReachedFive] = useState(false);

  const addTask = (newTask) => {
    setTask([...task, newTask]);
  };

  useEffect(() => {
    setProgress((completed.length / task.length) * 100);
  }, [completed, task]);

  const DeleteTask = (index) => {
    setTask(task.filter((_, i) => i !== index));
    setProgress((completed.length / task.length) * 100);
    setCompleted((prev) => {
      return prev.filter((i) => i !== index);
    });
  };

  const TaskDone = (index) => {
    setCompleted((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  useEffect(() => {
    if (task.length >= 5 && !hasReachedFive) {
      setHasReachedFive(true);
    }
  }, [task, hasReachedFive]);

  const CompletedTasks = () => {
    return (
      <>
        <div className="completed-tasks">
          <h4>Completed Tasks</h4>
          <ul>
            {completed.map((index) => (
              <li key={index}>{task[index]}</li>
            ))}
          </ul>
        </div>
      </>
    );
  };

  const Experience = ({ completed = [] }) => {
    const [experience, setExperience] = useState(0);
    const [level, setLevel] = useState(0);
    const [levelUp, setLevelUp] = useState(false);

    console.log(experience);
    console.log(level);

    useEffect(() => {
      if (completed.length > 0) {
        setExperience(completed.length * 10);
      } else {
        setExperience(0);
      }
    }, [completed]);

    useEffect(() => {
      if (experience > 100 && !levelUp) {
        setLevelUp(true);
        setLevel((prevlevel) => prevlevel + 1);
        setExperience((prevExperience) => prevExperience - completed.length);
      }
    }, [completed, level, experience, levelUp]);

    return (
      <div
        className="progress-container"
        style={{
          width: "50%",
          background: "#ddd",
          borderRadius: "10px",
          padding: "5px",
        }}
      >
        <div
          className="progress-bar"
          style={{
            width: `${level}%`,
            height: "20px",
            background: "green",
            borderRadius: "10px",
            transition: "width 0.5s ease-in-out",
          }}
        />
        <div
          style={{ textAlign: "center", marginTop: "5px", fontWeight: "bold" }}
        >
          {level}
        </div>
        <div
          className="progress-bar"
          style={{
            width: `${experience}%`,
            height: "20px",
            background: "green",
            borderRadius: "10px",
            transition: "width 0.5s ease-in-out",
          }}
        />
        <div
          style={{ textAlign: "center", marginTop: "5px", fontWeight: "bold" }}
        >
          {experience}
        </div>
      </div>
    );
  };

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
      <div
        className="progress-container"
        style={{
          width: "50%",
          background: "#ddd",
          borderRadius: "10px",
          padding: "5px",
        }}
      >
        <div
          className="progress-bar"
          style={{
            width: `${progress}%`,
            height: "20px",
            background: "green",
            borderRadius: "10px",
            transition: "width 0.5s ease-in-out",
          }}
        />
        <div
          style={{ textAlign: "center", marginTop: "5px", fontWeight: "bold" }}
        >
          {completed.length} / {task.length}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="header">
        <h2>My To-Do List</h2>
        <h4>Let's start easy. Add 5 tasks to get started.</h4>
        <Experience completed={completed} />
        <LevelUp completed={completed} task={task} />
      </div>
      <div className="todo-list">
        <div className="completed">
          <CompletedTasks />
        </div>
        <div className="player">
            <img src={artcat} alt="art cat GIF by hoppip" style={{ width: "100%", height: "auto" }} />
        </div>
        <div className="main">
          <TodoItem addTask={addTask} />
          <ul className="items">
            {task.map((tasks, index) => {
              const isCompleted = completed.includes(index);
              const taskColour = isCompleted
                ? { color: "green", textDecoration: "line-through" }
                : { color: "black" };

              return (
                <li key={index} style={taskColour}>
                  {tasks}
                  <input
                    type="checkbox"
                    onChange={() => DeleteTask(index)}
                    disabled={!hasReachedFive}
                  />
                  <input
                    type="checkbox"
                    onChange={() => TaskDone(index)}
                    checked={isCompleted}
                    disabled={!hasReachedFive}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TodoList;
