export interface MyFormValues {
  name: string;
  email: string;
}
export interface SignupFormValues {
  userName: string;
  email: string;
  mobile: string;
  companyName: string;
  bisunessAdd: string;
  country: string;
  city: string;
  password: string;
  confirmPassword: string;
}

export interface SigninFormValues {
  credential: string;
  password: string;
}
export interface CreateBankDetailsFormValues {
  bankName: string;
  accName: string;
  accNo: string;
  district: string;
  branch: string;
  routingNo: string;
}
export interface UpdateBankDetailsFormValues {
  bankName: string;
  accName: string;
  accNo: string;
  district: string;
  branch: string;
  routingNo: string;
}

export interface CreateLoneRequestValues {
  userId: string;
  reqDate: string;
  settlmentDate: string;
  amount: number;
  remarks: string;
  // refNo: string;
}
export interface UpdateLoneRequestValues {
  userId: string;
  reqDate: string;
  settlmentDate: string;
  amount: number;
  remarks: string;
  // refNo: string;
}

export interface CreateVisaApplyFormValues {
  userId: string;
  givenName: string;
  surName: string;
  gender: string;
  nationality: string;
  passportNo: string;
  passExpiryDate: string;
  dob: string;
  religion: string;
  applyForCountry: string;
}
export interface UpdateVisaApplyFormValues {
  userId: string;
  givenName: string;
  surName: string;
  gender: string;
  nationality: string;
  passportNo: string;
  passExpiryDate: string;
  dob: string;
  religion: string;
  applyForCountry: string;
}

export interface CreateDepositRequestFormValues {
  userId: string;
  dpType: string;
  date: string;
  trnId: string;
  amount: number;
  bankName: string;
}
export interface UpdateDepositRequestFormValues {
  userId: string;
  dpType: string;
  date: string;
  amount: number;
  bankName: string;
}
