# 🎮 Gamified To-Do List with Natural Language Input (NLI)

A productivity app that transforms your daily tasks into a game. Add tasks using natural language (e.g., “Book dentist appointment tomorrow at 10am”) and level up as you complete them. Designed to motivate users through progress tracking, experience points, and encouraging feedback.

---

## 🚀 Features

- 🧠 **Natural Language Input**: Parse tasks with due dates using simple language (`"Finish report on Friday at 4pm"`).
- ✅ **To-Do & Completed Sections**: Keep your tasks organized — checked-off items move to a dedicated section.
- 🌱 **Leveling System**: Earn experience points (XP) with every task completed and level up when XP crosses 100.
- 📈 **Progress Bars**: Visualize your experience and level separately.
- 🎉 **Encouragement Messages**: Get motivational messages each time you complete a task.
- 🎨 **Animated Avatar**: A fun pixel-art character to accompany your progress.

---

## 🧩 Tech Stack

- **Frontend**: React
- **Backend**: Flask (Python) for natural language date parsing
- **NLP Parser**: [dateparser](https://dateparser.readthedocs.io/en/latest/)
- **Styling**: CSS
- **GIFs**: Custom or sourced via creative commons

---

## 💻 Local Setup

### 📦 Requirements

- Node.js (v16+)
- Python (3.8+)
- pip (Python package manager)

### 🧱 1. Clone the Repository

```bash
git clone https://github.com/jsimpsonux/my-buddy-todo
cd my-buddy-todo