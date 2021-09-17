import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Pressable, Text} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import {Screens} from '../../navigation/const/Screens';

export const AboutScreen = () => {
  const navigation = useNavigation<NavigationStackProp>();

  const navigateTo = () => {
    navigation.navigate(Screens.ABOUT);
  };
  return (
    <Pressable onPress={navigateTo}>
      <Text>AboutScreen</Text>
    </Pressable>
  );
};
