import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import {Input} from '../../components/input';
import CurrencyStore from '../../store/CurrencyStore';
import {PICKER_STYLES} from '../../styles';
import {IConvertSubmit} from '../../types';

export const HomeScreen = observer(() => {
  // const navigation = useNavigation<NavigationStackProp>();
  const {control, handleSubmit} = useForm();

  const convert = (data: IConvertSubmit) => {
    CurrencyStore.convert(data.value);
  };

  console.log('CurrencyStore.CurrencyHistory', CurrencyStore.CurrencyHistory);

  const renderHistory = (data: any, index: number) => {
    if (!data) {
      return <Text>История пуста</Text>;
    }
    return (
      <Text key={index}>
        {`${Object.entries(data)[0][0]} - ${Object.entries(data)[0][1]}`}
      </Text>
    );
  };

  useEffect(() => {
    CurrencyStore.fetchCurrency();
    CurrencyStore.getCurrencyHistory();
  }, []);

  return (
    <ScrollView style={styles.layout}>
      <Input
        name="value"
        control={control}
        type="numeric"
        placeHolder="Число"
      />
      {CurrencyStore.errObj.value && (
        <Text style={styles.errText}>Необходимо ввести значение</Text>
      )}

      <RNPickerSelect
        placeholder={{
          label: 'Валюта',
          value: '',
        }}
        useNativeAndroidPickerStyle={false}
        onValueChange={e => CurrencyStore.changeAtValue(e)}
        items={CurrencyStore.currencyArr}
        style={PICKER_STYLES}
        value={CurrencyStore.atValue}
      />

      {CurrencyStore.errObj.at && (
        <Text style={styles.errText}>Необходимо выбрать значение</Text>
      )}

      <Pressable style={styles.btnStyle} onPress={CurrencyStore.changeValues}>
        <Text>Изменить</Text>
      </Pressable>

      <RNPickerSelect
        placeholder={{
          label: 'Валюта',
          value: '',
        }}
        useNativeAndroidPickerStyle={false}
        onValueChange={e => CurrencyStore.changeToValue(e)}
        items={CurrencyStore.currencyArr}
        style={PICKER_STYLES}
        value={CurrencyStore.toValue}
      />

      {CurrencyStore.errObj.to && (
        <Text style={styles.errText}>Необходимо выбрать значение</Text>
      )}

      <Pressable style={styles.btnStyle} onPress={handleSubmit(convert)}>
        <Text>Конвертировать</Text>
      </Pressable>

      <Pressable style={styles.btnStyle} onPress={CurrencyStore.clearHistory}>
        <Text>Очистить историю</Text>
      </Pressable>
      {CurrencyStore.CurrencyValue ? (
        <Text style={styles.result}>
          Результат :{CurrencyStore.CurrencyValue}
        </Text>
      ) : null}

      <View style={styles.line} />

      <View style={styles.history}>
        {CurrencyStore.CurrencyHistory
          ? CurrencyStore.CurrencyHistory.map(renderHistory)
          : null}
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  layout: {
    padding: 10,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: 'gray',
  },
  btnStyle: {
    borderRadius: 10,
    backgroundColor: 'orange',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },

  result: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  history: {
    marginTop: 15,
  },
  errText: {
    color: 'red',
    marginBottom: 10,
  },
});
