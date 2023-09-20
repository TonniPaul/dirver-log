import {
  ReactNode,
  useState,
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
} from 'react';
import { Root } from '@radix-ui/react-dialog';
import {
  ModalClose,
  ModalContent,
  ModalOverlay,
  ModalPortal,
  ModalTrigger,
} from './modal.styles';
import SvgIcon from '../svg-icon/svg-icon';

interface IModalProps {
  trigger: ReactNode;
  children: ReactNode | ((close: () => void) => ReactNode);
  hideCloseButton?: boolean;
  onClose?: () => void;
  disableEscapeDown?: boolean;
  disableOutsideClick?: boolean;
}

export type ModalRefActions = {
  open: () => void;
  close: () => void;
};

const Modal = forwardRef<unknown, IModalProps>(
  (
    {
      trigger,
      children,
      hideCloseButton,
      onClose,
      disableEscapeDown,
      disableOutsideClick,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
      onClose?.();

      setIsOpen(false);
    };

    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
      },
      close: closeModal,
    }));
    return (
      <Root open={isOpen} onOpenChange={setIsOpen}>
        <ModalTrigger asChild>{trigger}</ModalTrigger>
        <ModalPortal>
          <ModalOverlay>
            <ModalContent
              ref={ref as ForwardedRef<HTMLDivElement>}
              onPointerDownOutside={(e) =>
                disableOutsideClick && e.preventDefault()
              }
              onEscapeKeyDown={(e) => disableEscapeDown && e.preventDefault()}
            >
              {!hideCloseButton && (
                <ModalClose>
                  <SvgIcon
                    fill="neutral5"
                    name="close"
                    width={20}
                    height={20}
                    onClick={closeModal}
                  />
                </ModalClose>
              )}
              {typeof children === 'function' ? children(closeModal) : children}
            </ModalContent>
          </ModalOverlay>
        </ModalPortal>
      </Root>
    );
  }
);

Modal.displayName = 'Modal';
export default Modal;
