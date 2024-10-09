//TODO: Need to make it so when you delete a task it will also delete it from the local storage, 
//TODO: when changing task type it will add it to the corresponding type on navList
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function TaskBox({ taskText, tasks,setTasks }) {
  const [tags, setTags] = useState(taskText?.showAllTags() || []);
  const [showInput, setShowInput] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [lastPressed, setLastPressed] = useState({ tag: "", time: 0 });
  const [taskMenu, setTaskMenu] = useState(false);

  const taskName = taskText?.showTask() || "No Task";
  const date = taskText?.showDate() || new Date().toString();
  const description = taskText?.showDescription() || "No Description";

  const addTag = () => {
    if (newTag.trim() !== "") {
      setTags([...tags, newTag]);
      setNewTag("");
    }
    setShowInput(!showInput);
  };

  const handleTagPress = (tag) => {
    const now = Date.now();
    if (lastPressed.tag === tag && now - lastPressed.time < 300) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setLastPressed({ tag, time: now });
    }
  };

  const normalTag = (item) => (
    <TouchableOpacity
      style={styles.tagBubble}
      onPress={() => handleTagPress(item)}
    >
      <Text style={styles.tagText}>{item}</Text>
    </TouchableOpacity>
  );

  const button = () =>
    showInput ? (
      <TextInput
        style={styles.input}
        placeholder="inputTag"
        value={newTag}
        onChangeText={setNewTag}
        onSubmitEditing={addTag}
        autoFocus
      />
    ) : (
      <TouchableOpacity
        style={styles.tagBubble}
        onPress={() => setShowInput(true)}
      >
        <Text style={styles.tagText}>+</Text>
      </TouchableOpacity>
    );

  const showTags = () => (
    <View>
      <FlatList
        data={tags}
        renderItem={({ item }) => (item === "+" ? button() : normalTag(item))}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
      />
    </View>
  );

  const handlePress = () => {
    setTaskMenu(!taskMenu);
  };

  
  const updateTaskType = (newType) => {
    taskText.type = newType;
    setTasks([...tasks]);
    setTaskMenu(false);
  };

  const deleteTask = () => {
    setTasks(tasks.filter(task => task !== taskText));
  };
  const menuOptions = () => (
    <View style={styles.menuOption}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.option}>...</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateTaskType('Complete')}>
        <Text style={styles.option}>Complete</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateTaskType('ToDo')}>
        <Text style={styles.option}>ToDo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateTaskType('Progress')}>
        <Text style={styles.option}>Progress</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateTaskType('Wait')}>
        <Text style={styles.option}>Wait</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteTask}>
        <Text style={styles.option}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.taskContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.taskNav}>
          <Text style={styles.taskText}>{taskName}</Text>
        </View>

        <ScrollView style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
        </ScrollView>

        <View style={styles.tagsContainer}>
          {tags.length > 0 ? (
            showTags()
          ) : (
            <View style={styles.tagBubble}>
              <Text style={styles.tagText}>No Tags</Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <Text>{date}</Text>
        </View>
      </View>
      <View style={styles.menuContainer}>
        {taskMenu ? (
          <View>{menuOptions()}</View>
        ) : (
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.menu}>...</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  taskContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 11,
    marginVertical: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 14,
    height: 160,
    borderWidth: 1.2,
  },
  taskNav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  menu: {
    fontSize: 14,
    fontWeight: "bold",
  },
  tagsContainer: {
    display: "flex",
    marginVertical: 6,
    paddingVertical: 10,
  },
  footer: {},
  tagBubble: {
    backgroundColor: "orange",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginHorizontal: 5,
    alignSelf: "center",
  },
  tagText: {
    color: "black",
    textAlign: "center",
  },
  noTagsText: {
    color: "black",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  description: {
    fontSize: 14,
    fontWeight: 450,
  },

  menuOption: {
    height: "100%",
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },

  option: {
    fontWeight: 450,
    textAlign: 'right',
  }
});
