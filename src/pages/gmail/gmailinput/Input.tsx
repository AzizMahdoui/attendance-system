import React, { useState } from 'react';
import '../gmail.css';

interface Props {
  state:[string,React.Dispatch<React.SetStateAction<string>>];
  labelDescription: string;
  typeInput: string;
  idInput: string;
  hasError:boolean;
}

const Input = ({ labelDescription, typeInput, idInput , ...props }: Props) => {
  const [inputValue, setInputValue] = props.state;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  let labelClass = '';
  if (inputValue && idInput === 'email') {
    labelClass = 'label-email-focused';
  } else if (inputValue && idInput === 'password') {
    labelClass = 'label-password-focused';
  }

  
  return (
    <div  className={props.hasError ? "input error" : "input"}>
      <label
        htmlFor={idInput}
        className={labelClass}
      >
        {labelDescription}
      </label>
      <input
        type={typeInput}
        placeholder=""
        id={idInput}
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Input;
