## Task Management App

#Description
The Task Management App is a React Native application designed to help users manage their tasks efficiently. Users can add new tasks, update the task type, delete tasks, and tag them with relevant tags. The app ensures persistent storage of tasks using AsyncStorage, so tasks are retained between sessions.

# Features
Add Tasks: Users can input a task and its description, and add it to the task list.

Tag Tasks: Users can tag tasks with relevant keywords for better organization.

Update Task Type: Users can change the task type to "Complete", "ToDo", "Progress", or "Wait".

Delete Tasks: Users can delete tasks from the list.

Persistent Storage: Tasks are saved using AsyncStorage to ensure they are retained between app sessions.

# How to Use
Add Tasks: Input a task name and description, and press "Add Task".

Tag Tasks: Press the "+" button to add tags to a task.

Update Task Type: Press the "..." button next to a task and select a task type.

Delete Tasks: Press the "..." button next to a task and select "Delete".

Persistent Storage: Tasks are automatically saved and loaded from AsyncStorage.

## Code Overview
# Menu Component
The Menu component allows users to input a new task and its description, and save it to the task list.

# ToDo Component
The ToDo component is the main component that manages the task list, including loading and saving tasks from AsyncStorage, and rendering the list of tasks.

# TaskBox Component
The TaskBox component represents an individual task in the task list. It includes functionality for updating the task type, deleting the task, and tagging the task.

# Task Class
The Task class defines the structure of a task, including methods for displaying task details.