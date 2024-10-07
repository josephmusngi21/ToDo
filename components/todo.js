//  TODO:
//  Move files to separate Files
//
//
//
//
//
//

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useCallback, useMemo } from "react";
import Menu from "../assets/Menu";

export default function ToDo() {
  console.log("ToDo component rendered");

  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [toDo, setToDo] = useState([]);
  const [progress, setProgress] = useState([]);
  const [wait, setWait] = useState([]);

  const [showMenu, setShowMenu] = useState(false);
  const [taskInput, setTaskInput] = useState();

  const date = Date();
  console.log(date);

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

  const taskToObject = () => {
    // Will convert to task object
  };

  const Item = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.item}>{item.key}</Text>
      <View style={[styles.itemInt, { backgroundColor: item.color }]}>
        <Text style={styles.font}>{item.value}</Text>
      </View>
    </View>
  );

  const taskBox = (taskText) => {
    //TODO: Need to add styling
    //? Transfer to seperate file?
    // Shows the tasks including the task, tags and when it was set
    // taskTask is a object from task.js
    const taskName = taskText.showtask();
    const tags = taskText.showAllTags();
    const date = taskText.showDate();

    return (
      <View style={styles.taskContainer}>
        <View style={styles.taskNav}>
          <Text>{taskName}</Text>
          <TouchableOpacity style={styles.menu}>
            <Text>Menu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tags}>
          <FlatList
            data={tags}
            renderItem={"pass"}
            keyExtractor={"pass"}
            horizontal={true}
          />
        </View>

        <View style={styles.footer}>
          <Text>{date}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Text style={styles.title}>Task List</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={[styles.add]}>Menu</Text>
        </TouchableOpacity>
      </View>

      {/* {showMenu ? Menu() : <Text> Nothing to see here</Text>} */}
      {showMenu ? (
        <Menu
          taskInput={taskInput}
          setTaskInput={setTaskInput}
          tasks={tasks}
          setTasks={setTasks}
        />
      ) : (
        <Text> Nothing to see here</Text>
      )}

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
