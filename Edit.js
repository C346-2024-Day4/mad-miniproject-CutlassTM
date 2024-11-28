import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Switch } from 'react-native';
import { watchlistData } from './Data.js';

const Edit = ({ route, navigation }) => {
    const { sectionIndex, itemIndex } = route.params || {};
    const isEditing = sectionIndex !== undefined && itemIndex !== undefined;

    const [movieKey, setMovieKey] = useState('');
    const [movieDesc, setMovieDesc] = useState('');
    const [movieImg, setMovieImg] = useState('');
    const [movieGenre, setMovieGenre] = useState('');
    const [movieBgColor, setMovieBgColor] = useState('');
    const [movieNameColor, setMovieNameColor] = useState('');
    const [movieType, setMovieType] = useState('');
    const [movieRating, setMovieRating] = useState('');
    const [movieWatched, setMovieWatched] = useState(false);

    useEffect(() => {
        if (isEditing) {
            const movie = watchlistData[sectionIndex].data[itemIndex];
            setMovieKey(movie.key);
            setMovieDesc(movie.desc);
            setMovieImg(movie.img);
            setMovieGenre(movie.genre);
            setMovieBgColor(movie.bgcolor);
            setMovieNameColor(movie.nameColor);
            setMovieType(movie.type);
            setMovieRating(movie.rating);
            setMovieWatched(movie.watched);
        }
    }, [isEditing, sectionIndex, itemIndex]);

    const handleSave = () => {
        const newMovie = {
            key: movieKey,
            desc: movieDesc,
            img: movieImg,
            genre: movieGenre,
            bgcolor: movieBgColor,
            nameColor: movieNameColor,
            type: movieType,
            rating: movieRating,
            watched: movieWatched,
        };

        if (isEditing) {
            watchlistData[sectionIndex].data[itemIndex] = newMovie;
        } else {
            const newSection = { title: movieGenre, data: [newMovie] };
            watchlistData.push(newSection);
        }

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{isEditing ? 'Edit Movie' : 'Add New Movie'}</Text>
            <TextInput
                style={styles.input}
                value={movieKey}
                onChangeText={setMovieKey}
                placeholder="Movie Name"
            />
            <TextInput
                style={styles.input}
                value={movieDesc}
                onChangeText={setMovieDesc}
                placeholder="Movie Description"
            />
            <TextInput
                style={styles.input}
                value={movieImg}
                onChangeText={setMovieImg}
                placeholder="Image URL"
            />
            <TextInput
                style={styles.input}
                value={movieGenre}
                onChangeText={setMovieGenre}
                placeholder="Genre"
            />
            <TextInput
                style={styles.input}
                value={movieBgColor}
                onChangeText={setMovieBgColor}
                placeholder="Background Color"
            />
            <TextInput
                style={styles.input}
                value={movieNameColor}
                onChangeText={setMovieNameColor}
                placeholder="Name Color"
            />
            <TextInput
                style={styles.input}
                value={movieType}
                onChangeText={setMovieType}
                placeholder="Type"
            />
            <TextInput
                style={styles.input}
                value={movieRating}
                onChangeText={setMovieRating}
                placeholder="Rating"
                keyboardType="numeric"
            />
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Watched:</Text>
                <Switch
                    value={movieWatched}
                    onValueChange={setMovieWatched}
                />
            </View>
            <Button title="Save" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#111',
    },
    headerText: {
        fontSize: 24,
        color: '#FF6666',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#333',
        color: '#fff',
        padding: 10,
        marginBottom: 15,
        borderRadius: 8,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    switchLabel: {
        color: '#fff',
        fontSize: 18,
    },
});

export default Edit;
