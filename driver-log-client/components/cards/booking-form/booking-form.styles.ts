import getRemValue from '@/utils/getRemValue';
import styled from 'styled-components';

export const BookingFormContainer = styled.form`
  @media screen and (max-width: 62.5em) {
    padding-bottom: 4rem;
    padding: 1rem;
    margin-top: 1rem;
    background-color: rgb(var(--color-white));
    width: 100%;
  }
  & > div {
    margin-bottom: 1rem;
    & > label {
      font-weight: 600;
    }

    & > input {
      width: 100%;
      border: 1px solid rgb(var(--color-black), 0.5);
      padding: ${getRemValue(10)} 1rem;
      background-color: inherit;
      border-radius: 7px;

      &:focus {
        outline: rgb(var(--color-primary)) solid 1px;
        border: none;
      }
    }
  }
`;
