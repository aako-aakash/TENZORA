# TENZORA 🎲  

A polished, accessible React-based Tenzies dice game

TENZORA is a modern implementation of the classic **Tenzies** game, built with a strong focus on **clean architecture, accessibility, UX polish, and real-world React patterns**.

This project goes beyond a basic tutorial by incorporating animations, sound control, keyboard accessibility, and thoughtful state management.

---

## 🚀 Live Demo

🔗 https://tenzora.vercel.app  


---

## 🎮 About the Game

The goal of Tenzies is simple:
> **Get all ten dice to show the same number.**

### How to Play
1. Click **Roll** to roll all dice.
2. Click on individual dice to **hold** their value.
3. Roll again — only unheld dice change.
4. Win when **all dice are held and show the same number**.

---

## ✨ Features

### 🎲 Gameplay
- Interactive dice grid
- Hold / unhold dice
- Win detection logic
- New game reset

### 🎨 UX & Polish
- Smooth dice roll animations
- Confetti celebration on win (`react-confetti`)
- Auto-collapsing rules panel
- Auto-scroll to gameplay
- Fully responsive (mobile-first)

### 🔊 Sound System
- Roll sound (primary action only)
- Win sound
- Global sound toggle
- Auto-mute on tab switch
- Clean Audio API handling with `useRef`

### ♿ Accessibility
- Semantic HTML (`button`, `header`, `main`, `footer`)
- Keyboard navigation (Tab / Enter / Space)
- Screen reader–only instructions
- ARIA states (`aria-pressed`, live regions)
- Decorative animations hidden from assistive tech

### 📊 Game Stats
- Roll counter
- Timer (starts on first roll, stops on win)

---

## 🧠 Tech Stack

- **React** (Vite)
- **JavaScript (ES6+)**
- **CSS** (custom, no UI frameworks)
- **react-confetti**
- **nanoid**
- **Vercel** (deployment)

---

## 🗂 Project Structure

```txt
TENZORA/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── sounds/
│   │   │   ├── click.mp3
│   │   │   └── win.mp3
│   │   └── Tenzora_logo.png
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── MainPage.jsx
│   │   ├── Die.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── README.md
└── LICENSE



---

## 🧠 What This Project Demonstrates

- Thoughtful React state management
- Proper use of `useEffect` and `useRef`
- Separation of logic vs side effects
- Accessibility-first UI decisions
- Real-world debugging and refactoring
- Clean, maintainable component design

---

## 👨‍💻 Author

**AAKASH**  
Designed & built as a portfolio capstone project.

- GitHub: https://github.com/aako-aakash
- LinkedIn:https://www.linkedin.com/in/akash-kumar-saw-bb1630258
---

## 📄 License

This project is licensed under the **MIT License** — see the `LICENSE` file for details.
