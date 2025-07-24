import React, { useState, useEffect, use } from "react";
import TodoItem from "./todoItem";
import "./todoList.css";
import artcat from "../assets/artcat.gif";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [progress, setProgress] = useState(0);
  const [hasReachedFive, setHasReachedFive] = useState(false);
  const [encouragingMessage, setEncouragingMessage] = useState("");

  const messages = [
    "Nice job! 🎉",
    "You're on fire! 🔥",
    "Keep going! 💪",
    "Task smashed! 💥",
    "One step closer to greatness! 🚀",
  ];

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
    setCompleted((prev) => {
      const isAlreadyCompleted = prev.includes(index);
      const updated = isAlreadyCompleted
        ? prev.filter((i) => i !== index)
        : [...prev, index];

      if (!isAlreadyCompleted) {
        const randomMessage =
          messages[Math.floor(Math.random() * messages.length)];
        setEncouragingMessage(randomMessage);

        setTimeout(() => setEncouragingMessage(""), 10000);
      }

      return updated;
    });
  };

  useEffect(() => {
    if (tasks.length >= 5 && !hasReachedFive) {
      setHasReachedFive(true);
    }
  }, [tasks, hasReachedFive]);

  const CompletedTasks = ({ tasks, completed }) => {
    return (
      <div>
        <h3>Completed Tasks</h3>
        <ul>
          {completed.map((index) => {
            const task = tasks[index];
            return (
              <li key={index}>
                {task.title}
                {task.dueDate && (
                  <span
                    style={{
                      marginLeft: "10px",
                      fontSize: "0.8em",
                      color: "#999",
                    }}
                  >
                    — Due {new Date(task.dueDate).toLocaleString()}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const Experience = ({ completed = [] }) => {
    const [experience, setExperience] = useState(0);
    const [level, setLevel] = useState(0);

    useEffect(() => {
      const totalXP = completed.length * 10;
      const newLevel = Math.floor(totalXP / 100);
      const currentXP = totalXP % 100;

      setLevel(newLevel);
      setExperience(currentXP);
    }, [completed]);

    return (
      <>
        <div className="progress-container" style={progressContainerStyle}>
          <div style={labelStyle}>
            <p>Level</p>
          </div>
          <div
            style={{ ...progressBarStyle, width: `${Math.min(level, 100)}%` }}
          />
          <div style={labelStyle}>{level}</div>
        </div>
        <div className="progress-container" style={progressContainerStyle}>
          <div style={labelStyle}>
            <p>Experience</p>
          </div>
          <div
            style={{
              ...progressBarStyle,
              width: `${Math.min(experience, 100)}%`,
            }}
          />
          <div style={labelStyle}>{experience}</div>
        </div>
      </>
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
          <CompletedTasks tasks={tasks} completed={completed} />
        </div>

        <div className="player">
          {encouragingMessage && (
            <div
              style={{
                fontSize: "1.2em",
                fontWeight: "bold",
                marginBottom: "10px",
                textAlign: "center",
                color: "#4CAF50",
              }}
            >
              {encouragingMessage}
            </div>
          )}
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

              if (isCompleted) return null;

              return (
                <li key={index} style={{ color: "black" }}>
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
