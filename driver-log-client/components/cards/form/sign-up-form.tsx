import Link from 'next/link';
import { montserrat } from '@/helpers/fonts';
import {
  FormButton,
  FormContainer,
  FormStyles,
  FormTextStyle,
} from './form.styles';
import routes from '@/lib/routes';
import { SubmitHandler, useForm } from 'react-hook-form';
import useCreateProfile, {
  ICreateProfileProps,
} from '@/server-store/mutations/useCreateProfile';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import FormInputContainer from '@/components/form-input-container/form-input-container';
import { isValidEmail, isValidPhoneNumber } from '@/utils/validators';
import BtnLoader from '@/components/btn-loaders/loader';

export interface ISignUpFormSchema extends ICreateProfileProps {
  confirmPassword: string;
}

const defaultValues: ISignUpFormSchema = {
  name: '',
  email: '',
  contactNo: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const router = useRouter();

  const { handleSubmit, watch, reset, control } = useForm<ISignUpFormSchema>({
    defaultValues,
  });

  const watchedPassword = watch('password');

  const { mutate: createProfile, isLoading: isLoading } = useCreateProfile();

  const onSubmit: SubmitHandler<ISignUpFormSchema> = async (data) => {
    const payload: ICreateProfileProps = {
      email: data.email,
      name: data.name,
      contactNo: data.contactNo,
      password: data.password,
    };

    createProfile(payload, {
      onSuccess: async () => {
        reset();
        toast.success('Successful Sign Up');

        setTimeout(() => {
          router.replace(routes.login());
        }, 5000);
      },
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      onError: (data: any) => {
        toast.error(data.response.data.message);
      },
    });
  };

  return (
    <FormContainer className={montserrat.className}>
      <h1>Company Sign up</h1>
      <p>Please fill in the form below to sign up</p>

      <FormStyles onSubmit={handleSubmit(onSubmit)}>
        <FormInputContainer
          htmlFor="name"
          label="Company Name"
          placeholder="Enter your company name"
          id="name"
          controller={{
            control,
            name: 'name',
            rules: {
              required: 'Please enter your company name',
            },
          }}
        />

        <FormInputContainer
          type="email"
          htmlFor="email"
          placeholder="Enter company email"
          label="Email"
          id="email"
          controller={{
            control,
            name: 'email',
            rules: {
              required: `Please enter your company email address`,
              validate: {
                isValidEmail: (value) =>
                  isValidEmail(value) || 'Please enter a valid email address',
              },
            },
          }}
        />

        <FormInputContainer
          htmlFor="phone-number"
          label="Company Phone No."
          type="text"
          id="phone-number"
          placeholder={`Enter company email`}
          controller={{
            control,
            name: 'contactNo',
            rules: {
              required: 'Please enter your phone number',
              validate: {
                isValidPhoneNumber: (value) =>
                  isValidPhoneNumber(value) ||
                  'Invalid phone number (e.g +1234567890)',
              },
            },
          }}
        />

        <FormInputContainer
          htmlFor="password"
          label="Password"
          isPasswordType
          placeholder={`Enter your password`}
          id="password"
          controller={{
            control,
            name: 'password',
            rules: {
              required: 'Please enter a password',
              validate: {
                hasUppercase: (value) =>
                  /[A-Z]/.test(value) ||
                  'Password must contain at least one uppercase letter',
                hasLowercase: (value) =>
                  /[a-z]/.test(value) ||
                  'Password must contain at least one lowercase letter',
                hasSpecialChar: (value) =>
                  /[\W_]/.test(value) ||
                  'Password must contain at least one special character',
                hasNumber: (value) =>
                  /\d/.test(value) ||
                  'Password must contain at least one number',
                hasLength: (value) =>
                  value.length >= 6 ||
                  'Password must be at least 6 characters long',
              },
            },
          }}
        />

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
          }}
        />

        <FormButton disabled={isLoading}>
          {isLoading ? <BtnLoader /> : 'Sign up'}
        </FormButton>
      </FormStyles>

      <FormTextStyle>
        <span>Already have an account?</span>
        <Link href={routes.login()}>Log in</Link>
      </FormTextStyle>
    </FormContainer>
  );
};

export default SignUpForm;
