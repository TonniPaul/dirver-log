import useGetTripLogs from '@/server-store/queries/getTripLogs';
import { useState } from 'react';
import {
  DriverDataTexts,
  DriversDetailContainer,
  FilterButton,
  FilterFlexContainer,
  ManageDriverContainer,
  ManageDriverHeaderContainer,
  NoDataTextContainer,
} from '../manage-drivers/manage-drivers.styles';

const TripLogs = () => {
  const [showOngoingTrips, setShowOngoingTrips] = useState(false);
  const [showCompletedTrips, setShowCompletedTrips] = useState(false);
  const { data } = useGetTripLogs();

  const allTrips = data?.triplogs || [];

  const filteredTrips = showOngoingTrips
    ? data?.triplogs.filter((trip) => trip.status === 'ongoing') || []
    : showCompletedTrips
    ? data?.triplogs.filter((trip) => trip.status === 'completed') || []
    : data?.triplogs || [];

  return (
    <ManageDriverContainer>
      <ManageDriverHeaderContainer>
        <p>Trip Log</p>

        <FilterFlexContainer>
          <p>Filter</p>
          <FilterButton
            onClick={() => {
              setShowOngoingTrips(true);
              setShowCompletedTrips(false);
            }}
            active={showOngoingTrips}
          >
            Ongoing
          </FilterButton>
          <FilterButton
            onClick={() => {
              setShowCompletedTrips(true);
              setShowOngoingTrips(false);
            }}
            active={showCompletedTrips}
          >
            Completed
          </FilterButton>
          <FilterButton
            active={!showCompletedTrips && !showOngoingTrips}
            onClick={() => {
              setShowCompletedTrips(false);
              setShowOngoingTrips(false);
            }}
          >
            All
          </FilterButton>
        </FilterFlexContainer>
      </ManageDriverHeaderContainer>

      <DriversDetailContainer isHeader>
        <DriverDataTexts isSmall>S/N</DriverDataTexts>
        <DriverDataTexts isLarge>Driver</DriverDataTexts>
        <DriverDataTexts>Vehicle</DriverDataTexts>
        <DriverDataTexts>Purpose</DriverDataTexts>
        <DriverDataTexts>Start Address</DriverDataTexts>
        <DriverDataTexts>Destination</DriverDataTexts>
        <DriverDataTexts>Status</DriverDataTexts>
        {/* <DriverDataTexts isMedium>Action</DriverDataTexts> */}
      </DriversDetailContainer>

      {filteredTrips.length >= 1 ? (
        <>
          {allTrips.map(
            (
              {
                _id,
                driver,
                vehicle,
                purpose,
                originAddress,
                destinationAddress,
                status,
              },
              index
            ) => (
              <DriversDetailContainer key={_id}>
                <DriverDataTexts isSmall>{index + 1}</DriverDataTexts>
                <DriverDataTexts isLarge>
                  {`${driver?.firstName} ${driver?.lastName}`}
                </DriverDataTexts>
                <DriverDataTexts>{vehicle}</DriverDataTexts>
                <DriverDataTexts>{purpose}</DriverDataTexts>
                <DriverDataTexts>{originAddress}</DriverDataTexts>
                <DriverDataTexts>{destinationAddress}</DriverDataTexts>
                <DriverDataTexts capitalize>{status}</DriverDataTexts>
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
          )}
        </>
      ) : (
        <NoDataTextContainer>
          {' '}
          No trips match the selected filter criteria
        </NoDataTextContainer>
      )}
    </ManageDriverContainer>
  );
};

export default TripLogs;
