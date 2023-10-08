import getRemValue from '@/utils/getRemValue';
import styled, { css } from 'styled-components';

const inputStyles = css`
  width: 100%;
  border: 1px solid rgb(var(--color-black), 0.5);
  padding: ${getRemValue(10)} 1rem;
  background-color: inherit;
  border-radius: 7px;

  &:focus {
    outline: rgb(var(--color-primary)) solid 1px;
    border: none;
  }
`;

export const PlaceInput = styled.input`
  ${inputStyles}
`;

export const TextArea = styled.textarea`
  ${inputStyles}
  resize: vertical;
  min-height: ${getRemValue(100)};
`;

export const SelectInput = styled.select`
  ${inputStyles}
  position: relative;

  & > option {
    width: 100%;
    overflow: hidden;
    padding: 1rem;

    &:hover {
      background-color: rgb(var(--color-primary), 0.2);
    }
  }
`;

export const SuggestionBox = styled.ul`
  list-style: none;
  padding: ${getRemValue(10)} 0;
  position: absolute;
  background-color: rgb(var(--color-white));
  width: 100%;
  left: 0;
  top: ${getRemValue(73)};

  & > li {
    padding: ${getRemValue(5)} ${getRemValue(10)};
    cursor: pointer;
    border-bottom: 1px solid rgb(var(--color-primary), 0.5);

    &:hover,
    &:focus {
      background-color: rgb(var(--color-primary), 0.5);
    }
  }
`;
