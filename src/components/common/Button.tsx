import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
    display?: string;
    justifyContent?: string;
    margin?: string;
    padding?: string;
    width?: string;
    height?: string;
    lineHeight?: string;
    fontSize?: string;
    fontWeight?: string;
    backgroundColor?: string;
    disabled?: boolean;
    borderRadius?: string;
    cursor?: string;
    border?: string;
    color?: string;
    onClick?: () => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    children?: React.ReactNode;
    tabIndex?: number;
    className?: string;
}

const ButtonContainer = styled.div<ButtonProps>`
    display: ${(props) => (props.display ? props.display : 'flex')};
    justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'center')};
    align-items: center;
    text-align: center;
    margin: ${(props) => (props.margin ? props.margin : '0 0 0 16px')};
    padding: ${(props) => (props.padding ? props.padding : '4px 15px')};
    width: ${(props) => (props.width ? props.width : 'fit-content')};
    height: ${(props) => (props.height ? props.height : 'auto')};
    color: ${(props) => (props.color ? props.color : props.theme.MAIN_THEME_COLOR)};
    font-size: ${(props) => (props.fontSize ? props.fontSize : '15px')};
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '600')};
    line-height: ${(props) => (props.lineHeight ? props.lineHeight : '19px')};
    word-break: keep-all;
    border: ${(props) => (props.border ? props.border : 'none')};
    background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : props.theme.PALE_THEME_COLOR)};
    border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '9px')};
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    cursor: ${(props) => (props.cursor ? 'pointer' : 'unset')};
    white-space: nowrap;
`;

const Button: React.FC<ButtonProps> = ({ 
    display, 
    justifyContent, 
    margin, 
    padding, 
    width, 
    height, 
    lineHeight, 
    fontSize, 
    fontWeight, 
    backgroundColor, 
    disabled, 
    borderRadius, 
    cursor, 
    border, 
    color, 
    onClick, 
    onKeyDown, 
    children, 
    tabIndex, 
    className 
}) => {
    return (
        <ButtonContainer
            display={display}
            justifyContent={justifyContent}
            margin={margin}
            padding={padding}
            width={width}
            height={height}
            lineHeight={lineHeight}
            fontSize={fontSize}
            fontWeight={fontWeight}
            backgroundColor={backgroundColor}
            borderRadius={borderRadius}
            cursor={cursor}
            border={border}
            color={color}
            onClick={onClick}
            onKeyDown={onKeyDown}
            className={className}
            tabIndex={tabIndex}
            disabled={disabled}
        >
            {children}
        </ButtonContainer>
    );
};

export default Button;







