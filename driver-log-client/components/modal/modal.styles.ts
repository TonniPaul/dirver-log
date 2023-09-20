import styled from 'styled-components';
import {
  Content,
  Overlay,
  Trigger,
  Close,
  Portal,
} from '@radix-ui/react-dialog';

export const ModalTrigger = styled(Trigger)`
  border: none;
  margin: auto;
`;

export const ModalPortal = styled(Portal)``;

export const ModalOverlay = styled(Overlay)`
  background-color: rgba(var(--color-black), 0.7);
  position: fixed;
  width: 100%;
  min-height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 27.8125em) {
    padding: 0;
  }
`;

export const ModalContent = styled(Content)`
  padding: 1.5rem;
  min-width: 80%;
  max-width: 93%;
  margin: auto;
  position: relative;
  background: rgb(var(--color-white));
  border-radius: 0.8rem;

  @media screen and (min-width: 56.25em) {
    min-width: 30%;
    padding: 2rem 3rem;
    max-width: 140rem;
  }
`;

export const ModalClose = styled(Close)`
  border: none;
  background: none;
  display: block;
  margin-left: auto;
  margin-bottom: 1rem;
`;
