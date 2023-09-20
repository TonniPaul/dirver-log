import styled from 'styled-components';

interface IManageDriverStyleProps {
  isHeader?: boolean;
}

export const ManageDriverContainer = styled.div`
  box-shadow: var(--box-shadow);
  background-color: rgb(var(--color-white));
  padding: 1rem;
`;

export const ManageDriverHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DriversDetailContainer = styled.div<IManageDriverStyleProps>`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  width: 100%;

  ${({ isHeader }) =>
    isHeader &&
    `
      background-color: rgb(var(--color-primary),0.07);
      color: rgb(var(--color-primary));
      font-weight: 700;
   `}
`;

export const DriverDataTexts = styled.p`
  padding: 1rem;
  flex: 1;
`;
