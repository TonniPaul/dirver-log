import getRemValue from '@/utils/getRemValue';
import styled from 'styled-components';

export interface IFormStyleProps {
  isAdmin?: boolean;
  hasBorderRadius?: boolean;
  hasTopPadding?: boolean;
}

export const FormContainer = styled.div<IFormStyleProps>`
  border: 2px solid rgb(var(--color-primary));
  padding: 2rem 3rem 4rem;
  max-width: ${getRemValue(500)};

  & > h1 {
    font-size: ${getRemValue(30)};
    font-weight: 600;
  }

  & > p {
    margin-top: ${getRemValue(10)};
    font-size: ${getRemValue(14)};
  }

  ${({ hasBorderRadius }) =>
    hasBorderRadius &&
    `
         border-radius: ${getRemValue(20)};
      `}

  ${({ isAdmin }) =>
    isAdmin &&
    `
         border-color: rgb(var(--color-secondary-b));
      `}

  & > button {
    background: none;
    color: rgb(var(--color-black));
    border: 1px solid rgb(var(--color-primary), 0.7);

    & > svg {
      fill: rgb(var(--color-primary));
    }

    ${({ isAdmin }) =>
      isAdmin &&
      `
         background: none;
         color: rgb(var(--color-white));
         border: 1px solid rgb(var(--color-white));

         & > svg {
         fill: currentColor;
      }
      `}
  }
`;

export const FormGroup = styled.div`
  display: flex;
  gap: ${getRemValue(24)};

  & > div {
    flex-basis: 50%;
  }
`;

export const FormStyles = styled.form<IFormStyleProps>`
  padding-top: 2rem;

  ${({ hasTopPadding }) =>
    hasTopPadding &&
    `
         padding-top: 4rem;
    `}

  & > button {
    width: 100%;
    padding: 1rem 2rem;
    border-radius: 25px;
  }

  & > div {
    & > button {
      font-weight: 700;
      font-size: ${getRemValue(11)};
      position: relative;
      top: -10px;
    }
  }
`;

export const FormInputWrapper = styled.div<IFormStyleProps>`
  & > label {
    font-size: ${getRemValue(20)};
    font-weight: 600;
    display: block;
    cursor: pointer;
  }

  & > input,
  & > textarea {
    border: 1px solid rgb(var(--color-primary), 0.7);
    outline: none;
    margin: 1rem 0;
    background-color: inherit;
    width: 100%;
    padding: 1rem 2rem;
    border-radius: 25px;
    resize: none;

    &::placeholder {
      font-family: inherit;
      font-weight: 600;
      opacity: 0.6;
    }

    ${({ isAdmin }) =>
      isAdmin &&
      `
               color: rgb(var(--color-white));
               border-color: rgb(var(--color-white));

                &::placeholder {
                  color: rgb(var(--color-white));
                  opacity: .6;
               }
            `}
  }
`;

export const FormButton = styled.button<IFormStyleProps>`
  width: 100%;
  padding: 1rem 2rem;
  border-radius: 25px;
  text-align: center;
  background-color: rgb(var(--color-primary));
  color: rgb(var(--color-white));
  margin-top: 1rem;
  font-weight: 600;
  font-size: ${getRemValue(20)};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${getRemValue(10)};

  ${({ isAdmin }) =>
    isAdmin &&
    `
         background-color: rgb(var(--color-secondary-b));
         color: rgb(var(--color-white));
      `}
`;

export const FormTextStyle = styled.p<IFormStyleProps>`
  font-weight: 600;
  display: flex;
  gap: ${getRemValue(10)};
  justify-content: center;
  padding: 1rem 0;

  & > a {
    color: rgb(var(--color-secondary-r));

    ${({ isAdmin }) =>
      isAdmin &&
      `
         color: rgb(var(--color-black));
      `}
  }
`;

export const FormErrorMessage = styled.p`
  background-color: rgb(var(--color-error), 0.05);
  color: rgb(var(--color-error));
  font-style: italic;
  border: 1px solid rgb(var(--color-error));
  padding: ${getRemValue(8)} 1rem;
  margin-bottom: 1rem;
  font-weight: 600;
  border-radius: 5px;
  width: max-content;
`;
