import React, { memo, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import styled from 'styled-components';

import InputIcon from '@mui/icons-material/Input';

import useHeaderStore from '@src/store/header';

const ModalContainer = styled(ModalHeader)`
    border-top: ${(props) => (props.headercolor ? `7px solid ${props.headercolor}` : `7px solid ${props.theme.MAIN_THEME_COLOR}`)};
`;

const ModalComponent = memo((props) => {
    const { className, onClick, onCancelClick, title, modal, setModal, backdrop, children, headercolor, size, autoClose, setAutoClose, useToggle, fullscreen, buttonRef } = props;
    const { setModalCheck } = useHeaderStore();

    useEffect(() => {
        if (modal) {
            setModalCheck(true);
        } else {
            setModalCheck(false);
        }
        return () => {
            setModalCheck(false);
        };
    }, [modal]);

    useEffect(() => {
        if (modal && autoClose) {
            const timer = setTimeout(() => {
                setModal(false);
                setAutoClose(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [modal, autoClose, setModal, setAutoClose]);

    return (
        <Modal isOpen={modal} toggle={() => setModal((prev) => !prev)} className={className} backdrop={backdrop} onOpened={() => buttonRef?.current?.focus()} onClosed={onCancelClick} size={size} fullscreen={fullscreen}>
            <ModalContainer headercolor={headercolor}>{title}</ModalContainer>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
                {!!props.confirmText && (
                    <Button
                        color="primary"
                        onClick={
                            useToggle
                                ? () => {
                                      onClick();
                                  }
                                : () => {
                                      onClick();
                                      setModal((prev) => !prev);
                                  }
                        }
                        innerRef={buttonRef}
                        style={{ display: 'flex' }}
                    >
                        {props.confirmIconEnter && <InputIcon sx={{ width: 15, height: 15, marginRight: 1 }} />}
                        {props.confirmText}
                    </Button>
                )}
                {!!props.confirmButton ? (
                    props.confirmButton
                ) : (
                    <Button color="secondary" onClick={() => setModal((prev) => !prev)}>
                        {props.closeText ? props.closeText : '닫기'}
                    </Button>
                )}
            </ModalFooter>
        </Modal>
    );
});

export default ModalComponent;
