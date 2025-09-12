import React, { useEffect, useState } from 'react';

import styled, { css } from 'styled-components';

const BoxContainer = styled.div`
    display: ${(props) => (props.display ? props.display : 'block')};
    position: ${(props) => (props.isExpended ? 'absolute' : 'relative')};
    justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'space-between')};
    align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
    flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : 'row')};
    padding: ${(props) => (props.padding ? props.padding : '9px')};
    margin: ${(props) => (props.margin ? props.margin : '0 0 15px 0')};
    ${(props) =>
        props.top && props.isExpended
            ? css`
                  top: ${(props) => (props.top ? props.top : '0')};
              `
            : ''}
    ${(props) =>
        props.bottom && props.isExpended
            ? css`
                  bottom: ${(props) => (props.bottom ? props.bottom : '0')};
              `
            : ''}
    ${(props) =>
        props.left && props.isExpended
            ? css`
                  left: ${(props) => (props.left ? props.left : '0')};
              `
            : ''}
    ${(props) =>
        props.right && props.isExpended
            ? css`
                  right: ${(props) => (props.right ? props.right : '0')};
              `
            : ''}
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : 'auto')};
    min-height: ${(props) => (props.isExpended ? props.expendedMinHeight : 'auto')};
    border: ${(props) => (props.backgroundColor === 'none' ? '' : `1px solid ${props.theme.BORDER_GRAY_COLOR}`)};
    border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '10px')};
    background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : '#fff')};
    z-index: ${(props) => (props.isExpended ? 100 : 'auto')};
    vertical-align: top;
    opacity: ${(props) => (props.disabled ? 0.4 : 1)};
    pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
`;

const Box = ({
    className,
    display,
    justifyContent,
    alignItems,
    flexDirection,
    padding,
    margin,
    top,
    left,
    width,
    height,
    bottom,
    right,
    expendedWidth,
    expendedHeight,
    expendedMinHeight,
    backgroundColor,
    boxShadow,
    isExpended,
    disabled,
    onClick,
    children,
}) => {
    const [newHeight, setNewHeight] = useState(height);
    const [newWidth, setNewWidth] = useState(width);

    useEffect(() => {
        if (isExpended && expendedHeight) {
            setNewHeight(expendedHeight);
        } else {
            setNewHeight(height);
        }

        if (isExpended && expendedWidth) {
            setNewWidth(expendedWidth);
        } else {
            setNewWidth(width);
        }
    }, [isExpended, expendedHeight]);

    return (
        <BoxContainer
            className={className}
            display={display}
            justifyContent={justifyContent}
            alignItems={alignItems}
            flexDirection={flexDirection}
            padding={padding}
            margin={margin}
            top={top}
            left={left}
            bottom={bottom}
            right={right}
            width={newWidth}
            height={newHeight}
            expendedMinHeight={expendedMinHeight}
            backgroundColor={backgroundColor}
            boxShadow={boxShadow}
            isExpended={isExpended}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </BoxContainer>
    );
};

export default Box;
