import React from 'react';

import styled, { css } from 'styled-components';

const ButtonWrapper = styled.div`
    display: ${(props) => (props.display ? props.display : 'block')};
    margin: ${(props) => (props.margin ? props.margin : 0)};
    padding: ${(props) => (props.padding ? props.padding : '0 15px')};
    width: ${(props) => (props.width ? props.width : props.count ? `${(props.count - 1) * 45.8 + 86.2}px` : '86.2px')};
    height: ${(props) => (props.isModule ? '21px' : '27px')};
    line-height: ${(props) => (props.isModule ? '21px' : '27px')};
    text-align: center;
    background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : props.theme.PALE_THEME_COLOR)};
    border-radius: 5px;
`;

const ButtonItem = styled.div`
    display: inline-block;
    vertical-align: top;
    margin: ${(props) => (props.bar ? 0 : '0 13px 0 0')};
    opacity: 0.6;
    cursor: pointer;
    ${({ active }) =>
        active &&
        `
        opacity: 1;
    `}
    &:last-of-type {
        margin-right: 0;
        &:after {
            content: none;
        }
    }
    color: ${(props) => (props.color ? props.color : props.theme.MAIN_THEME_COLOR)};
    font-weight: 600;
    ${(props) => props.isModule && 'font-size: 12px;'}
    ${(props) =>
        props.bar
            ? css`
                  &:after {
                      content: '|';
                      display: inline-block;
                      margin: 0 8.5px;
                      width: 5px;
                      height: 17px;
                      color: #fff;
                  }
              `
            : ''}
`;

const InfoActive = ({ className, display, margin, padding, width, backgroundColor, items, bar, isModule, itemsActive, color, onButtonClick }) => {
    return (
        <ButtonWrapper
            className={className}
            display={display}
            width={width}
            backgroundColor={backgroundColor}
            margin={margin}
            padding={padding}
            count={items.length}
            isModule={isModule}
            onClick={onButtonClick}
        >
            {items &&
                items.map((item, idx) => (
                    <ButtonItem key={idx} bar={bar} isModule={isModule} active={itemsActive ? itemsActive[idx] : false} color={color}>
                        {item}
                    </ButtonItem>
                ))}
        </ButtonWrapper>
    );
};

export default InfoActive;
