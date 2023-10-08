import getRemValue from '@/utils/getRemValue';
import styled from 'styled-components';

export const CreateDriverFormStyle = styled.form`
  max-width: ${getRemValue(550)};
  overflow-y: auto;
  max-height: ${getRemValue(700)};

  & > p {
    font-weight: 700;
    margin-bottom: 2rem;
  }

  @media screen and (min-width: 62.5em) {
    width: 500px;
    max-height: ${getRemValue(500)};
  }
`;
