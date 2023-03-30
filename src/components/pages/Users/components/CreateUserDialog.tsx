import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import '@/components/pages/Users/components/CreateUserDialog.scss';
import InputField from '@/components/pages/Users/components/InputField';

export type CreateUserType = {
    name: string;
    phoneNumber: string;
    zipCode: string;
    gender: string;
};

type CreateUserDialogProps = {
    children?: React.ReactNode;
    onSubmit: (data: CreateUserType) => void;
    onClose: () => void;
};

const CreateUserDialog = (props: CreateUserDialogProps) => {
    const { onSubmit, onClose } = props;
    const [name, setName] = useState('');
    const [gender, setGender] = useState('male');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [disabled, setDisabled] = useState(false);
    const genderRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.removeProperty('overflow');
        };
    }, []);

    useEffect(() => {
        if (name === '' || zipCode === '') {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [name, zipCode]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({
            name: name,
            phoneNumber: phoneNumber,
            zipCode: zipCode,
            gender: gender,
        });
        onClose();
    };

    const handleChangeName = (event: React.FormEvent<HTMLInputElement>) => {
        setName((event.target as HTMLInputElement).value);
    };

    const handleChangeGender = (event: React.FormEvent<HTMLSelectElement>) => {
        setGender((event.target as HTMLSelectElement).value);
    };

    const handleChangePhoneNumber = (event: React.FormEvent<HTMLInputElement>) => {
        setPhoneNumber((event.target as HTMLInputElement).value);
    };

    const handleChangeZipCode = (event: React.FormEvent<HTMLInputElement>) => {
        setZipCode((event.target as HTMLInputElement).value);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div
            className="create-user-dialog"
            onClick={(event) => {
                event.stopPropagation();
            }}
        >
            <h1>사용자 추가</h1>
            <form onSubmit={handleSubmit}>
                <InputField
                    labelText="성명 *"
                    value={name}
                    onChange={handleChangeName}
                    error={'성명은 필수로 입력되어야 합니다.'}
                    focus={true}
                    required
                />
                <span className="input-field">
                    <label
                        onClick={() => {
                            genderRef?.current?.focus();
                        }}
                    >
                        성별
                    </label>
                    <select name="gender" onChange={handleChangeGender} value={gender}>
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                </span>
                <InputField labelText="전화번호" value={phoneNumber} onChange={handleChangePhoneNumber} />
                <InputField
                    labelText="우편번호 *"
                    value={zipCode}
                    onChange={handleChangeZipCode}
                    error={'우편번호는 필수로 입력되어야 합니다.'}
                    required
                />
                <span className="btn-field">
                    <button type="button" onClick={handleClose}>
                        취소
                    </button>
                    <button type="submit" className={`black-contain ${disabled && 'disabled'}`} disabled={disabled}>
                        추가
                    </button>
                </span>
            </form>
        </div>
    );
};

export default CreateUserDialog;
