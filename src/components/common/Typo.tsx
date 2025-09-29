import React from 'react';
import styled, { css } from 'styled-components';

interface TypoProps {
    display?: string;
    margin?: string;
    width?: string;
    fontSize?: string;
    color?: string;
    fontWeight?: string | number;
    fontStyle?: string;
    lineHeight?: string | number;
    letterSpacing?: string;
    whiteSpace?: string;
    textAlign?: string;
    wordBreak?: string;
    textOverflow?: string;
    overflow?: string;
    underline?: boolean;
    cursor?: string;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
}

const StyledText = styled.span<TypoProps>`
    display: ${(props) => (props.display ? props.display : 'block')};
    margin: ${(props) => (props.margin ? props.margin : '0')};
    width: ${(props) => (props.width ? props.width : 'fit-content')};
    font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
    color: ${(props) => (props.color ? props.color : props.theme.MAIN_THEME_COLOR)};
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 400)};
    font-style: ${(props) => (props.fontStyle ? props.fontStyle : '')};
    line-height: ${(props) => (props.lineHeight ? props.lineHeight : '1.5')};
    letter-spacing: ${(props) => (props.letterSpacing ? props.letterSpacing : '0')};
    white-space: ${(props) => (props.whiteSpace ? props.whiteSpace : 'nowrap')};
    text-align: ${(props) => (props.textAlign ? props.textAlign : '')};
    word-break: ${(props) => (props.wordBreak ? props.wordBreak : '')};
    text-overflow: ${(props) => (props.textOverflow ? props.textOverflow : '')};
    overflow: ${(props) => (props.overflow ? props.overflow : '')};
    cursor: ${(props) => (props.cursor ? props.cursor : '')};
    ${(props) =>
        props.underline
            ? css`
                  &:after {
                      content: ' ';
                      display: block;
                      margin-top: 8px;
                      width: 100%;
                      border-bottom: 2px solid #78cad2;
                  }
              `
            : null}
`;

const Typo: React.FC<TypoProps> = ({
    display,
    margin,
    width,
    fontSize,
    color,
    fontWeight,
    fontStyle,
    lineHeight,
    letterSpacing,
    whiteSpace,
    textAlign,
    wordBreak,
    textOverflow,
    overflow,
    underline,
    cursor,
    onClick,
    className,
    children,
}) => (
    <StyledText
        display={display}
        margin={margin}
        width={width}
        fontSize={fontSize}
        color={color}
        fontWeight={fontWeight}
        fontStyle={fontStyle}
        lineHeight={lineHeight}
        letterSpacing={letterSpacing}
        whiteSpace={whiteSpace}
        textAlign={textAlign}
        wordBreak={wordBreak}
        textOverflow={textOverflow}
        overflow={overflow}
        onClick={onClick}
        underline={underline}
        cursor={cursor}
        className={className}
    >
        {children}
    </StyledText>
);

export default Typo;







