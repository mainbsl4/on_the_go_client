import { Formik, Form, Field, ErrorMessage } from "formik";
import { MyFormSchema } from "../../utils/validationSchema";
import { MyFormValues } from "../../types/formTypes";
// import Input from "../ui/Input";

const MyForm: React.FC = () => {
  const initialValues: MyFormValues = { name: "", email: "" };

  const handleSubmit = (values: MyFormValues) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={MyFormSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, touched, errors }) => (
        <Form>
          <Field type="email" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
          {touched.name && errors.name && <div>{errors.name}</div>}
          <Field type="email" name="email" />
          {touched.email && errors.email && <div>{errors.email}</div>}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
