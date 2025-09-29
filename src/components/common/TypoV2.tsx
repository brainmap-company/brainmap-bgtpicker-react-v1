import React from 'react';
import styled from 'styled-components';

interface TypoV2Props {
    display?: string;
    margin?: string;
    width?: string;
    height?: string;
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
    cursor?: string;
    onClick?: () => void;
    onDoubleClick?: () => void;
    className?: string;
    children?: React.ReactNode;
}

const StyledText = styled.span<TypoV2Props>`
    display: ${(props) => (props.display ? props.display : 'block')};
    align-items: center;
    margin: ${(props) => (props.margin ? props.margin : '0')};
    width: ${(props) => (props.width ? props.width : 'fit-content')};
    height: ${(props) => (props.height ? props.height : 'auto')};
    font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
    color: ${(props) => (props.color ? props.color : props.theme.TEXT_COLOR)};
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 400)};
    font-style: ${(props) => (props.fontStyle ? props.fontStyle : '')};
    line-height: ${(props) => (props.lineHeight ? props.lineHeight : 'normal')};
    letter-spacing: ${(props) => (props.letterSpacing ? props.letterSpacing : '0')};
    white-space: ${(props) => (props.whiteSpace ? props.whiteSpace : 'normal')};
    text-align: ${(props) => (props.textAlign ? props.textAlign : 'start')};
    word-break: ${(props) => (props.wordBreak ? props.wordBreak : 'break-all')};
    text-overflow: ${(props) => (props.textOverflow ? props.textOverflow : 'clip')};
    overflow: ${(props) => (props.overflow ? props.overflow : 'visible')};
    cursor: ${(props) => (props.cursor ? props.cursor : 'auto')};
`;

const TypoV2: React.FC<TypoV2Props> = ({ 
    display, 
    margin, 
    width, 
    height, 
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
    cursor, 
    onClick, 
    onDoubleClick, 
    className, 
    children 
}) => (
    <StyledText
        display={display}
        margin={margin}
        width={width}
        height={height}
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
        onDoubleClick={onDoubleClick}
        cursor={cursor}
        className={className}
    >
        {children}
    </StyledText>
);

export default TypoV2;







