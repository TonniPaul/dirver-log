import Button from '../button/button';
import CreateDriverForm from '../cards/create-driver-form/create-driver-form';
import Modal from '../modal/modal';
import SvgIcon from '../svg-icon/svg-icon';
import {
  DriversDetailContainer,
  ManageDriverContainer,
  ManageDriverHeaderContainer,
} from './manage-drivers.styles';

const ManageDrivers = () => {
  return (
    <ManageDriverContainer>
      <ManageDriverHeaderContainer>
        <p>All Drivers</p>
        <div>
          <>
            <Modal
              trigger={
                <Button>
                  Add New Driver
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
              <CreateDriverForm />
            </Modal>
          </>
        </div>
      </ManageDriverHeaderContainer>
      <DriversDetailContainer isHeader>
        {/* <DriverDataTexts>S/N</DriverDataTexts>
				<DriverDataTexts>Driver Name</DriverDataTexts>
				<DriverDataTexts>Driver Email</DriverDataTexts>
				<DriverDataTexts>License Number</DriverDataTexts>
				<DriverDataTexts>Contact Number</DriverDataTexts>
				<DriverDataTexts>Home Address</DriverDataTexts>
				<DriverDataTexts>Action</DriverDataTexts> */}
      </DriversDetailContainer>
    </ManageDriverContainer>
  );
};

export default ManageDrivers;
