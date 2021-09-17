import React from 'react';
import {useController} from 'react-hook-form';
import {StyleSheet, TextInput} from 'react-native';

export const Input = ({control, name, type, placeHolder}) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name,
  });

  return (
    <TextInput
      style={styles.inputStyle}
      value={field.value}
      onChangeText={field.onChange}
      keyboardType={type}
      placeholder={placeHolder}
    />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'gray',
    borderStyle: 'solid',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
});
