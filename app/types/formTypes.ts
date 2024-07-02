export interface MyFormValues {
  name: string;
  email: string;
}
export interface SignupFormValues {
  userName: string;
  email: string;
  password: string;
  mobile: string;
  companyName: string;
  bisunessAdd: string;
  country: string;
  city: string;
}

export interface SigninFormValues {
  credential: string;
  password: string;
}
export interface CreateBankDetailsFormValues {
  bankName: string;
  accName: string;
  accNo: string;
  branch: string;
}
export interface UpdateBankDetailsFormValues {
  bankName: string;
  accName: string;
  accNo: string;
  branch: string;
}
