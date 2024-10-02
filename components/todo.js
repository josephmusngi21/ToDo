import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useCallback, useMemo } from "react";
import task from "../assets/task";

export default function ToDo() {
  console.log("ToDo component rendered");

  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [toDo, setToDo] = useState([]);
  const [progress, setProgress] = useState([]);
  const [wait, setWait] = useState([]);

  const [showMenu, setShowMenu] = useState(false);
  const [taskInput, setTaskInput] = useState("");

  const navItem = {
    Complete: { value: completed.length, color: "green" },
    ToDo: { value: toDo.length, color: "blue" },
    Progress: { value: progress.length, color: "orange" },
    Wait: { value: wait.length, color: "purple" },
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

  const addTask = useCallback(() => {
    if (taskInput != '') {
        setTasks((prevTasks) => [...prevTasks, taskInput]);
        setTaskInput("");
        console.log(tasks);
    } else {
        alert('Must add task');
    }

  }, [taskInput]);

  const Item = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.item}>{item.key}</Text>
      <View style={[styles.itemInt, { backgroundColor: item.color }]}>
        <Text style={styles.font}>{item.value}</Text>
      </View>
    </View>
  );

  const Menu = () => (
    <View style={styles.menuContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        // value={taskInput}
        // onChangeText={(text) => setTaskInput(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Text style={styles.title}>Task List</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={[styles.add]}>Menu</Text>
        </TouchableOpacity>
      </View>

      {showMenu ? <Menu /> : <Text> Nothing to see here</Text>}

      <View style={styles.list}>
        <FlatList
          data={navItemArray}
          renderItem={Item}
          keyExtractor={(item) => item.key}
          horizontal={true}
        />
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
    marginVertical: 20,
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
    borderWidth: 2,
    borderRadius: 20,
  },
  item: {
    display: "flex",
    marginRight: 9,
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
    color: "white",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    height: 55,
    alignItems: "center",
    marginTop: 12,
  },
});
