import React from 'react';

import styled from 'styled-components';

import IconCheck from '@images/icn-check-green.png';

const Input = styled.input`
    display: none;
    &:checked + label:after {
        content: ' ';
        display: inline-block;
        position: absolute;
        top: 4px;
        left: 4px;
        width: 12px;
        height: 10px;
        background-size: 12px 10px;
        background-image: url(${IconCheck});
    }
`;

const Label = styled.label`
    position: relative;
    margin-right: 18.5px;
    width: 21px;
    height: 21px;
    border-radius: 5.3px;
    border: solid 1px #bfc0c0;
    cursor: pointer;
    &:after {
        display: none;
    }
`;

const Checkbox = ({ id, name, value, checked, defaultValue, onChange, disabled }) => (
    <>
        <Input id={id} type="checkbox" name={name} value={value} onChange={onChange} checked={checked} defaultValue={defaultValue} disabled={disabled} />
        <Label htmlFor={id} disabled={disabled} />
    </>
);

export default Checkbox;
