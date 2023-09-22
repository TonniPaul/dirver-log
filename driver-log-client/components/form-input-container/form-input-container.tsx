import { FC, InputHTMLAttributes, useEffect, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import {
  InputFlexContainer,
  InputFooterText,
  TogglePasswordBtn,
  InputFormField,
  Input,
} from './form-input-container.styles';
import SvgIcon from '../svg-icon/svg-icon';
import { IFormStyleProps } from '../cards/form/form.styles';

// eslint-disable-line @typescript-eslint/no-explicit-any
interface IFormInputProps
  extends IFormStyleProps,
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

  useEffect(() => {
    const hidePasswordBack = setInterval(() => {
      if (showPassword) {
        setShowPassword(false);
      }
    }, 500);

    return () => {
      clearInterval(hidePasswordBack);
    };
  }, [showPassword]);

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
