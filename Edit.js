import React, { useState } from "react";
import { View, TextInput, Text, Button, StatusBar, StyleSheet, ToastAndroid } from "react-native";
import { RadioButton } from "react-native-paper";
import { watchlistData } from "./Data";

const Edit = ({ navigation, route }) => {
    const { categoryIndex = 0, itemIndex = 0 } = route.params || {};

    const selectedCategory = watchlistData[categoryIndex];
    const watchlistItem = selectedCategory?.data[itemIndex];

    if (!watchlistItem) {
        return (
            <View style={styles.container}>
                <Text style={[styles.label, { color: "red" }]}>Invalid data provided!</Text>
                <View style={styles.buttonWrapper}>
                    <Button title="Go Back" onPress={() => navigation.navigate("Home")} />
                </View>
            </View>
        );
    }

    const [key, setKey] = useState(watchlistItem.key);
    const [desc, setDesc] = useState(watchlistItem.desc);
    const [rating, setRating] = useState(watchlistItem.rating.toString());
    const [watched, setWatched] = useState(watchlistItem.watched);

    const saveChanges = () => {
        const numericRating = Number(rating);
        if (!key || !desc || numericRating < 0 || numericRating > 10) {
            ToastAndroid.show("Open your eyes and fill up form please.", ToastAndroid.SHORT);
            return;
        }

        watchlistItem.key = key;
        watchlistItem.desc = desc;
        watchlistItem.rating = numericRating;
        watchlistItem.watched = watched;

        ToastAndroid.show("I gotchu, UPDATED for you!", ToastAndroid.SHORT);
        navigation.navigate("Home");
    };

    const deleteEntry = () => {
        ToastAndroid.show("So-long wat to watch!", ToastAndroid.SHORT);
        selectedCategory.data.splice(itemIndex, 1);
        navigation.navigate("Home");
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text style={styles.headerText}>Edit Watchlist</Text>

            <Text style={styles.label}>Title:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setKey}
                value={key}
                placeholder="Enter Title"
                placeholderTextColor="#888"
            />

            <Text style={styles.label}>Description:</Text>
            <TextInput
                style={[styles.input, { height: 100, textAlignVertical: "top" }]}
                onChangeText={setDesc}
                value={desc}
                placeholder="Enter Description"
                placeholderTextColor="#888"
                multiline
            />

            <Text style={styles.label}>Rating (0/1-10):</Text>
            <TextInput
                style={styles.input}
                value={rating}
                onChangeText={(text) => {
                    const numericValue = Number(text);
                    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 10) {
                        setRating(text);
                    }
                }}
                placeholder="Enter Rating"
                placeholderTextColor="#888"
                keyboardType="numeric"
                maxLength={2}
            />

            <Text style={styles.label}>Watched:</Text>
            <View style={styles.radioGroup}>
                <View style={styles.radioItem}>
                    <RadioButton
                        value={true}
                        status={watched ? "checked" : "unchecked"}
                        onPress={() => setWatched(true)}
                    />
                    <Text style={styles.radioLabel}>Watched</Text>
                </View>
                <View style={styles.radioItem}>
                    <RadioButton
                        value={false}
                        status={!watched ? "checked" : "unchecked"}
                        onPress={() => setWatched(false)}
                    />
                    <Text style={styles.radioLabel}>Not Watched</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <Button title="Save" onPress={saveChanges} color="#FF6666" />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button title="Delete" onPress={deleteEntry} color="red" />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0D1F2D",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    headerText: {
        fontSize: 30,
        color: "#ffffff",
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        color: "#ffffff",
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#1A3A5A",
        color: "#fff",
        padding: 12,
        marginBottom: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#4C7C9E",
    },
    radioGroup: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
    },
    radioItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    radioLabel: {
        color: "#ffffff",
        marginLeft: 5,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    buttonWrapper: {
        flex: 1,
        marginHorizontal: 5,
    },
});

export default Edit;
