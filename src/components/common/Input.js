import React, { useState } from 'react';

import styled from 'styled-components';

import CancelIcon from '@images/icn-cancel.png';
import SearchIcon from '@images/icn-search-gray.png';

//#region styled-components

const InputWrapper = styled.div`
    position: relative;
    width: ${(props) => (props.width ? props.width : '324px')};
    height: ${(props) => (props.height ? props.height : '27px')};
`;

const _Input = styled.input`
    padding: ${(props) => (props.padding ? props.padding : '0 30px')};
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: 1px solid #b6b6b6;
    ::-webkit-search-cancel-button {
        -webkit-appearance: none;
        cursor: pointer;
    }
    &:focus {
        outline: 0;
    }
`;

const InputSearchIcon = styled.img`
    position: absolute;
    top: ${(props) => (props.icnHeight ? `calc(50% - ${(props) => props.icnHeight / 2}px` : '7px')};
    left: 10px;
    width: 14px;
    height: 14px;
`;

const InputCancelIcon = styled.img`
    position: absolute;
    top: calc(50% - 13.45px);
    right: 2px;
    width: 26px;
    height: 26px;
`;

//#endregion

const Input = ({
    placeholder,
    setValue,
    value,
    alwaysShowCancelBtn,
    hideIcon,
    onKeyDown,
    autoFocus,
    padding,
    width,
    height,
    icnHeight,
    borderRadius,
    type,
    maxLength,
    className,
}) => {
    const onCancelBtnClick = () => {
        setValue('');
    };

    const handleChange = (e) => {
        const newValue = e.target.value;

        if (maxLength && newValue.length >= maxLength) {
            return;
        } else {
            setValue(newValue);
        }
    };

    return (
        <InputWrapper className={className} width={width} height={height}>
            {!hideIcon && <InputSearchIcon src={SearchIcon} icnHeight={icnHeight} />}
            <_Input
                type={type}
                placeholder={placeholder ? placeholder : ''}
                value={value}
                onChange={handleChange}
                onKeyDown={onKeyDown}
                autoFocus={autoFocus}
                borderRadius={borderRadius}
                padding={padding}
            />
            {(value || alwaysShowCancelBtn) && <InputCancelIcon src={CancelIcon} onClick={onCancelBtnClick} />}
        </InputWrapper>
    );
};

export default Input;
