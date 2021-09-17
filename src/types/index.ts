export interface ICurrencyStore {
  label: string;
  value: string;
}

export interface IErrObj {
  value: boolean;
  at: boolean;
  to: boolean;
}

export interface IConvertSubmit {
  value: number;
}

export interface ICurrencyProp {
  currencySymbol?: string;
  id?: string;
  currencyName?: string | undefined;
}
