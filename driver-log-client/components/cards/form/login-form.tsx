import Link from 'next/link';
import { montserrat } from '@/helpers/fonts';
import routes from '@/lib/routes';
import {
  FormButton,
  FormContainer,
  FormErrorMessage,
  FormStyles,
  FormTextStyle,
  IFormStyleProps,
} from './form.styles';
import { isValidEmail } from '@/utils/validators';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import FormInputContainer from '@/components/form-input-container/form-input-container';
import useSignIn, { ISignInProps } from '@/server-store/mutations/useSignIn';
import useDriverSignIn from '@/server-store/mutations/useDriverSignIn';
import { types } from '@/pages/login';
import { useStore } from '@/client-store';
import BtnLoader from '@/components/btn-loaders/loader';
import { useState } from 'react';

export interface ILoginFormProp extends IFormStyleProps {
  type: string;
}

const defaultValues: ISignInProps = {
  email: '',
  password: '',
};
const LoginForm = ({ type, isAdmin }: ILoginFormProp) => {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { setAdmin, setDriver } = useStore();

  const isAdminType = type === types[1];

  const { mutate: adminSignIn, isLoading: loadingAdmin } = useSignIn();
  const { mutate: driverSignIn, isLoading: loadingDriver } = useDriverSignIn();

  const { handleSubmit, control, reset } = useForm<ISignInProps>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<ISignInProps> = async (data) => {
    const payload: ISignInProps = {
      email: data.email,
      password: data.password,
    };

    if (type === types[0]) {
      return driverSignIn(payload, {
        onSuccess: (data) => {
          setDriver({
            ...data,
            onTrip: false,
          });
          router.push(routes.dashboard());
          reset();
        },
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        onError: (err: any) => {
          setErrorMessage(err.response.data.message);
        },
      });
    }

    adminSignIn(payload, {
      onSuccess: (data) => {
        setAdmin(data);
        router.push(routes.dashboard());
        reset();
      },
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      onError: (data: any) => {
        setErrorMessage(data.response.data.message);
      },
    });
  };
  return (
    <FormContainer
      className={montserrat.className}
      hasBorderRadius
      isAdmin={isAdmin}
    >
      <h1>{type} Login</h1>
      <p>Please fill in the form below to log in</p>
      <FormStyles
        hasTopPadding
        isAdmin={isAdmin}
        onSubmit={handleSubmit(onSubmit)}
      >
        {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
        <FormInputContainer
          type="email"
          htmlFor="email"
          isAdmin={isAdmin}
          placeholder="Enter email address"
          label="Email"
          id="email"
          controller={{
            control,
            name: 'email',
            rules: {
              required: `Please enter your email address`,
              validate: {
                isValidEmail: (value) =>
                  isValidEmail(value) || 'Please enter a valid email address',
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
          isAdmin={isAdmin}
          controller={{
            control,
            name: 'password',
            rules: {
              required: 'Please enter your password',
            },
          }}
        />

        <FormButton
          isAdmin={isAdmin}
          disabled={isAdminType ? loadingAdmin : loadingDriver}
        >
          {loadingAdmin || loadingDriver ? <BtnLoader /> : 'Login'}
        </FormButton>
      </FormStyles>

      <FormTextStyle>
        <span>Don't have an account?</span>
        <Link href={routes.signUp()}>Sign up</Link>
      </FormTextStyle>
    </FormContainer>
  );
};

export default LoginForm;
