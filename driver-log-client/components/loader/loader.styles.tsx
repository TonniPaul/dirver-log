import styled, { keyframes } from 'styled-components';

export const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const LoaderContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--short-transition);
  overflow: hidden;
  position: fixed;
  background: rgb(var(--color-white));
  top: 0;
  z-index: 7;
  text-align: center;
  color: rgb(var(--color-primary));

  & > div > p {
    font-style: italic;
    padding: 1rem;
    color: initial;
  }
`;

export const InfiniteRotate = styled.div`
  animation: ${rotate} 4s linear infinite;
  width: max-content;
  background: var(--yellow);
  border-radius: 50%;
  padding: 0.5rem;
  margin: auto;
  & > svg {
    fill: currentColor;
  }
`;
