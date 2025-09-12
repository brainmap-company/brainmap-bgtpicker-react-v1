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
    background-color: #78cad2;
    border-radius: ${(props) => (props.isModule ? '6px' : '12px')};
`;

const ButtonItem = styled.div`
    display: inline-block;
    vertical-align: top;
    margin: ${(props) => (props.bar ? 0 : '0 13px 0 0')};
    opacity: 0.6;
    cursor: pointer;
    &:first-of-type {
        opacity: 1;
    }
    &:last-of-type {
        margin-right: 0;
        &:after {
            content: none;
        }
    }
    color: #fff;
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

const TabButton = ({ className, display, margin, padding, width, items, bar, isModule, onButtonClick }) => {
    return (
        <ButtonWrapper
            className={className}
            display={display}
            width={width}
            margin={margin}
            padding={padding}
            count={items.length}
            isModule={isModule}
            onClick={onButtonClick}
        >
            {items &&
                items.map((item, idx) => (
                    <ButtonItem key={idx} bar={bar} isModule={isModule}>
                        {item}
                    </ButtonItem>
                ))}
        </ButtonWrapper>
    );
};

export default TabButton;
