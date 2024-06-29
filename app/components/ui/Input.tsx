import { FieldHookConfig, useField } from 'formik';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
}

const Input: React.FC<InputProps> = ({ label, type = 'text', ...props }) => {
    const [field, meta] = useField(props.name);
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input type={type} {...field} {...props} />
            {meta.touched && meta.error ? <div>{meta.error}</div> : null}
        </div>
    );
};

export default Input;