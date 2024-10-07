import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import Task from "./task";

export default function Menu({ taskInput, setTaskInput, setTasks, tasks }) {
  console.log('in Menu.js')
  const addTask = useCallback(() => {
    if (taskInput.trim() !== "") {
      const newTask = new Task(taskInput, new Date(), "Progress");
      console.log(newTask.toString());
      setTasks([...tasks, newTask]);
      setTaskInput("");
    } else {
      alert("Must add task");
    }
  }, [taskInput, tasks, setTasks, setTaskInput]);

  return (
    <View style={styles.menuContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={taskInput}
        onChangeText={(input) => setTaskInput(input)}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
