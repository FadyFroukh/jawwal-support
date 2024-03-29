import { InputText } from 'primereact/inputtext';

const InputField = ({type,field,placeholder,disabled,autoComplete,required})=>{
    return(
        <InputText
            type={type}
            {...field}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            autoComplete={autoComplete}
        />
    );
};

export default InputField;