import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function TaskBox({ taskText }) {
    const taskName = taskText?.showTask() || "No Task"; // Safely accessing task properties
    const tags = taskText?.showAllTags() || [];
    const date = taskText?.showDate() || new Date().toString();
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
            renderItem={({ item }) => <Text>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
          />
        </View>

        <View style={styles.footer}>
          <Text>{date}</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  taskContainer: {},
  taskNav: {},
  menu: {},
  tags: {},
  footer: {},
});
