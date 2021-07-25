interface IParamsRegister {
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  gender: boolean;
  DOB: string;
}

interface IParamsLogin {
  email: string;
  password: string;
}
