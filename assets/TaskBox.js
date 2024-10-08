import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet, ScrollView } from "react-native";

export default function TaskBox({ taskText }) {
  const [tags, setTags] = useState(taskText?.showAllTags() || []);
  const [showInput, setShowInput] = useState(false);
  const [newTag, setNewTag] = useState("");
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

  const normalTag = (item) => (
    <View style={styles.tagBubble}>
      <Text style={styles.tagText}>{item}</Text>
    </View>
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

  return (
    <View style={styles.taskContainer}>
      <View style={styles.taskNav}>
        <Text style={styles.taskText}>{taskName}</Text>
        <View style={styles.menuContainer}>
          <TouchableOpacity>
            <Text style={styles.menu}>...</Text>
          </TouchableOpacity>
        </View>
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
  );
}

const styles = StyleSheet.create({
  taskText: {
    fontWeight: 'bold',
    fontSize: 16
  }, 
  taskContainer: {
    display: "flex",
    flexDirection: "column",
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
    fontWeight: '450'
  }
});
