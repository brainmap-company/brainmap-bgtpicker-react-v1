import React, { useState } from 'react';

import styled, { useTheme } from 'styled-components';

import * as SVG from '@svg';

import TypoV2 from './TypoV2';


const DropdownContainer = styled.div`
    position: relative;
    width: ${(props) => (props.width ? props.width : 'fit-content')};
    height: ${(props) => (props.height ? props.height : '30px')};
`;

const DropdownWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 10px 7px 14px;
    width: 100%;
    height: 100%;
    border: ${(props) => (props.isOpen ? `1px solid ${props.theme.OLD_THEME}` : `1px solid ${props.theme.BORDER_GRAY_COLOR}`)};
    border-radius: 5px;
    cursor: pointer;
`;

const DropdownMenu = styled.div`
    display: ${(props) => (props.open ? 'block' : 'none')};
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    padding: 5px;
    width: 100%;
    max-height: 200px;
    background-color: #fff;
    border: ${(props) => `1px solid ${props.theme.BORDER_GRAY_COLOR}`};
    border-radius: 5px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden auto;
    z-index: 120;
    span {
        padding-left: 14px;
        width: 100%;
        height: 30px;
        font-size: 14px;
        line-height: 30px;
        cursor: normal;
        &:hover {
            font-weight: 600;
            background-color: ${(props) => props.theme.DROPDOWN_HOVER_COLOR};
            border-radius: 4px;
        }
    }
`;

const SVGWrapper = styled.div`
    transform: rotate(${(props) => (props.isOpen ? '180deg' : '0deg')});
    transition: transform 0.3s;
`;


const Dropdown = ({ currentDropdownItem, setCurrentDropdownItem, items, width, height, placeholder = '선택' }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    return (
        <DropdownContainer width={width} height={height}>
            <DropdownWrapper onClick={() => setOpen(!open)} isOpen={open}>
                <TypoV2 fontSize="14px" fontWeight={600} color={!currentDropdownItem && '#bcbcbd'}>
                    {currentDropdownItem ? currentDropdownItem : placeholder}
                </TypoV2>
                <SVGWrapper isOpen={open}>
                    <SVG.IcnDropdownCircle width={20} circleColor="none" arrowColor={theme.DROPDOWN_ARROW_COLOR} />
                </SVGWrapper>
            </DropdownWrapper>
            <DropdownMenu open={open}>
                {items?.length > 0 &&
                    items.map((i, idx) => (
                        <TypoV2
                            key={idx}
                            onClick={() => {
                                setCurrentDropdownItem(i);
                                setOpen(false);
                            }}
                        >
                            {i}
                        </TypoV2>
                    ))}
            </DropdownMenu>
        </DropdownContainer>
    );
};

export default Dropdown;
