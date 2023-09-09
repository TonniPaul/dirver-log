import { IAuthCardStyleProps, AuthTextStyle, AuthButton, AuthCardContainer, AuthForm } from "./auth-card.styles"
import Link from "next/link";
import { montserrat } from "@/helpers/fonts";
import { useForm, SubmitHandler } from 'react-hook-form';
import { isValidEmail, isValidPhoneNumber } from "@/utils/validators";
import FormInputContainer from "@/components/form-input-container/form-input-container";
import useCreateProfile, { ICreateProfileProps } from "@/server-store/mutations/useCreateProfile";
import useSignIn, { ISignInProps } from "@/server-store/mutations/useSignIn";
import BtnLoader from "@/components/loader/loader";

export interface IAuthCardProps extends IAuthCardStyleProps {
   type: string;
}
export interface IAuthFormProps {
   companyName: string;
   email: string;
   phoneNumber: string;
   password: string;
   confirmPassword: string;
}

const SignUpCard = ({ isAdmin, type, isLoginPage, }: IAuthCardProps) => {

   const pageType = !isLoginPage ? "Sign up" : "Log in"

   const defaultValues: IAuthFormProps = {
      companyName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
   };

   const {
      handleSubmit,
      watch,
      reset,
      control
   } = useForm<IAuthFormProps>({ defaultValues });

   const { mutate: createProfile, isLoading: isLoading } = useCreateProfile()
   const {mutate: adminSign, isLoading: loading} = useSignIn()

   const onSubmit: SubmitHandler<IAuthFormProps> = async (
      data: IAuthFormProps
   ) => {
      const payload: ICreateProfileProps = {
         companyEmail: data.email,
         companyName: data.companyName,
         companyContactNo: data.phoneNumber,
         password: data.password,
      };

      const signInPayload: ISignInProps = {
         companyEmail: data.email,
         password: data.password
      }

      if (isLoginPage) {
         return (
            adminSign(signInPayload), reset()
         )
      }
      createProfile(payload)
      reset()
   };


   const watchedPassword = watch('password');


   return (
      <AuthCardContainer isAdmin={isAdmin} isLoginPage={isLoginPage} className={montserrat.className}>
         <h1>{isLoginPage ? type : ''} {isLoginPage ? pageType : 'Create an account'}</h1>
         <p>Please fill in the form below to {pageType.toLowerCase()}</p>

         <AuthForm
            isAdmin={isAdmin}
            isLoginPage={isLoginPage}
            onSubmit={handleSubmit(onSubmit)}
         >
            {!isLoginPage &&
               <FormInputContainer
                  htmlFor="companyName"
                  label="Company Name"
                  placeholder="Enter your company name"
                  controller={{
                     control,
                     name: 'companyName',
                     rules: {
                        required: 'Please enter your company name',
                     }
                  }}
               />
            }

            <FormInputContainer
               type="email"
               htmlFor="email"
               placeholder="Enter company email"
               label="Email"
               controller={{
                  control, name: 'email', rules: {
                     required: `Please enter your ${!isLoginPage ? 'company' : ''} email address`,
                     validate: {
                        isValidEmail: (value) =>
                           isValidEmail(value) || 'Please enter a valid email address',
                     },
                  }
               }}
            />

            {!isLoginPage &&
               <FormInputContainer
                  htmlFor="phoneNumber"
                  label="Company Phone No."
                  type="text"
                  placeholder={`Enter ${!isLoginPage ? 'company' : 'your'} email`}
                  controller={{
                     control,
                     name: 'phoneNumber',
                     rules: {
                        required: 'Please enter your phone number',
                        validate: {
                           isValidPhoneNumber: (value) =>
                              isValidPhoneNumber(value) || 'Invalid phone number (e.g +1234567890)',
                        },
                     }
                  }}
               />
         }
            
            <FormInputContainer
               htmlFor="password"
               label="Password"
               isPasswordType
               placeholder={`Enter your password`}
               controller={{
                  control,
                  name: 'password',
                  rules: {
                     required: 'Please enter a password',
                     validate: {
                        hasUppercase: (value) =>
                           /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
                        hasLowercase: (value) =>
                           /[a-z]/.test(value) || 'Password must contain at least one lowercase letter',
                        hasSpecialChar: (value) =>
                           /[\W_]/.test(value) || 'Password must contain at least one special character',
                        hasNumber: (value) =>
                           /\d/.test(value) || 'Password must contain at least one number',
                        hasLength: (value) =>
                           value.length >= 6 || 'Password must be at least 6 characters long',
                     },
                  }
               }}
            />      
               {isLoginPage &&
                  <button
                     onClick={e => {
                        e.preventDefault();
                        alert("calm down, I am not working yet")
                     }}>
                     Forgot password?
                  </button>}

            {!isLoginPage &&                 

               <FormInputContainer
                  htmlFor="confirmPassword"
                  label="Confirm Password"
                  isPasswordType
                  placeholder={`Confirm password`}
                  controller={{
                     control,
                     name: 'confirmPassword',
                     rules: {
                        required: 'Please confirm your password',
                        validate: {
                           isValid: (value) =>
                              watchedPassword === value || 'Password mismatch',
                        },
                        },
                     }
                  }
               /> 

              
            }

            <AuthButton isAdmin={isAdmin}>
               {!isLoginPage ? isLoading ? <BtnLoader /> : "Create account"
                  :
                  loading ? < BtnLoader /> :  "Log in"}</AuthButton>
         </AuthForm>

         <AuthTextStyle isAdmin={isAdmin}>
            <span>
               {isLoginPage ? "Don't" : "Already"} have an account ?
            </span>
            <Link href={isLoginPage ? "/sign-up" : "/log-in"}>
               {isLoginPage ? "Sign up" : "Log in"}
            </Link>
         </AuthTextStyle>
      </AuthCardContainer>
   )
}

export default SignUpCard