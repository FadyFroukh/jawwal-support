import { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";

export default function TextArea({placeholder,field,maxLength,minLength}) {
    const [value, setValue] = useState('');

    return (
       <>
        <div className="card flex justify-content-center">
            <InputTextarea 
                autoResize 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                rows={5} 
                cols={30} 
                placeholder={placeholder}
                {...field}
                maxLength={maxLength}
                minLength={20}
                required
            />            
        </div>
        <p>
            You must write at least <strong>{minLength}</strong> words and at most <strong>{maxLength}</strong> words
        </p>
       </>
    )
}