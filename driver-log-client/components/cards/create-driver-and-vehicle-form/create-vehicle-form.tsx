import FormInputContainer from '@/components/form-input-container/form-input-container';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateDriverFormStyle } from './create-driver-form.styles';

import BtnLoader from '@/components/btn-loaders/loader';
import useCreateVehicle, {
  ICreateVehicleProps,
} from '@/server-store/mutations/useCreateVehicle';
import { toast } from 'react-toastify';
import { FormButton } from '../form/form.styles';

interface ICreateNewDriverProps {
  closeModal?: () => void;
}

const CreateVehicleForm = ({ closeModal }: ICreateNewDriverProps) => {
  const defaultValues: ICreateVehicleProps = {
    make: '',
    model: '',
    licensePlate: '',
  };
  const { handleSubmit, control } = useForm<ICreateVehicleProps>({
    defaultValues,
  });

  const { mutate: createDriver, isLoading: isLoading } = useCreateVehicle();

  const onSubmit: SubmitHandler<ICreateVehicleProps> = async (data) => {
    createDriver(data, {
      onSuccess: () => {
        toast.success('Vehicle data created successfully');
        closeModal?.();
      },
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      onError: (data: any) => {
        toast.error(data.message);
      },
    });
  };

  return (
    <CreateDriverFormStyle onSubmit={handleSubmit(onSubmit)}>
      <p>Create New Driver</p>

      <FormInputContainer
        htmlFor="brand"
        id="brand"
        type="text"
        label="Brand"
        placeholder="Enter your vehicle brand"
        controller={{
          control,
          name: 'make',
          rules: {
            required: 'Please enter vehicle brand',
          },
        }}
      />

      <FormInputContainer
        htmlFor="model"
        id="model"
        type="text"
        label="model"
        placeholder="Enter vehicle model"
        controller={{
          control,
          name: 'model',
          rules: {
            required: 'Please enter vehicle model',
          },
        }}
      />

      <FormInputContainer
        htmlFor="plate-number"
        id="plate-number"
        type="text"
        label="Plate-Number"
        placeholder="Enter vehicle plate number"
        controller={{
          control,
          name: 'licensePlate',
          rules: {
            required: 'Please enter vehicle plate number',
          },
        }}
      />

      <FormButton disabled={isLoading}>
        {isLoading ? <BtnLoader /> : 'Add Vehicle'}
      </FormButton>
    </CreateDriverFormStyle>
  );
};

export default CreateVehicleForm;
