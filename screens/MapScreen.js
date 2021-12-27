import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import Map from '../components/Map';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';

const MapScreen = () => {

    const Stack = createStackNavigator();
    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity 
                style={tw`absolute bg-gray-100 top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
                onPress={() => navigation.navigate('HomeScreen')}
            >
                <Icon name='home' />
            </TouchableOpacity>
            <View style={tw`h-2/5`}>
                <Map />
            </View>
            <View style={tw`h-3/5`}>
                <Stack.Navigator>
                    <Stack.Screen 
                        name='NavigateCard'
                        component={NavigateCard}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen 
                        name='RideOptionsCard'
                        component={RideOptionsCard}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>
            </View>
        </View>
    );
}

export default MapScreen;

const styles = StyleSheet.create({});
