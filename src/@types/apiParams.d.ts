interface IParamsRegister {
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  gender: boolean;
  DOB: IParamsDate;
}

interface IParamsLogin {
  email: string;
  password: string;
}

interface IParamsDate {
  day: number;
  month: number;
  year: number;
}
