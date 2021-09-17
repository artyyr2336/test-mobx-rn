import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Icon} from '../icons/icon';
import {AboutScreen} from '../screens/AboutScreen';
import {HomeScreen} from '../screens/Tab/HomeScreen';
import {Screens} from './const/Screens';

export const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName={Screens.TAB}>
      <Tab.Screen
        name={Screens.HOME}
        component={HomeScreen}
        options={{
          // tabBarLabel: 'Задачи',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Icon name="home" color={focused ? 'red' : 'gray'} />
          ),
        }}
      />

      <Tab.Screen
        name={Screens.ABOUT}
        component={AboutScreen}
        options={{
          // tabBarLabel: 'Задачи',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Icon name="about" color={focused ? 'red' : 'gray'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
