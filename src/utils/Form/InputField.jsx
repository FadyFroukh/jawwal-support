import { InputText } from 'primereact/inputtext';

const InputField = ({type,field,placeholder,disabled,autoComplete})=>{
    return(
        <InputText
            type={type}
            {...field}
            required
            disabled={disabled}
            placeholder={placeholder}
            autoComplete={autoComplete}
        />
    );
};

export default InputField;