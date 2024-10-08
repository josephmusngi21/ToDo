import React, { useCallback } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";
import Task from "./task";

export default function Menu({ taskInput, setTaskInput, setTasks, tasks, descriptionInput, setDescriptionInput }) {    
    const addTask = useCallback(() => {
        if (taskInput.trim() !== "" && descriptionInput.trim() !== "") {
            const newTask = new Task(taskInput, new Date(), "Progress", ["+"], descriptionInput); // Correctly assign description
            console.log(newTask.toString());
            setTasks([...tasks, newTask]);
            setTaskInput("");
            setDescriptionInput("");
        } else {
            alert("Must add task and description");
        }
    }, [taskInput, descriptionInput, tasks, setTasks, setTaskInput, setDescriptionInput]);

    return (
        <View style={styles.menuContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, styles.taskInput]}
                    placeholder="Enter Task"
                    value={taskInput}
                    onChangeText={setTaskInput}
                />
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Enter Description"
                    value={descriptionInput}
                    onChangeText={setDescriptionInput}
                    multiline
                    numberOfLines={4}
                />
            </View>

            <TouchableOpacity style={styles.addButton} onPress={addTask}>
                <Text style={styles.addButtonText}>Add Task</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    menuContainer: {
        padding: 3,
        borderRadius: 10,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        marginVertical: 3,
    },
    taskInput: {
        flex: 1,
        height: 40, // Fixed height for task input
    },
    descriptionInput: {
        flex: 2,
        height: 80,
        textAlignVertical: 'top', // Align text at the top of the input field
    },
    addButton: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        height: "100%",
    },
    addButtonText: {
        textAlignVertical: "center",
        textAlign: 'center',
        color: "white",
        fontWeight: "bold",
    },
    inputContainer: {
        height: 140,
        width: "75%",
        flexDirection: "column",
        justifyContent: "space-between",
    },
});
