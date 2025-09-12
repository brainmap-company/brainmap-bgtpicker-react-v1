import React from 'react';

import styled from 'styled-components';

const ButtonContainer = styled.div`
    display: ${(props) => (props.display ? props.display : 'flex')};
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: ${(props) => (props.margin ? props.margin : '0')};
    padding: ${(props) => (props.padding ? props.padding : '6px 10px')};
    width: ${(props) => (props.width ? props.width : '80px')};
    height: ${(props) => (props.height ? props.height : '30px')};
    color: ${(props) => (props.color ? props.color : props.theme.TEXT_LIGHT_COLOR)};
    font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
    font-weight: 500;
    line-height: 19px;
    word-break: keep-all;
    background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : props.theme.SUB_THEME_COLOR)};
    border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '5px')};
    cursor: ${(props) => (props.cursor ? props.cursor : 'pointer')};
    opacity: ${(props) => (props.disabled ? 0.6 : 1)};
    white-space: nowrap;
    & > * {
        cursor: pointer;
    }
`;

const DarkButton = ({
    display,
    margin,
    padding,
    width,
    height,
    color,
    fontSize,
    backgroundColor,
    borderRadius,
    cursor,
    disabled,
    onClick,
    children,
    className,
}) => {
    return (
        <ButtonContainer
            display={display}
            margin={margin}
            padding={padding}
            width={width}
            height={height}
            color={color}
            fontSize={fontSize}
            backgroundColor={backgroundColor}
            borderRadius={borderRadius}
            cursor={cursor}
            disabled={disabled}
            onClick={onClick}
            className={className}
        >
            {children}
        </ButtonContainer>
    );
};

export default DarkButton;
