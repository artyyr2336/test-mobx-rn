import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {AboutScreen} from '../screens/AboutScreen';
import {BottomTab} from './BottomTab';
import {Screens} from './const/Screens';

const Stack = createStackNavigator();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={Screens.APP}
          options={{headerShown: false}}
          component={BottomTab}
        />
        <Stack.Screen name={Screens.ABOUT} component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
