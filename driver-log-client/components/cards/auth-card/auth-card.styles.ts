import getRemValue from '@/utils/getRemValue';
import styled from 'styled-components';

export interface IAuthCardStyleProps {
  isAdmin?: boolean;
  isLoginPage?: boolean;
}

export const AuthCardContainer = styled.div<IAuthCardStyleProps>`
  border: 1px solid rgb(var(--color-primary));
  padding: 2rem 3rem 4rem;
  max-width: ${getRemValue(500)};
  margin: 0 auto;

  & > h1 {
    font-size: ${getRemValue(20)};
    font-weight: 600;

    @media screen and (min-width: 56.25em) {
      font-size: ${getRemValue(30)};
    }
  }

  & > p {
    margin-top: ${getRemValue(10)};
    font-size: ${getRemValue(14)};
  }

  ${({ isAdmin }) =>
    isAdmin &&
    `
         border-color: rgb(var(--color-secondary-b));
      `}

  ${({ isLoginPage }) =>
    isLoginPage &&
    `
         border-radius: ${getRemValue(20)};
      `}
`;

export const AuthForm = styled.form<IAuthCardStyleProps>`
  padding-top: 2rem;

  ${({ isLoginPage }) =>
    isLoginPage &&
    `
         padding-top: 4rem;
      `}
`;

export const AuthButton = styled.button<IAuthCardStyleProps>`
  width: 100%;
  padding: 1rem 2rem;
  border-radius: 25px;
  text-align: center;
  background-color: rgb(var(--color-primary));
  color: rgb(var(--color-white));
  margin-top: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${getRemValue(10)};

  @media screen and (min-width: 56.25em) {
    font-size: ${getRemValue(20)};
  }

  ${({ isAdmin }) =>
    isAdmin &&
    `
         background-color: rgb(var(--color-secondary-b));
         color: rgb(var(--color-white));
      `}
`;

export const AuthTextStyle = styled.p<IAuthCardStyleProps>`
  font-weight: 600;
  display: flex;
  gap: ${getRemValue(10)};
  justify-content: center;
  padding: 1rem 0;

  & > a {
    color: rgb(var(--color-secondary-b));

    ${({ isAdmin }) =>
      isAdmin &&
      `
         color: rgb(var(--color-black));
      `}
  }
`;

export const ForgotPasswordButton = styled.button`
  color: inherit;
`;
