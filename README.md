# Modern Control Learning

Modern Control Learning is a browser-based educational platform for rebuilding control-systems knowledge from the fundamentals and progressing toward modern control analysis and design.

The project is designed for learners who may be returning to control engineering after a long gap, as well as students who want a structured path from prerequisite mathematics to practical modern-control applications.

## Learning approach

The course is organized around a simple principle:

**Learn → Example → Practice → Debug → Real-world problem → Q&A → Checkpoint → Next lesson**

Rather than presenting control theory as a collection of equations, the platform connects mathematical ideas with physical intuition, interactive simulation, MATLAB practice, and visual results.

## Curriculum

The learning path is divided into three levels.

### Beginner / Foundation

Rebuild the prerequisites needed for control engineering:

- mathematics refresher
- algebra and matrices
- calculus and differential equations
- Laplace transforms
- control-system foundations
- mathematical modeling
- classical control concepts

### Intermediate / Modern Control Core

Develop the core state-space framework:

- state variables and state-space models
- state transition and system response
- eigenvalues, modes, and stability
- controllability
- observability
- state feedback
- pole placement
- observers

### Advanced / Design & Applications

Move from analysis toward design and implementation:

- Lyapunov stability
- optimal control
- LQR
- digital/discrete-time control
- MATLAB and Simulink practice
- computational verification
- robotics and practical control applications
- advanced projects

## Interactive laboratories

The project includes browser-based visual laboratories intended to make abstract control concepts easier to understand.

Current labs include:

- First-Order Step Response
- Second-Order Damping
- Root-Locus / Gain Explorer
- State-Space Eigenvalue and State Motion
- PID Tuning
- Inverted Pendulum
- Robotics / Computed Torque Control

Many labs include equivalent MATLAB examples so learners can change parameters visually in the browser and then reproduce the experiment in MATLAB.

## MATLAB practice

MATLAB examples are integrated with the learning material and labs. Topics include commonly used control-system operations such as:

- transfer-function models
- step responses
- response characteristics
- root locus
- state-space models
- eigenvalue analysis
- initial-condition responses
- PID control
- feedback systems

The goal is not simply to provide code to copy. Learners are encouraged to predict the result, run the simulation, inspect the plot, and explain why the system behaves that way.

## Formula Sheet

The Formula Sheet provides a compact reference for formulas used throughout the course, including:

- algebra and trigonometry
- differentiation and integration
- differential equations
- Laplace transforms
- matrices and linear algebra
- classical control
- state-space systems
- controllability and observability
- state feedback and observers
- Lyapunov stability
- LQR and Riccati equations
- discrete-time stability

The sheet can be printed or saved as a PDF from the browser and can also be downloaded as a standalone HTML reference.

## Benchmarks and progress

Lessons include knowledge checks and progress tracking. Benchmark problem sets are intended as end-of-stage mastery checks. A stage benchmark becomes available after the learner completes the corresponding stage.

Progress is stored locally in the browser.

## Project structure

```text
Learning-Modern-Control/
├── index.html
├── course-content.js
├── course-engine.js
├── content.js
├── app.js
├── styles.css
└── .github/
```

The current site is intentionally lightweight and can be hosted directly with GitHub Pages.

## Running locally

No build system is required for the current version.

Clone the repository and serve the directory with any simple local web server. For example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

Using a local web server is preferable to opening `index.html` directly because browser security rules can affect some functionality when files are loaded with the `file://` protocol.

## Stable baseline

The current main branch represents the stable baseline established after the curriculum, learning paths, formula sheet, practical labs, MATLAB examples, progress tracking, and stage benchmark system were integrated.

Future features should be added incrementally and tested against this baseline so working learning flows are not unnecessarily disturbed.

## Educational purpose

This project is an independent educational resource. It is not an official university course, and the learning material should not be interpreted as a replacement for an instructor, textbook, laboratory safety requirements, or institution-specific course material.

## Copyright and licensing

© 2026 Ferdous Bhuiya.

### Course and educational content

Original lessons, explanations, exercises, problem sets, learning-path organization, educational text, and other original course content are **All Rights Reserved** unless explicitly stated otherwise.

Permission is not granted to republish, redistribute, sell, or incorporate substantial portions of the original educational content into another product without permission from the copyright holder.

### Source code

Original source code in this repository is released under the **MIT License**, subject to the terms in the `LICENSE` file.

The MIT license applies to the source code. It does **not** grant a license to separately protected course content, third-party materials, trademarks, logos, or other assets unless explicitly stated.

## Author

**Ferdous Bhuiya**

Modern Control Learning  
**Learning • Practice • Build**

---

This project is being developed as a practical, continuously improving learning environment for modern control systems.
