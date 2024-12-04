import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SectionList, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { watchlistData } from './Data.js';
import { Picker } from '@react-native-picker/picker';

export default function Home({ navigation }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchText, setSearchText] = useState('');

    const calculateStats = () => {
        let totalMovies = 0;
        let watchedCount = 0;
        let notWatchedCount = 0;
        let notWatchedMovies = [];

        watchlistData.forEach((section) => {
            section.data.forEach((item) => {
                totalMovies++;
                if (item.watched) {
                    watchedCount++;
                } else {
                    notWatchedCount++;
                    notWatchedMovies.push(item.key);
                }
            });
        });

        const notWatchedMoviesList = notWatchedMovies.join('\n');

        Alert.alert(
            "Watch-Yo-List Status",
            `Total Movies: ${totalMovies}\nWatched Movies: ${watchedCount}\nNot Watched Movies: ${notWatchedCount}\n\nNot Watched Movies:\n${notWatchedMoviesList}`,
            [{ text: "OK" }]
        );
    };

    const renderItem = ({ item, index, section }) => {
        const sectionIndex = watchlistData.findIndex((sec) => sec.title === section.title);
        return (
            <TouchableOpacity
                style={styles.listItem}
                onPress={() =>
                    navigation.navigate("Edit", {
                        sectionIndex,
                        itemIndex: index,
                    })
                }
            >
                <Image source={{ uri: item.img }} style={styles.itemImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.itemTitle}>{item.key}</Text>
                    <Text style={styles.itemDesc}>{item.desc}</Text>
                    <Text style={[styles.itemDetails, item.watched ? styles.watched : styles.notWatched]}>
                        {item.type} | Rating: {item.rating} | {item.watched ? 'Watched' : 'Not Watched'}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderSectionHeader = ({ section }) => (
        <View style={[styles.sectionHeader, { backgroundColor: section.bgcolor }]}>
            <Text style={[styles.sectionTitle, { color: section.nameColor }]}>{section.title}</Text>
        </View>
    );

    const filteredData = watchlistData
        .filter((section) => selectedCategory === 'All' || section.title.includes(selectedCategory))
        .map((section) => ({
            ...section,
            data: section.data.filter((item) =>
                item.key.toLowerCase().includes(searchText.toLowerCase())
            ),
        }))
        .filter((section) => section.data.length > 0);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>🍿 Watchlist 🎥</Text>
                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="All" value="All" />
                    <Picker.Item label="Action" value="Action" />
                    <Picker.Item label="Comedy" value="Comedy" />
                    <Picker.Item label="Mystery" value="Mystery" />
                    <Picker.Item label="Horror" value="Horror" />
                    <Picker.Item label="Fantasy" value="Fantasy" />
                    <Picker.Item label="Romance" value="Romance" />
                </Picker>
            </View>
            <TextInput
                style={styles.searchInput}
                placeholder="Search Movies or TV Shows"
                placeholderTextColor="#888"
                onChangeText={(text) => setSearchText(text)}
                value={searchText}
            />
            <SectionList
                sections={filteredData}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item) => item.key}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('Add')}
            >
                <Text style={styles.addButtonText}>Add Watchy</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.statsButton}
                onPress={calculateStats}
            >
                <Text style={styles.statsButtonText}>Stats</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1F2D',
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    headerContainer: {
        paddingTop: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 30,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    picker: {
        height: 50,
        width: '100%',
        marginTop: 10,
        color: '#ffffff',
        backgroundColor: '#1A3A5A',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#4C7C9E',
    },
    searchInput: {
        backgroundColor: '#1A3A5A',
        color: '#ffffff',
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#4C7C9E',
    },
    sectionHeader: {
        padding: 15,
        backgroundColor: '#1A3A5A',
        borderBottomWidth: 1,
        borderBottomColor: '#4C7C9E',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    listItem: {
        flexDirection: 'row',
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#1A3A5A',
        borderRadius: 8,
    },
    itemImage: {
        width: 80,
        height: 100,
        borderRadius: 8,
    },
    textContainer: {
        marginLeft: 15,
        flex: 1,
    },
    itemTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    itemDesc: {
        color: '#A7C6D7',
        marginBottom: 8,
    },
    itemDetails: {
        color: '#B8C9D7',
        fontSize: 12,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    notWatched: {
        color: 'orange',
        fontWeight: 'bold',
    },
    watched: {
        color: 'lightgreen',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#4C7C9E',
        padding: 15,
        borderRadius: 50,
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    statsButton: {
        backgroundColor: '#FF5722',
        padding: 15,
        borderRadius: 50,
        position: 'absolute',
        bottom: 20,
        left: 20,
    },
    statsButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
