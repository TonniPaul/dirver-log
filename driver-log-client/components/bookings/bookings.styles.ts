import styled from 'styled-components';

export const BookingsContainer = styled.div`
  z-index: 0;
  @media screen and (max-width: 62.5em) {
    padding-bottom: 2rem;
  }
  @media screen and (min-width: 62.5em) {
    display: flex;
    flex-direction: row-reverse;
    gap: 1rem;
    & > *:last-child {
      flex-basis: 40%;
    }

    & > *:first-child {
      flex: 1;
      flex-basis: 1;
      width: 60%;
    }
  }
`;

export const BookingFormContainer = styled.div`
  @media screen and (max-width: 62.5em) {
    position: fixed;
  }
`;
