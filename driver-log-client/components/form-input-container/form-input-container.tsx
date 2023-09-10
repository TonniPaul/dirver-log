import { FC, InputHTMLAttributes, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import {
  InputFlexContainer,
  InputFooterText,
  TogglePasswordBtn,
  InputFormField,
  Input,
} from './form-input-container.styles';
import SvgIcon from '../svg-icon/svg-icon';
import { IAuthCardStyleProps } from '../cards/auth-card/auth-card.styles';

// eslint-disable-line @typescript-eslint/no-explicit-any
interface IFormInputProps
  extends IAuthCardStyleProps,
    InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
  label: string;
  isPasswordType?: boolean;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  controller: UseControllerProps<any>;
}

const FormInputContainer: FC<IFormInputProps> = ({
  htmlFor,
  label,
  isPasswordType,
  controller,
  isAdmin,
  ...props
}) => {
  const {
    field,
    fieldState: { error },
  } = useController(controller);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputFormField>
      <label htmlFor={htmlFor}>{label}</label>
      <>
        {isPasswordType ? (
          <InputFlexContainer>
            <Input
              {...props}
              {...{ ...field }}
              type={showPassword ? 'text' : 'password'}
              isAdmin={isAdmin}
            />
            <TogglePasswordBtn
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <SvgIcon name={!showPassword ? 'eye-open' : 'eye-close'} />
            </TogglePasswordBtn>
          </InputFlexContainer>
        ) : (
          <Input isAdmin={isAdmin} {...props} {...{ ...field }} />
        )}
      </>
      <>{error && <InputFooterText>{error.message}</InputFooterText>}</>
    </InputFormField>
  );
};

export default FormInputContainer;
