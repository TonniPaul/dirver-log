import {
  IAuthCardStyleProps,
  AuthTextStyle,
  AuthButton,
  AuthCardContainer,
  AuthForm,
} from './auth-card.styles';
import Link from 'next/link';
import { montserrat } from '@/helpers/fonts';
import { useForm, SubmitHandler } from 'react-hook-form';
import { isValidEmail, isValidPhoneNumber } from '@/utils/validators';
import FormInputContainer from '@/components/form-input-container/form-input-container';
import useCreateProfile, {
  ICreateProfileProps,
} from '@/server-store/mutations/useCreateProfile';
import useSignIn, { ISignInProps } from '@/server-store/mutations/useSignIn';
import BtnLoader from '@/components/loader/loader';
import { useRouter } from 'next/router';
import useDriverSignIn, {
  IDriverSignInProps,
} from '@/server-store/mutations/useDriverSignIn';
import { types } from '@/pages/log-in';
import { useStore } from '@/store';
import routes from '../../../../lib/routes';

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

const SignUpCard = ({ isAdmin, type, isLoginPage }: IAuthCardProps) => {
  const pageType = !isLoginPage ? 'Sign up' : 'Log in';
  const router = useRouter();
  const { setAdmin, setDriver } = useStore();

  const defaultValues: IAuthFormProps = {
    companyName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  };

  const { handleSubmit, watch, reset, control } = useForm<IAuthFormProps>({
    defaultValues,
  });

  const { mutate: createProfile, isLoading: isLoadingCreateProfile } =
    useCreateProfile();
  const { mutate: adminSign, isLoading: isLoadingSignIn } = useSignIn();
  const { mutate: driverSignIn, isLoading: isLoadingDriverSignIn } =
    useDriverSignIn();

  const onSubmit: SubmitHandler<IAuthFormProps> = async (
    data: IAuthFormProps
  ) => {
    const payload: ICreateProfileProps = {
      email: data.email,
      companyName: data.companyName,
      companyContactNo: data.phoneNumber,
      password: data.password,
    };

    const signInPayload: ISignInProps = {
      email: data.email,
      password: data.password,
    };

    const driverSignInPayload: IDriverSignInProps = {
      email: data.email,
      password: data.password,
    };

    if (isLoginPage) {
      if (type === types[0]) {
        return driverSignIn(driverSignInPayload, {
          onSuccess: (data) => {
            setDriver(data);
            router.replace(routes.dashboard());
            reset();
          },
        });
      }
      return adminSign(signInPayload, {
        onSuccess: (data) => {
          setAdmin(data);
          router.replace(routes.dashboard());
          reset();
        },
      });
    }
    createProfile(payload, {
      onSuccess: async () => {
        router.replace('/log-in');
      },
    });
    reset();
  };

  const watchedPassword = watch('password');

  return (
    <AuthCardContainer
      isAdmin={isAdmin}
      isLoginPage={isLoginPage}
      className={montserrat.className}
    >
      <h1>{isLoginPage ? type + ' ' + pageType : 'Create an account'}</h1>
      <p>Please fill in the form below to {pageType.toLowerCase()}</p>

      <AuthForm isLoginPage={isLoginPage} onSubmit={handleSubmit(onSubmit)}>
        {!isLoginPage && (
          <FormInputContainer
            htmlFor="companyName"
            label="Company Name"
            placeholder="Enter your company name"
            controller={{
              control,
              name: 'companyName',
              rules: {
                required: 'Please enter your company name',
              },
            }}
          />
        )}

        <FormInputContainer
          type="email"
          htmlFor="email"
          isAdmin={isAdmin}
          placeholder="Enter company email"
          label="Email"
          controller={{
            control,
            name: 'email',
            rules: {
              required: `Please enter your ${
                !isLoginPage ? 'company' : ''
              } email address`,
              validate: {
                isValidEmail: (value) =>
                  isValidEmail(value) || 'Please enter a valid email address',
              },
            },
          }}
        />

        {!isLoginPage && (
          <FormInputContainer
            htmlFor="phoneNumber"
            label="Company Phone No."
            type="text"
            isAdmin={isAdmin}
            placeholder={`Enter ${!isLoginPage ? 'company' : 'your'} email`}
            controller={{
              control,
              name: 'phoneNumber',
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
        )}

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
              validate: !isLoginPage
                ? {
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
                  }
                : {},
            },
          }}
          isAdmin={isAdmin}
        />
        {/* {isLoginPage && (
          <ForgotPasswordButton
            onClick={(e) => {
              e.preventDefault();
              alert('calm down, I am not working yet');
            }}
          >
            Forgot password?
          </ForgotPasswordButton>
        )} */}

        {!isLoginPage && (
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
        )}

        <AuthButton
          isAdmin={isAdmin}
          disabled={
            isLoginPage
              ? type === types[0]
                ? isLoadingDriverSignIn
                : isLoadingSignIn
              : isLoadingCreateProfile
          }
        >
          {!isLoginPage ? (
            isLoadingCreateProfile ? (
              <BtnLoader />
            ) : (
              'Create account'
            )
          ) : isLoadingSignIn || isLoadingDriverSignIn ? (
            <BtnLoader />
          ) : (
            'Log in'
          )}
        </AuthButton>
      </AuthForm>

      <AuthTextStyle isAdmin={isAdmin}>
        <span>{isLoginPage ? "Don't" : 'Already'} have an account ?</span>
        <Link href={isLoginPage ? '/sign-up' : '/log-in'}>
          {isLoginPage ? 'Sign up' : 'Log in'}
        </Link>
      </AuthTextStyle>
    </AuthCardContainer>
  );
};

export default SignUpCard;
