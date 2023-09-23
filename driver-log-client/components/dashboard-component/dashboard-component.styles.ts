import styled from 'styled-components';

export const DashboardComponentWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;

  & > div {
    flex-basis: 45%;
  }
`;
