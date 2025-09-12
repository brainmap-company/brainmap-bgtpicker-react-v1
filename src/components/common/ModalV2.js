import React, { useEffect } from 'react';

import styled, { useTheme } from 'styled-components';

import * as SVG from '@svg';

import Button from '@components/common/Button';
import TypoV2 from '@components/common/TypoV2';

//#region styled-components

const Overlay = styled.div`
    display: ${(props) => (props.modal ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #22222533;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    left: calc(50% - 156px);
    padding: 9px 14px 0;
    width: ${(props) => (props.width ? props.width : '524px')};
    height: ${(props) => (props.height ? props.height : '394px')};
    background-color: white;
    border: 1px solid ${(props) => props.theme.MAIN_THEME_COLOR};
    border-radius: 5px;
    box-shadow: 3px 3px 6px 0 rgba(0, 0, 0, 0.12);
    z-index: 1001;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 0;
    border-bottom: 1px solid #47464633;
`;

const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'center')};
    align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
    padding: 0 24px;
    width: 100%;
    height: calc(100% - 90px);
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const CancelImage = styled.div`
    cursor: pointer;
    svg {
        width: 21px;
    }
`;

//#endregion

const Modal = ({ modal, setModal, title, width, height, confirmFunc, confirmText, autoClose, setAutoClose, showCancelButton, showCloseButton, cancelText, alignItems, justifyContent, children }) => {
    const theme = useTheme();

    useEffect(() => {
        if (modal && autoClose) {
            setTimeout(() => {
                setModal(false);
            }, 3000);
            setAutoClose(false);
        }
    }, [modal, autoClose]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (modal && e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                setModal(false);
            }
        };

        if (modal) {
            document.addEventListener('keydown', handleKeyDown, true);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown, true);
        };
    }, [modal, setModal]);
    return (
        <Overlay modal={modal}>
            <ModalContainer width={width} height={height}>
                <ModalHeader>
                    <TypoV2 color={theme.MAIN_THEME_COLOR} fontSize="17px" fontWeight={600}>
                        {title ? title : '알림'}
                    </TypoV2>
                    {showCloseButton && (
                        <CancelImage onClick={() => setModal(false)}>
                            <SVG.IcnCancel />
                        </CancelImage>
                    )}
                </ModalHeader>
                <ModalBody alignItems={alignItems} justifyContent={justifyContent}>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <Button
                        justifyContent="center"
                        margin="0"
                        padding="0"
                        width="90px"
                        height="30px"
                        backgroundColor={theme.MAIN_THEME_COLOR}
                        borderRadius="5px"
                        onClick={() => {
                            setModal(false);
                            confirmFunc && confirmFunc();
                        }}
                    >
                        <TypoV2 color="#fff" fontSize="17px" fontWeight={600} cursor="pointer">
                            {confirmText ? confirmText : '확인'}
                        </TypoV2>
                    </Button>
                    {showCancelButton && (
                        <Button margin="0 0 0 29px" padding="0" justifyContent="center" width="90px" height="30px" borderRadius="5px" backgroundColor={theme.PALE_THEME_COLOR} onClick={() => setModal(false)}>
                            <TypoV2 color={theme.SUB_THEME_COLOR} fontSize="17px" fontWeight={600} cursor="pointer">
                                {cancelText ? cancelText : '취소'}
                            </TypoV2>
                        </Button>
                    )}
                </ModalFooter>
            </ModalContainer>
        </Overlay>
    );
};

export default Modal;
