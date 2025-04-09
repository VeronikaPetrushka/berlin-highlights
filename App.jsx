import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MusicProvider } from './src/constants/music';

import WelcomeScreen from './src/screens/WelcomeScreen';
import AnimationScreen from './src/screens/AnimationScreen';
import LocationsScreen from './src/screens/LocationsScreen';
import LocationInfoScreen from './src/screens/LocationInfoScreen';
import PlaceInfoScreen from './src/screens/PlaceInfoScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import FactsScreen from './src/screens/FactsScreen';
import FactCategoriesScreen from './src/screens/FactCategoriesScreen';
import FactLocationsScreen from './src/screens/FactLocationsScreen';
import FactLocationInfoScreen from './src/screens/FactLocationInfoScreen';
import RandomFactScreen from './src/screens/RandomFactScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import MiniGameScreen from './src/screens/MiniGameScreen';

enableScreens();

const Stack = createStackNavigator();

const App = () => {

  return (
      <MusicProvider>
            <NavigationContainer>
                  <Stack.Navigator initialRouteName={"AnimationScreen" }>    
                        <Stack.Screen 
                              name="AnimationScreen" 
                              component={AnimationScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="WelcomeScreen" 
                              component={WelcomeScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="LocationsScreen" 
                              component={LocationsScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="LocationInfoScreen" 
                              component={LocationInfoScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="PlaceInfoScreen" 
                              component={PlaceInfoScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="FavoriteScreen" 
                              component={FavoriteScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="FactsScreen" 
                              component={FactsScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="FactCategoriesScreen" 
                              component={FactCategoriesScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="FactLocationsScreen" 
                              component={FactLocationsScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="FactLocationInfoScreen" 
                              component={FactLocationInfoScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="RandomFactScreen" 
                              component={RandomFactScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="SettingsScreen" 
                              component={SettingsScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="MiniGameScreen" 
                              component={MiniGameScreen} 
                              options={{ headerShown: false }} 
                        />
                  </Stack.Navigator>
            </NavigationContainer>
      </MusicProvider>
    );
};

export default App;
