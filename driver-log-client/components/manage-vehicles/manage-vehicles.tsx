'use client';
import {
  DriverDataTexts,
  DriversDetailContainer,
  ManageDriverContainer,
  ManageDriverHeaderContainer,
  NoDataTextContainer,
} from '@/components/manage-drivers/manage-drivers.styles';
import useGetAllVehicle, { CarData } from '@/server-store/queries/getVehicles';
import Button from '../button/button';
import CreateVehicleForm from '../cards/create-driver-and-vehicle-form/create-vehicle-form';
import Modal from '../modal/modal';
import SvgIcon from '../svg-icon/svg-icon';

const ManageVehicles = () => {
  const { data: vehicles } = useGetAllVehicle();

  const allVehicle: CarData[] | undefined = vehicles || [];

  return (
    <ManageDriverContainer>
      <ManageDriverHeaderContainer>
        <p>All Vehicles</p>
        <div>
          <>
            <Modal
              trigger={
                <Button>
                  Add Vehicle
                  <SvgIcon
                    name="plus"
                    fill="rgb(var(--color-primary))"
                    width={20}
                    height={20}
                  />
                </Button>
              }
              disableOutsideClick
            >
              {(close) => <CreateVehicleForm closeModal={close} />}
            </Modal>
          </>
        </div>
      </ManageDriverHeaderContainer>
      <DriversDetailContainer isHeader>
        <DriverDataTexts isSmall>S/N</DriverDataTexts>
        <DriverDataTexts isLarge>Brand</DriverDataTexts>
        <DriverDataTexts>Model</DriverDataTexts>
        <DriverDataTexts>License Number</DriverDataTexts>
        {/* <DriverDataTexts isMedium>Action</DriverDataTexts> */}
      </DriversDetailContainer>

      {allVehicle?.length > 0 ? (
        allVehicle.map(({ _id, make, model, licensePlate }, index) => (
          <DriversDetailContainer key={_id}>
            <DriverDataTexts isSmall>{index + 1}</DriverDataTexts>
            <DriverDataTexts isLarge>{make}</DriverDataTexts>
            <DriverDataTexts>{model}</DriverDataTexts>
            <DriverDataTexts>{licensePlate}</DriverDataTexts>
            {/* <DriverDataTexts as={'div'} isMedium>
                  <Popover icon="dotted-menu" bottom isSmaller>
                     <div>
                        <ActionButtons hasBorderBottom>View More</ActionButtons>
                        <ActionButtons>Delete</ActionButtons>
                     </div>
                  </Popover>
               </DriverDataTexts> */}
          </DriversDetailContainer>
        ))
      ) : (
        <NoDataTextContainer>
          No vehicle data available, Please Create one
        </NoDataTextContainer>
      )}
    </ManageDriverContainer>
  );
};

export default ManageVehicles;
