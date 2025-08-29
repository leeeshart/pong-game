# Simple Pong Game

## Overview
This project is a simple, classic Pong game built using plain HTML5, CSS, and JavaScript. It features a player-controlled paddle on the left (using your mouse), an AI-controlled paddle on the right, and a bouncing ball. You score points by getting the ball past your opponent's paddle. The game keeps track of scores and uses smooth graphics on a canvas.

---

## How It Works (In Everyday Language)
- **Play with your Mouse:** Move your mouse up and down to control your paddle.
- **AI Opponent:** The computer controls the right-side paddle and tries to block your shots.
- **Score Points:** Every time the ball passes the opponent's paddle, you earn a point.
- **Real-Time Action:** The score updates instantly, and everything moves smoothly.

---

## How the Game is Built

### Frontend Architecture
- **Pure Client-Side:** Everything runs in your browser, no downloads or installations needed.
- **Canvas-Based Graphics:** Uses the HTML5 Canvas for drawing paddles, ball, and the game area.
- **Mouse Controls:** The paddle follows your mouse movements for quick reactions.
- **Simple Game State:** Basic JavaScript variables keep track of where everything is and who's winning.

### Game Logic
- **Ball Physics:** The ball has position and speed properties, making it bounce realistically.
- **Collision Detection:** The game checks for ball hits against paddles and walls.
- **AI Paddle:** The computer paddle moves automatically to try and block the ball.
- **Score Display:** See your score and the computer's score while you play.

### Rendering System
- **Drawing Functions:** The code has neat functions for drawing rectangles (paddles) and circles (ball).
- **Visual Effects:** There's a dashed center line and clean, simple styling for the game.
- **Responsive Layout:** The game sits nicely in the center of the page with a fixed size for consistent play.

---

## Project Structure

- **HTML:** Handles the basic layout and structure of the game.
- **CSS:** Styles the game area and paddles.
- **JavaScript:** Powers the game logic, physics, and drawing.

All files are separated for clarity:
- `index.html`
- `style.css`
- `game.js`

No outside images, sounds, or libraries are needed—everything is self-contained.

---

## External Dependencies

- **Browser APIs:**
  - **HTML5 Canvas API:** For graphics and animation.
  - **DOM Events:** For mouse input.
  - **requestAnimationFrame:** For smooth game animation (if used).
- **No External Libraries:** Just plain JavaScript, no frameworks, CDNs, or server-side code.

---

## Getting Started

1. **Clone or Download:** Get the project files onto your computer.
2. **Open `index.html`:** Double-click to play in your browser.
3. **Play Pong!** Move your mouse to control your paddle and try to beat the computer.

---

Enjoy the game!
