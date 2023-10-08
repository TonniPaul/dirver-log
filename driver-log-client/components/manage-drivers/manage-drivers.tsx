'use client';
import Button from '../button/button';
import CreateDriverForm from '../cards/create-driver-and-vehicle-form/create-driver-form';
import Modal, { ModalRefActions } from '../modal/modal';
import SvgIcon from '../svg-icon/svg-icon';
import {
  DriverDataTexts,
  DriversDetailContainer,
  ManageDriverContainer,
  ManageDriverHeaderContainer,
  NoDataTextContainer,
} from './manage-drivers.styles';

import useGetAllDrivers, {
  IDriverData,
} from '@/server-store/queries/getDrivers';
import { useRef } from 'react';

const ManageDrivers = () => {
  const { data } = useGetAllDrivers();
  const createDriverModalRef = useRef<ModalRefActions>(null);

  const allDrivers: IDriverData[] = data?.drivers || [];

  return (
    <ManageDriverContainer>
      <ManageDriverHeaderContainer>
        <p>All Drivers</p>
        <div>
          <>
            <Modal
              ref={createDriverModalRef}
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
              {(close) => <CreateDriverForm closeModal={close} />}
            </Modal>
          </>
        </div>
      </ManageDriverHeaderContainer>
      <DriversDetailContainer isHeader>
        <DriverDataTexts isSmall>S/N</DriverDataTexts>
        <DriverDataTexts isLarge>Driver Name</DriverDataTexts>
        <DriverDataTexts>Driver Email</DriverDataTexts>
        <DriverDataTexts>License Number</DriverDataTexts>
        <DriverDataTexts>Contact Number</DriverDataTexts>
        {/* <DriverDataTexts isMedium>Action</DriverDataTexts> */}
      </DriversDetailContainer>
      <></>
      {allDrivers.length > 0 ? (
        allDrivers.map(
          (
            { _id, firstName, lastName, licenseNumber, contactNumber, email },
            index
          ) => (
            <DriversDetailContainer key={_id}>
              <DriverDataTexts isSmall>{index + 1}</DriverDataTexts>
              <DriverDataTexts
                isLarge
              >{`${firstName} ${lastName}`}</DriverDataTexts>
              <DriverDataTexts>{email}</DriverDataTexts>
              <DriverDataTexts>{licenseNumber}</DriverDataTexts>
              <DriverDataTexts>{contactNumber}</DriverDataTexts>
              {/* <DriverDataTexts as={'div'} isMedium>
            <Popover icon="dotted-menu" bottom isSmaller>
              <div>
                <ActionButtons hasBorderBottom>View More</ActionButtons>
                <ActionButtons>Delete</ActionButtons>
              </div>
            </Popover>
          </DriverDataTexts> */}
            </DriversDetailContainer>
          )
        )
      ) : (
        <NoDataTextContainer> No driver yet</NoDataTextContainer>
      )}
    </ManageDriverContainer>
  );
};

export default ManageDrivers;
