import React from 'react';

import styled, { css } from 'styled-components';

import PropTypes from 'prop-types';

const StyledText = styled.span`
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

const Typo = ({
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

Typo.propTypes = {
    display: PropTypes.string,
    margin: PropTypes.string,
    width: PropTypes.string,
    fontSize: PropTypes.string,
    color: PropTypes.string,
    fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fontStyle: PropTypes.string,
    lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    letterSpacing: PropTypes.string,
    whiteSpace: PropTypes.string,
    textAlign: PropTypes.string,
    wordBreak: PropTypes.string,
    textOverflow: PropTypes.string,
    overflow: PropTypes.string,
    onClick: PropTypes.func,
    underline: PropTypes.bool,
    cursor: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

Typo.defaultProps = {};

export default Typo;
