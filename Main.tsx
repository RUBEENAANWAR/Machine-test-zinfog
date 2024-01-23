import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ScreenMap from './screens/Map';
import ScreenLocation from './screens/Location';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {MapView, TrackerHistoryIcon} from './src/components/svg';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            unmountOnBlur: true,
            tabBarShowLabel: false,
            tabBarStyle: {height: 50},
          }}>
          <Tab.Screen
            name="Map"
            component={ScreenMap}
            options={{
              tabBarIcon: ({color, size}) => (
                <MapView width={size} height={size} iconColor={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Location"
            component={ScreenLocation}
            options={{
              tabBarIcon: ({color, size}) => (
                <TrackerHistoryIcon
                  width={size}
                  height={size}
                  iconColor={color}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
