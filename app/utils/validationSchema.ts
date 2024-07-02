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
  branch: Yup.string().required("Branch is required"),
});
