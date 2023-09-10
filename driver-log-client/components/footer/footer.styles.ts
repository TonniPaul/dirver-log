import styled from 'styled-components';

export const FooterContainer = styled.footer`
  margin-top: 3rem;
  background-color: rgb(var(--color-secondary-b));
  color: rgb(var(--color-white));

  & > div {
    padding: var(--padding-sm);

    & > p {
      padding-top: 1rem;
      margin-top: 1rem;
      border-top: 1px solid rgb(var(--color-white));
    }

    @media screen and (min-width: 56.25em) {
      padding: 2rem;
    }
  }
`;
