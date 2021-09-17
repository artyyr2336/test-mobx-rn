import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {makeAutoObservable, runInAction} from 'mobx';
import {ICurrencyStore, IErrObj} from '../types';

class CurrencyStore {
  currency: ICurrencyStore[] = [];
  atValue: string = '';
  toValue: string = '';
  CurrencyHistory: any = [];
  CurrencyValue: number | string = '';
  errObj: IErrObj = {
    value: false,
    at: false,
    to: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  changeValues = () => {
    const at = this.toValue;
    const to = this.atValue;
    this.atValue = at;
    this.toValue = to;
  };

  clearHistory = async () => {
    await AsyncStorage.setItem('CurrencyHistory', '[]');

    runInAction(() => {
      this.CurrencyHistory = [];
    });
  };

  fetchCurrency() {
    fetch(
      'https://free.currconv.com/api/v7/currencies?apiKey=c612c1aaec699f95a2ec',
    )
      .then(res => res.json())
      .then(json => {
        const textsArray = Object.values(json.results).filter(el => el);

        runInAction(() => {
          this.currency = textsArray.map((i: any) => {
            return {
              label: i.currencyName,
              value: i.id,
            };
          });
        });
      });
  }

  changeAtValue(val: string) {
    runInAction(() => {
      this.atValue = val;
    });
  }

  changeToValue(val: string) {
    runInAction(() => {
      this.toValue = val;
    });
  }

  getCurrencyHistory = async () => {
    AsyncStorage.getItem('CurrencyHistory').then((res: string | null): void => {
      if (res) {
        runInAction(() => {
          this.CurrencyHistory = JSON.parse(res);
        });
      }
    });
  };

  convert = async (value: number) => {
    if (!value || !this.atValue || !this.toValue) {
      runInAction(() => {
        this.errObj = {
          value: !value,
          at: !this.atValue,
          to: !this.toValue,
        };
      });

      return;
    }

    runInAction(() => {
      this.errObj = {
        value: !value,
        at: !this.atValue,
        to: !this.toValue,
      };
    });

    axios
      .get(
        `https://free.currconv.com/api/v7/convert?apiKey=c612c1aaec699f95a2ec&q=${this.atValue}_${this.toValue}&compact=ultra`,
      )
      .then(async response => {
        this.CurrencyValue =
          response.data[`${this.atValue}_${this.toValue}`] * value;

        const newHistory = [response.data, ...this.CurrencyHistory];

        runInAction(() => {
          this.CurrencyHistory = newHistory;
        });

        const historyStringify = JSON.stringify(newHistory);
        await AsyncStorage.setItem('CurrencyHistory', historyStringify);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  get currencyArr() {
    return this.currency;
  }
}

export default new CurrencyStore();
