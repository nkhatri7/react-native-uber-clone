import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const displayWelcomeMessage = () => {
        const now = new Date();
        if (now.getHours() < 12 && now.getHours() > 4) {
            return 'Good Morning, Neil';
        } else if (now.getHours() < 18) {
            return 'Good Afternoon, Neil';
        } else {
            return 'Good Evening, Neil';
        }
    }

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`p-5 text-xl font-semibold`}>{displayWelcomeMessage()}</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete 
                        styles={toInputBoxStyles}
                        placeholder='Where to?'
                        fetchDetails={true}
                        returnKeyType='search'
                        minLength={2}
                        onPress={(data, details = null) => {
                            dispatch(setDestination({
                                location: details.geometry.location,
                                description: data.description
                            }));

                            navigation.navigate('RideOptionsCard');
                        }}
                        enablePoweredByContainer={false}
                        query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: 'en'
                        }}
                        nearbyPlacesAPI='GooglePlacesSearch'
                        debounce={400}
                    />
                </View>
                <NavFavourites />
            </View>
            <View style={tw`flex flex-row justify-evenly bg-white pt-3 pb-7 mt-auto border-t border-gray-100`}>
                <TouchableOpacity 
                    style={tw`flex flex-row bg-black px-4 py-3 rounded-full`}
                    onPress={() => navigation.navigate('RideOptionsCard')}
                >
                    <Icon name='car' type='font-awesome' color='white' size={16} />
                    <Text style={tw`text-white text-center ml-2`}>Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`flex flex-row bg-gray-100 px-4 py-3 rounded-full ml-3`}>
                    <Icon name='fast-food-outline' type='ionicon' color='black' size={16} />
                    <Text style={tw`text-center ml-2`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 20,
        flex: 0
    },
    textInput: {
        backgroundColor: '#DDDDDF',
        borderRadius: 0,
        fontSize: 18
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0
    }
});
