import * as React from 'react';
import { useRef, useEffect } from 'react';
import '@/components/pages/Users/components/InputField.scss';

type InputFieldProps = {
    value: string;
    error?: string;
    labelText: string;
    focus?: boolean;
    required?: boolean;
    onChange: (event: React.FormEvent<HTMLInputElement>) => void;
};

const InputField = (props: InputFieldProps) => {
    const { value, error = '', labelText, required = false, onChange, focus = false } = props;
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current && focus) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    const handleChangeValue = (event: React.FormEvent<HTMLInputElement>) => {
        onChange(event);
    };

    return (
        <React.Fragment>
            <span className={`input-field ${value === '' && error && 'error'}`}>
                <label
                    onClick={() => {
                        inputRef?.current?.focus();
                    }}
                >
                    {labelText}
                </label>
                <input type="text" value={value} ref={inputRef} onChange={handleChangeValue} />
            </span>
            {value === '' && error && required && <span className="error-msgs">{error}</span>}
        </React.Fragment>
    );
};

export default InputField;
