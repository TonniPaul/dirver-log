import { FC, InputHTMLAttributes, useState } from 'react';
import { useController, UseControllerProps } from "react-hook-form"
import { InputFlexContainer, InputFooterText, TogglePasswordBtn, InputFormField } from "./form-input-container.styles";
import SvgIcon from "../svg-icon/svg-icon";

interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
   htmlFor: string;
   label: string;
   isPasswordType?: boolean;
   controller: UseControllerProps<any>
}

const FormInputContainer: FC<IFormInputProps> = ({
   htmlFor,
   label,
   isPasswordType,
   controller,
   ...props
}) => {
   const { field, fieldState: {error} } = useController(controller)
   const [showPassword, setShowPassword] = useState(false);

   return (
      <InputFormField>
         <label htmlFor={htmlFor}>{label}</label>
         <>
            {isPasswordType ? (
               <InputFlexContainer>
                  <input
                     {...props}
                     {...{...field}}
                     type={showPassword ? 'text' : 'password'}
                  />
                  <TogglePasswordBtn
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                  >
                     <SvgIcon name={!showPassword ? 'eye-open' : 'eye-close'} />
                  </TogglePasswordBtn>
               </InputFlexContainer>
            ) : (
               <input {...props} {...{...field}}  />
            )}
         </>
         <>
            {error && 
               <InputFooterText>{error.message}</InputFooterText>
            }
         </>
      </InputFormField>
   );
}

export default FormInputContainer;
