import React, {useState, forwardRef} from 'react';
import '../assets/css/inputTagStyle.css';
import {FaEye, FaEyeSlash} from 'react-icons/fa';

const InputTag = forwardRef((props, ref) => {
  const {
    placeholder,
    type = 'text',
    name,
    value,
    onChange,
    textareaOn,
    loginOn,
    password,
    number,
    onlyText,
    ...rest
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
    }
  };

  const inputProps = {
    onFocus: handleFocus,
    onBlur: handleBlur,
    name: name,
    ref: ref,
    onChange: onChange,
    value: value,
    type: type,
    ...rest,
  };
  function onTogglePassword() {
    setShowPassword(!showPassword);
  }

  function handleNumberChange(event) {
    const newValue = event.target.value;
    // Allow only numbers, backspace, and minus sign (-)
    const allowedChars = /^[0-9\-]+$/;
    if (!allowedChars.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
    }
    
  }

  function handleTextChange(event) {
    const newValue = event.target.value;
    const allowedChars = /^[A-Za-z]*$/; // Allow only letters (uppercase and lowercase)
    if (!allowedChars.test(newValue)) {
      event.target.value = newValue.slice(0, -1); // Remove the invalid character
    }
  }

  const isMobile = window.innerWidth <= 512;

  return (
    <div className={`custom-input ${isFocused || value ? 'focused' : ''}`}>
      {textareaOn ? (
        <textarea
          type={`${type ? type : 'text'}`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          name={name}
          onChange={onChange}
          value={value}
          {...rest}
        />
      ) : (
        <input
          // style={
          //   !isMobile
          //     ? !loginOn?{textTransform: 'uppercase'}:{}
          //     : {textTransform: 'lowercase', padding: '5px'}
          // }
          type={
            password
              ? showPassword
                ? 'text'
                : 'password'
              : `${type ? type : 'text'}`
          }
          onTogglePassword={password ? onTogglePassword : ''}
          onFocus={handleFocus}
          onBlur={handleBlur}
          name={name}
          ref={ref}
          onChange={number ? handleNumberChange : onlyText? handleTextChange: onChange}
          value={value}
          {...rest}
        />
      )}

      <label className="placeholder" style={{background: 'white'}}>
        {placeholder}
      </label>

      <span className="password-eye" onClick={onTogglePassword}>
        <>
          {password ? (
            <>
              {showPassword ? (
                <i className="">
                  <FaEyeSlash />
                </i>
              ) : (
                <i className="">
                  <FaEye />
                </i> 
              )}
            </>
          ) : (
            <></>
          )}
        </>
      </span>
    </div>
  );
});

export default InputTag;
