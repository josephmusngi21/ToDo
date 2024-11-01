# Task Manager App

## Summary
This project is a Task Manager app built using React Native. It allows users to add, update, and delete tasks with descriptions and tags, storing these tasks locally using AsyncStorage.

## Project Structure
- `App.js`: Entry point of the app, setting up the main interface and navigation.
- `Menu.js`: Component for adding new tasks with descriptions.
- `TaskBox.js`: Component for displaying and managing individual tasks, including updating task type and deleting tasks.
- `Task.js`: Class representing a task with properties like task name, date, type, tags, and description.

## Features
- Add new tasks with descriptions and tags.
- Update task type and delete tasks.
- Store tasks locally using AsyncStorage for persistence.

## Components
- `Menu`: Handles input for new tasks and descriptions.
- `TaskBox`: Displays individual tasks and provides options to update or delete them.
- `Task`: Class defining the structure of a task.

## Usage
1. Start the app.
2. Add new tasks with descriptions.
3. Update or delete tasks as needed.
4. Task types can be managed and tasks are stored locally for persistence.

## Styling
The app uses React Native's StyleSheet for styling components.

## Dependencies
- `react-native`: Framework for building native apps using React.
- `@react-native-async-storage/async-storage`: Library for local storage in React Native.

## Installation
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the app using `npm start` or `react-native run-android`/`react-native run-ios`.

