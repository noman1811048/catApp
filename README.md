# Cat API Viewer - React Frontend

This is the React frontend for the Cat API Viewer project. It provides a user interface for browsing cat images, filtering by breed, adding favorites, and voting on cats.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Development](#development)
4. [Building for Production](#building-for-production)
5. [Project Structure](#project-structure)
6. [Features](#features)
7. [Contributing](#contributing)

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (version 14 or later)
- npm (usually comes with Node.js)
- Git

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/noman1811048/catApp.git
   cd catApp
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Development

To start the development server:

```
npm run dev
```

This will run the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser. The page will reload when you make changes.

## Building for Production

To build the app for production:

```
npm run build
```

This builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Project Structure

```
catApp/
├── dist/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── BreedsTab/
│   │   ├── FavsTab/
│   │   ├── Header/
│   │   ├── Homepage/
│   │   ├── TabContent/
│   │   └── VotingTab/
│   ├── config/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## Features

- Display a list of cat images from The Cat API
- Filter cats by breed
- Add cats to favorites
- Vote and unvote for cats
- Responsive design for various screen sizes

## Contributing

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes.

## Integration with Beego Backend

After building the React app:

1. Copy all files from the `build` folder to the `static` folder in the Beego project
2. Rename `index.html` to `index.tpl` and move it to the `views` folder in the Beego project

This allows the Beego server to serve the React frontend through its template rendering system.
