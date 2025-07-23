import React, { useState, useEffect, use } from "react";
import TodoItem from "./todoItem";
import "./todoList.css";
import artcat from "../assets/artcat.gif";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [progress, setProgress] = useState(0);
  const [hasReachedFive, setHasReachedFive] = useState(false);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  useEffect(() => {
    setProgress((completed.length / tasks.length) * 100);
  }, [completed, tasks]);

  const DeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    setProgress((completed.length / tasks.length) * 100);
    setCompleted((prev) => prev.filter((i) => i !== index));
  };

  const TaskDone = (index) => {
    setCompleted((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    if (tasks.length >= 5 && !hasReachedFive) {
      setHasReachedFive(true);
    }
  }, [tasks, hasReachedFive]);

  const CompletedTasks = () => (
    <div className="completed-tasks">
      <h4>Completed Tasks</h4>
      <ul>
        {completed.map((index) => (
          <li key={index}>
            {tasks[index]?.title}
            {tasks[index]?.dueDate && (
              <span
                style={{ marginLeft: "10px", fontSize: "0.8em", color: "#666" }}
              >
                — Due {new Date(tasks[index].dueDate).toLocaleString()}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  const Experience = ({ completed = [] }) => {
    const [experience, setExperience] = useState(0);
    const [level, setLevel] = useState(0);
    const [levelUp, setLevelUp] = useState(false);

    console.log(experience);
    console.log(level);

    useEffect(() => {
      setExperience(completed.length * 10);
    }, [completed]);

    useEffect(() => {
      if (experience > 100 && !levelUp) {
        setLevelUp(true);
        setLevel((prev) => prev + 1);
        setExperience((prev) => prev - completed.length);
      }
    }, [experience, completed, levelUp]);

    return (
      <div className="progress-container" style={progressContainerStyle}>
        <div style={{ ...progressBarStyle, width: `${level}%` }} />
        <div style={labelStyle}>{level}</div>
        <div style={{ ...progressBarStyle, width: `${experience}%` }} />
        <div style={labelStyle}>{experience}</div>
      </div>
    );
  };

  const LevelUp = ({ completed = [], task = [] }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      setProgress(
        tasks.length > 0 ? (completed.length / tasks.length) * 100 : 0
      );
    }, [completed, tasks]);

    return (
      <div className="progress-container" style={progressContainerStyle}>
        <div style={{ ...progressBarStyle, width: `${progress}%` }} />
        <div style={labelStyle}>
          {completed.length} / {tasks.length}
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
        <LevelUp completed={completed} tasks={tasks} />
      </div>

      <div className="todo-list">
        <div className="completed">
          <CompletedTasks />
        </div>

        <div className="player">
          <img
            src={artcat}
            alt="art cat GIF by hoppip"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <div className="main">
          <TodoItem addTask={addTask} />

          <ul className="items">
            {tasks.map((task, index) => {
              const isCompleted = completed.includes(index);
              const taskStyle = isCompleted
                ? { color: "green", textDecoration: "line-through" }
                : { color: "black" };

              return (
                <li key={index} style={taskStyle}>
                  {task.title}
                  {task.dueDate && (
                    <span
                      style={{
                        marginLeft: "10px",
                        fontSize: "0.8em",
                        color: "#666",
                      }}
                    >
                      — Due {new Date(task.dueDate).toLocaleString()}
                    </span>
                  )}
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
const progressContainerStyle = {
  width: "50%",
  background: "#ddd",
  borderRadius: "10px",
  padding: "5px",
};

const progressBarStyle = {
  height: "20px",
  background: "green",
  borderRadius: "10px",
  transition: "width 0.5s ease-in-out",
};

const labelStyle = {
  textAlign: "center",
  marginTop: "5px",
  fontWeight: "bold",
};

export default TodoList;
