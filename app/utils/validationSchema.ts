import * as Yup from "yup";

export const MyFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const SignUpFormSchema = Yup.object().shape({
  userName: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  mobile: Yup.string().required("Mobile is required"),
  companyName: Yup.string().required("Company Name is required"),
  bisunessAdd: Yup.string().required("Business address is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("city is required"),
});

export const SigninFormSchema = Yup.object().shape({
  credential: Yup.string().required("Email Or Phone is required"),
  password: Yup.string().required("Password is required"),
});

export const CreateBankDetailsSchema = Yup.object().shape({
  bankName: Yup.string().required("Bank Name is required"),
  accName: Yup.string().required("Acc Name is required"),
  accNo: Yup.string().required("Acc No is required"),
  district: Yup.string().required("District is required"),
  branch: Yup.string().required("Branch is required"),
  routingNo: Yup.string().required("Rouating number is required"),
});
export const UpdateBankDetailsSchema = Yup.object().shape({
  bankName: Yup.string().required("Bank Name is required"),
  accName: Yup.string().required("Acc Name is required"),
  accNo: Yup.string().required("Acc No is required"),
  district: Yup.string().required("District is required"),
  branch: Yup.string().required("Branch is required"),
  routingNo: Yup.string().required("Rouating number is required"),
});

export const CreateLoneRequestSchema = Yup.object().shape({
  userId: Yup.string(),
  reqDate: Yup.string().required("Date is required"),
  settlmentDate: Yup.string().required("Settlment Date is required"),
  amount: Yup.number().required("Amount is required"),
  remarks: Yup.string().required("Remark is required"),
  // refNo: Yup.string().required("Reg NO is required"),
});

export const UpdateLoneRequestSchema = Yup.object().shape({
  userId: Yup.string(),
  reqDate: Yup.string().required("Date is required"),
  settlmentDate: Yup.string().required("Settlment Date is required"),
  amount: Yup.number().required("Amount is required"),
  remarks: Yup.string().required("Remark is required"),
  // refNo: Yup.string().required("Reg NO is required"),
});

export const CreateVisaApplySchema = Yup.object().shape({
  userId: Yup.string(),
  givenName: Yup.string().required("Given Name is required"),
  surName: Yup.string(),
  gender: Yup.string().required("Gender No is required"),
  nationality: Yup.string().required("Nationality is required"),
  passportNo: Yup.string().required("Passport No is required"),
  passExpiryDate: Yup.string().required("Passport ExpiryDate is required"),
  dob: Yup.string().required("Date of Birth is required"),
  religion: Yup.string().required("Religion is required"),
  applyForCountry: Yup.string().required("Please select country"),
});
export const UpdateVisaApplySchema = Yup.object().shape({
  userId: Yup.string(),
  givenName: Yup.string().required("Given Name is required"),
  surName: Yup.string().required("Sur Name is required"),
  gender: Yup.string().required("Gender No is required"),
  nationality: Yup.string().required("Nationality is required"),
  passportNo: Yup.string().required("Passport No is required"),
  passExpiryDate: Yup.string().required("Passport ExpiryDate is required"),
  dob: Yup.string().required("Date of Birth is required"),
  religion: Yup.string().required("Religion is required"),
});

export const CreateDepositRequestSchema = Yup.object().shape({
  userId: Yup.string(),
  dpType: Yup.string().required("Deposite Mode is required"),
  date: Yup.string().required("Date is required"),
  trnId: Yup.string(),
  amount: Yup.number().required("Amount is required"),
  bankName: Yup.string(),
});

export const UpdateDepositRequestSchema = Yup.object().shape({
  userId: Yup.string(),
  dpType: Yup.string().required("Deposite Mode is required"),
  date: Yup.string().required("Date is required"),
  amount: Yup.number().required("Amount is required"),
  bankName: Yup.string().required("Bank Name is required"),
});
