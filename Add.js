import { watchlistData } from "./Data";
import React, { useState } from 'react';
import { TextInput, Button, View, Text, StatusBar, StyleSheet, ToastAndroid } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { RadioButton } from 'react-native-paper';

const Add = ({ navigation }) => {
    const [movieName, setMovieName] = useState("");
    const [movieDesc, setMovieDesc] = useState("");
    const [movieImg, setMovieImg] = useState("");
    const [category, setCategory] = useState("Action Movies 🎬");
    const [rating, setRating] = useState(0);
    const [movieType, setMovieType] = useState('Movie');
    const [watched, setWatched] = useState(false);

    const addMovieToWatchlist = () => {
        if (!movieName || !movieDesc || !movieImg || rating < 0 || rating > 10) {
            ToastAndroid.show('Open your eyes and fill up form please.', ToastAndroid.SHORT);
            return;
        }

        const newMovie = {
            key: movieName,
            img: movieImg,
            desc: movieDesc,
            type: movieType,
            rating: rating,
            watched: watched,
        };

        const selectedCategory = watchlistData.find(item => item.title === category);
        if (selectedCategory) {
            selectedCategory.data.push(newMovie);
        }

        ToastAndroid.show('Watch added to list!', ToastAndroid.SHORT);
        navigation.navigate("Home");
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text style={styles.headerText}>Add New Watchlist</Text>

            <Text style={styles.label}>Movie Name:</Text>
            <TextInput
                style={styles.input}
                value={movieName}
                onChangeText={setMovieName}
                placeholder="Enter Movie Name"
                placeholderTextColor="#888"
            />

            <Text style={styles.label}>Movie Description:</Text>
            <TextInput
                style={styles.input}
                value={movieDesc}
                onChangeText={setMovieDesc}
                placeholder="Enter Movie Description"
                placeholderTextColor="#888"
            />

            <Text style={styles.label}>Movie Image URL:</Text>
            <TextInput
                style={styles.input}
                value={movieImg}
                onChangeText={setMovieImg}
                placeholder="Enter Movie Image URL"
                placeholderTextColor="#888"
            />

            <Text style={styles.label}>Select Category:</Text>
            <RNPickerSelect
                defaultValue="Action Movies 🎬"
                onValueChange={(value) => setCategory(value)}
                items={watchlistData.map(item => ({
                    label: item.title,
                    value: item.title
                }))}
                style={pickerStyles}
            />

            <Text style={styles.label}>Rating (0/1-10):</Text>
            <TextInput
                style={styles.input}
                value={String(rating)}
                onChangeText={(text) => {
                    const numericValue = Number(text);
                    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 10) {
                        setRating(numericValue);
                    }
                }}
                placeholder="Enter Rating"
                placeholderTextColor="#888"
                keyboardType="numeric"
                maxLength={2}
            />

            <Text style={styles.label}>Type:</Text>
            <View style={styles.radioGroup}>
                <View style={styles.radioItem}>
                    <RadioButton
                        value="Movie"
                        status={movieType === 'Movie' ? 'checked' : 'unchecked'}
                        onPress={() => setMovieType('Movie')}
                    />
                    <Text style={styles.radioLabel}>Movie</Text>
                </View>
                <View style={styles.radioItem}>
                    <RadioButton
                        value="TV Show"
                        status={movieType === 'TV Show' ? 'checked' : 'unchecked'}
                        onPress={() => setMovieType('TV Show')}
                    />
                    <Text style={styles.radioLabel}>TV Show</Text>
                </View>
            </View>

            <Text style={styles.label}>Watched:</Text>
            <View style={styles.radioGroup}>
                <View style={styles.radioItem}>
                    <RadioButton
                        value={true}
                        status={watched ? 'checked' : 'unchecked'}
                        onPress={() => setWatched(true)}
                    />
                    <Text style={styles.radioLabel}>Watched</Text>
                </View>
                <View style={styles.radioItem}>
                    <RadioButton
                        value={false}
                        status={!watched ? 'checked' : 'unchecked'}
                        onPress={() => setWatched(false)}
                    />
                    <Text style={styles.radioLabel}>Not Watched</Text>
                </View>
            </View>

            <Button
                title="Submit"
                color="#FF6666"
                onPress={addMovieToWatchlist}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1F2D',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    headerText: {
        fontSize: 30,
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        color: '#ffffff',
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#1A3A5A',
        color: '#fff',
        padding: 12,
        marginBottom: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#4C7C9E',
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioLabel: {
        color: '#ffffff',
        marginLeft: 5,
        fontSize: 16,
    },
});

const pickerStyles = {
    inputIOS: {
        backgroundColor: '#1A3A5A',
        color: '#fff',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#4C7C9E',
        marginBottom: 20,
    },
    inputAndroid: {
        backgroundColor: '#1A3A5A',
        color: '#fff',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#4C7C9E',
        marginBottom: 20,
    },
};

export default Add;
