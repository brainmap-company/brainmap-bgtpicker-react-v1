declare module 'file-saver' {
  export function saveAs(data: Blob | File, filename?: string, disableAutoBOM?: boolean): void;
}

declare module 'reactstrap' {
  import { Component, ReactNode } from 'react';
  
  export interface ModalProps {
    isOpen: boolean;
    toggle?: () => void;
    className?: string;
    backdrop?: boolean | 'static';
    onOpened?: () => void;
    onClosed?: () => void;
    size?: string;
    fullscreen?: boolean | string;
    children?: ReactNode;
  }
  
  export interface ModalBodyProps {
    children?: ReactNode;
  }
  
  export interface ModalFooterProps {
    children?: ReactNode;
  }
  
  export interface ModalHeaderProps {
    children?: ReactNode;
  }
  
  export interface ButtonProps {
    color?: string;
    onClick?: () => void;
    innerRef?: React.RefObject<HTMLButtonElement>;
    style?: React.CSSProperties;
    children?: ReactNode;
  }
  
  export class Modal extends Component<ModalProps> {}
  export class ModalBody extends Component<ModalBodyProps> {}
  export class ModalFooter extends Component<ModalFooterProps> {}
  export class ModalHeader extends Component<ModalHeaderProps> {}
  export class Button extends Component<ButtonProps> {}
}







