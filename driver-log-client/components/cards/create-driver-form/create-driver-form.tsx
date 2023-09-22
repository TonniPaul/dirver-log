import FormInputContainer from '@/components/form-input-container/form-input-container';
import { CreateDriverFormStyle } from './create-driver-form.styles';
import { SubmitHandler, useForm } from 'react-hook-form';
import useCreateDriver, {
  ICreateDriverProps,
} from '@/server-store/mutations/useCreateDriver';
import BtnLoader from '@/components/loader/loader';
import { FormButton } from '../form/form.styles';

const defaultValues: ICreateDriverProps = {
  firstName: '',
  lastName: '',
  licenseNumber: '',
  nationalId: '',
  contactNumber: '',
  email: '',
  homeAddress: '',
  licenseExpiryDate: '',
  password: '',
  password_confirmation: '',
  admin: '',
};

const CreateDriverForm = () => {
  const { handleSubmit, control } = useForm<ICreateDriverProps>({
    defaultValues,
  });

  const { mutate: createDriver, isLoading: isLoading } = useCreateDriver();

  const onSubmit: SubmitHandler<ICreateDriverProps> = async (data) => {
    createDriver(data, {
      onSuccess: (data) => {
        console.log(data);
      },
    });
  };

  return (
    <CreateDriverFormStyle onSubmit={handleSubmit(onSubmit)}>
      <p>Create New Driver</p>

      <FormInputContainer
        htmlFor="first-name"
        id="first-name"
        type="text"
        label="First Name"
        placeholder="Enter your first name"
        controller={{
          control,
          name: 'firstName',
          rules: {
            required: 'Please enter your first name',
          },
        }}
      />

      <FormInputContainer
        htmlFor="last-name"
        id="last-name"
        type="text"
        label="Last Name"
        placeholder="Enter your last name"
        controller={{
          control,
          name: 'lastName',
          rules: {
            required: 'Please enter your last name',
          },
        }}
      />

      <FormInputContainer
        htmlFor="email"
        id="first-name"
        type="email"
        label="Email"
        placeholder="Enter your email"
        controller={{
          control,
          name: 'email',
          rules: {
            required: 'Please enter your email',
          },
        }}
      />

      <FormInputContainer
        htmlFor="contact-number"
        id="contact number"
        type="tel"
        label="Phone Number"
        placeholder="Enter your Phone number"
        controller={{
          control,
          name: 'contactNumber',
          rules: {
            required: 'Please enter your Phone Number',
          },
        }}
      />

      <FormInputContainer
        htmlFor="licenseNumber"
        id="first-name"
        type="text"
        label="License Number"
        placeholder="Enter your License number"
        controller={{
          control,
          name: 'licenseNumber',
          rules: {
            required: 'Please enter your License number',
          },
        }}
      />

      <FormInputContainer
        htmlFor="national-id"
        id="national-id"
        label="National Id"
        placeholder="Enter your national Id "
        controller={{
          control,
          name: 'nationalId',
          rules: {
            required: 'Please enter your first name',
          },
        }}
      />

      <FormInputContainer
        htmlFor="homeAddress"
        id="first-name"
        label="Address"
        placeholder="Enter your address"
        controller={{
          control,
          name: 'homeAddress',
          rules: {
            required: 'Please enter your address',
          },
        }}
      />

      <FormInputContainer
        htmlFor="expiry-date"
        id="expiry-date"
        label="License expiry date"
        placeholder="Enter your license expiry date"
        controller={{
          control,
          name: 'licenseExpiryDate',
          rules: {
            required: 'Please enter your license expiry date',
          },
        }}
      />

      <FormInputContainer
        htmlFor="password"
        id="password"
        isPasswordType
        label="Password"
        placeholder="Enter your password"
        controller={{
          control,
          name: 'password',
          rules: {
            required: 'Please enter a password',
          },
        }}
      />

      <FormInputContainer
        htmlFor="confirm-password"
        id="confirm-password"
        label="Confirm Password"
        placeholder="Confirm password"
        isPasswordType
        controller={{
          control,
          name: 'confirmPassword',
          rules: {
            required: 'please confirm password',
          },
        }}
      />

      <FormButton>
        Create Driver
        {isLoading && <BtnLoader />}
      </FormButton>
    </CreateDriverFormStyle>
  );
};

export default CreateDriverForm;
