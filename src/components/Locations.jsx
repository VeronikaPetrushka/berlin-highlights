import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import locations from '../constants/locations';

const { height, width } = Dimensions.get('window');

const Locations = () => {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isInfo, setIsInfo] = useState(false);

    const handleInfo = (item) => {
        if (selectedItem) {
            setSelectedItem(null);
            setIsInfo(false);
        } else {
            setSelectedItem(item);
            setIsInfo(true);
        }
    };

    const copyAddress = (text) => {
        Clipboard.setString(text);
        Alert.alert('Copied to clipboard');
    };

    return (
        <View style={styles.container}>
            
            {
                currentIndex === 0 && (
                    <View style={{width: '100%', alignItems: 'center', padding: 20, paddingTop: height * 0.07}}>

                        <TouchableOpacity style={[styles.btn, {alignSelf: 'flex-end', width: 53, height: 53}]} onPress={() => navigation.navigate('FavoriteScreen')}>
                            <Image source={require('../assets/icons/fav-star.png')} style={{width: 30, height: 30, resizeMode: 'contain'}} />
                        </TouchableOpacity>

                        <Image source={require('../assets/decor/logo.png')} style={{width: 135, height: height * 0.11, resizeMode: 'contain', marginBottom: height * 0.05, marginTop: 20}} />
                        
                        <Text style={styles.text}>📍 Discover Berlin from a New </Text>
                        <Text style={styles.text}>Perspective!</Text>
                        <Text style={[styles.text, {marginBottom: 20}]}>Explore the city’s iconic locations—from vibrant entertainment hubs to peaceful green retreats.</Text>

                        <Text style={styles.text}>🔹 Choose locations – get brief info and easy navigation.</Text>
                        <Text style={styles.text}>🔹 Uncover more – expand the card for fascinating details.</Text>
                        <Text style={[styles.text, {marginBottom: 20}]}>🔹 Explore nearby – scenic parks and cozy squares are always close by.</Text>

                        <Text style={[styles.text, {marginBottom: height * 0.06}]}>✨ Start your journey! 🚶‍♂️🌿</Text>

                        <TouchableOpacity style={styles.btn} onPress={() => setCurrentIndex((prev) => prev + 1)}>
                            <Image source={require('../assets/icons/arrow.png')} style={{width: 34, height: 22, resizeMode: 'contain'}} />
                        </TouchableOpacity>

                    </View>
                )
            }

            {
                currentIndex === 1 && (
                    <ScrollView style={{ width: width }}>
                        {isInfo && (
                            <View style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                zIndex: 1,
                            }} />
                        )}
                        <View style={{height: height * 0.1}} />
                        {
                            locations.map((item, index) => (
                                <View key={index} style={{width: '90%', alignSelf: 'center'}}>
                                    <View style={{width: '100%', marginBottom: (isInfo && selectedItem === item) ? 0 : 20, zIndex: selectedItem === item ? 2 : 0}}>
                                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, zIndex: 10}}>
                                            <Text style={styles.title}>{item.name}</Text>
                                            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('LocationInfoScreen', { item: item })}>
                                                <Image source={require('../assets/icons/arrow.png')} style={{width: 34, height: 22, resizeMode: 'contain'}} />
                                            </TouchableOpacity>
                                        </View>
                                        <Image source={item.image} style={{width: '100%', height: 160, resizeMode: 'cover', borderRadius: 7}} />                                    
                                    </View>
                                    <TouchableOpacity style={[styles.btn, {height: 35, position: 'absolute', top: 203, alignSelf: 'center', zIndex: (isInfo && selectedItem === item) ? 3 : 0}]} onPress={() => handleInfo(item)}>
                                        <Image source={require('../assets/icons/more.png')} style={[{width: 34, height: 22, resizeMode: 'contain'}, (isInfo && selectedItem === item) && {transform: [{ rotate: '180deg' }]} ]} />
                                    </TouchableOpacity>
                                    {
                                        (isInfo && selectedItem === item) && (
                                            <View style={styles.infoContainer}>
                                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                                                    <Text style={styles.infoText}>📍 {item.address}</Text>
                                                    <TouchableOpacity onPress={() => copyAddress(item.address)}>
                                                        <Image source={require('../assets/icons/copy.png')} style={{width: 18, height: 20}} />
                                                    </TouchableOpacity>
                                                </View>
                                                <Text style={styles.infoText}>{item.spoiler}</Text>
                                            </View>
                                        )
                                    }
                                </View>
                            ))
                        }
                        <View style={{height: 120}} />
                    </ScrollView>
                )
            }
                    
        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
    },

    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
    },
  
    text: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
        textAlign: 'left',
        alignSelf: 'flex-start'
    },

    btn: {
        width: 78,
        height: 53,
        backgroundColor: '#ff515b',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },

    infoContainer: {
        width: '100%',
        marginTop: -4,
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 18,
        marginBottom: 20,
        backgroundColor: '#292929',
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        zIndex: 2
    },

    infoText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#fff',
    }
  
});

export default Locations;