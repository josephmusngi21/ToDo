import React, { useState, useMemo, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Ensure correct import
import Menu from "../assets/Menu";
import TaskBox from "../assets/TaskBox";
import Task from "../assets/task";

export default function ToDo() {
  console.log("ToDo component rendered");

  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [toDo, setToDo] = useState([]);
  const [progress, setProgress] = useState([]);
  const [wait, setWait] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const saveTasks = async (tasks) => {
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem('tasks', jsonValue);
      console.log("Tasks saved: ", jsonValue); // Log saved tasks
      await logAllStoredTasks(); // Log all stored tasks
    } catch (e) {
      console.error("Error saving tasks:", e);
    }
  };

  const loadTasks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tasks');
      console.log("Tasks loaded from storage: ", jsonValue); // Log loaded tasks
      if (jsonValue != null) {
        const parsedTasks = JSON.parse(jsonValue).map(task => new Task(task.task, new Date(task.date), task.type, task.tags, task.description));
        console.log("Parsed loaded tasks: ", parsedTasks); // Log parsed tasks
        setTasks(parsedTasks);
      }
    } catch (e) {
      console.error("Error loading tasks:", e);
    }
  };

  const logAllStoredTasks = async () => {
    try {
      const allTasks = await AsyncStorage.getItem('tasks');
      console.log("All Stored Tasks: ", allTasks); // Log all tasks stored in AsyncStorage
    } catch (e) {
      console.error("Error logging all stored tasks:", e);
    }
  };

  const date = new Date();
  console.log(date);

  const navItem = {
    Complete: { value: completed.length, color: "#fff5d7" },
    ToDo: { value: toDo.length, color: "#ff5e6c" },
    Progress: { value: progress.length, color: "#feb300" },
    Wait: { value: wait.length, color: "#ffaaab" },
  };

  const navItemArray = useMemo(
    () =>
      Object.keys(navItem).map((key) => ({
        key,
        value: navItem[key].value,
        color: navItem[key].color,
      })),
    [completed, toDo, progress, wait]
  );

  const handlePress = () => {
    setShowMenu(!showMenu);
  };

  const addTask = () => {
    if (taskInput.trim() !== "") {
      const newTask = new Task(taskInput, new Date(), "ToDo", [], descriptionInput);
      console.log("New task created:", newTask);
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setTaskInput("");
      setDescriptionInput(""); // Clear description input after adding task
    } else {
      alert("Must add task");
    }
  };

  const handleItemPress = (key) => {
    setSelectedItem(key);
  };

  const Item = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item.key)} style={[styles.itemContainer, selectedItem === item.key && styles.selectedItemContainer]}>
      <Text style={[styles.item, selectedItem === item.key && styles.selectedItem]}>{item.key}</Text>
      <View style={[styles.itemInt, { backgroundColor: item.color }]}>
        <Text style={styles.font}>{item.value}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Text style={styles.title}>Task List</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.add}>Add Task</Text>
        </TouchableOpacity>
      </View>

      {showMenu ? (
        <Menu
          taskInput={taskInput}
          setTaskInput={setTaskInput}
          addTask={addTask}
          tasks={tasks}
          setTasks={setTasks}
          descriptionInput={descriptionInput}
          setDescriptionInput={setDescriptionInput}
        />
      ) : (
        <View></View>
      )}

      <View style={styles.list}>
        <FlatList
          data={navItemArray}
          renderItem={Item}
          keyExtractor={(item) => item.key}
          horizontal={true}
        />
      </View>

      <View style={styles.taskList}>
        {tasks.length > 0 ? (
          <FlatList
            data={tasks}
            renderItem={({ item }) => (
              <TaskBox taskText={item} key={item.showTask()} setTasks={setTasks} tasks={tasks}/>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text>No tasks added yet</Text>
        )}
      </View>
    </View>
  );
}



        


const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: 20,
    padding: 20,
  },
  nav: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
    width: "95%",
  },
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
  title: {
    fontSize: 29,
    marginTop: 12,
    marginLeft: 12,
  },
  add: {
    fontSize: 14,
    marginTop: 12,
    marginLeft: 12,
  },
  itemContainer: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    width: "auto",
    height: 38,
    marginHorizontal: 10,
    borderWidth: 1.3,
    borderRadius: 20,
  },
  selectedItemContainer: {
    backgroundColor: "black",
  },
  item: {
    display: "flex",
    marginRight: 9,
    color: "black",
  },
  selectedItem: {
    color: "white",
  },
  itemInt: {
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 24,
    textAlign: "center",
    borderRadius: 15,
  },
  font: {
    color: "black",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    height: 55,
    alignItems: "center",
    marginTop: 12,
  },

  taskList: {
    marginVertical: 20,
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 2,
    height: 690,
    overflow: 'hidden',
  }
});
