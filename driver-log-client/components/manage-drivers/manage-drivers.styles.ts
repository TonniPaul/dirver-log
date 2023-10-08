import getRemValue from '@/utils/getRemValue';
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

  & > p {
    font-weight: 700;
    font-size: ${getRemValue(17)};
  }
`;

export const FilterFlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${getRemValue(10)};
`;

export const FilterButton = styled.button<{ active?: boolean }>`
  border: 1px solid rgb(var(--color-primary));
  padding: 5px 1rem;
  border-radius: 5px;

  ${({ active }) =>
    active &&
    `
    background-color: rgb(var(--color-primary));
    color: rgb(var(--color-white));
    `}
`;

export const DriversDetailContainer = styled.div<IManageDriverStyleProps>`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  display: inline-flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 0 1rem;

  ${({ isHeader }) =>
    isHeader &&
    `
      background-color: rgb(var(--color-primary),0.07);
      color: rgb(var(--color-primary));
      font-weight: 600;
   `}
`;

export const NoDataTextContainer = styled.p`
  padding: 1rem;
  text-align: center;
  width: 100%;
  font-weight: 600;
  background-color: rgb(var(--color-black), 0.03);
  margin-top: 1rem;
`;

export const DriverDataTexts = styled.p<{
  isLarge?: boolean;
  isSmall?: boolean;
  isMedium?: boolean;
  capitalize?: boolean;
}>`
  padding: ${getRemValue(10)} 0;
  text-align: left;
  flex-basis: ${getRemValue(200)};
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ isSmall }) =>
    isSmall &&
    `
    flex-basis: ${getRemValue(40)};
    width: ${getRemValue(220)};
    `}

  ${({ capitalize }) =>
    capitalize &&
    `
    text-transform: capitalize;
    `}

${({ isMedium }) =>
    isMedium &&
    `
    flex-basis: ${getRemValue(55)};
    display: flex;
    
    & > button {
      width: max-content;
      margin-left: auto;
    }
    
`}
  
  ${({ isLarge }) =>
    isLarge &&
    `
  flex-basis: ${getRemValue(220)};
`}
`;

export const ActionButtons = styled.button<{ hasBorderBottom?: boolean }>`
  display: block;
  width: 100%;
  padding: ${getRemValue(10)};
  font-size: ${getRemValue(10)};

  ${({ hasBorderBottom }) =>
    hasBorderBottom &&
    `
  border-bottom: 1px solid rgb(var(--color-black), 0.3);
`}
`;
