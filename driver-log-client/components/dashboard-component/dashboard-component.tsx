import { useStore } from '@/client-store';
import DashboardCard from '../cards/dashboard-card/dashboard-card';
import {
  DashboardComponentWrapper,
  DashboardSectionWrapper,
} from './dashboard-component.styles';
import useGetAllDrivers from '@/server-store/queries/getDrivers';
import ManageVehicles from '../manage-vehicles/manage-vehicles';
import useGetAllVehicle from '@/server-store/queries/getVehicles';
import useGetTripLogs from '@/server-store/queries/getTripLogs';

const DashboardComponent = () => {
  const { admin } = useStore();
  const { data } = useGetAllDrivers();
  const { data: vehicles } = useGetAllVehicle();
  const { data: trips } = useGetTripLogs();
  const driverCount = data?.count || 0;
  const vehicleCount = vehicles?.length || 0;
  // const tripCount = trips?.count || 0

  const ongoingTrips =
    trips?.triplogs.filter((trip) => trip.status === 'ongoing') || [];
  const completedTrips =
    trips?.triplogs.filter((trip) => trip.status === 'completed') || [];

  if (!admin) {
    return <DashboardCard title="Test" count={4} />;
  }
  return (
    <>
      <DashboardComponentWrapper>
        <DashboardCard title="Ongoing" count={ongoingTrips.length} />
        <DashboardCard
          title="Completed"
          isCompleted
          count={completedTrips.length}
        />
        <DashboardCard title="Vehicles" isUnassigned count={vehicleCount} />
        <DashboardCard title="Drivers" count={driverCount} />
      </DashboardComponentWrapper>

      <DashboardSectionWrapper>
        <ManageVehicles />
      </DashboardSectionWrapper>
    </>
  );
};

export default DashboardComponent;
