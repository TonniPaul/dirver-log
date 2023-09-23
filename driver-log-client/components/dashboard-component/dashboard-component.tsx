import { useStore } from '@/store';
import DashboardCard from '../cards/dashboard-card/dashboard-card';
import { DashboardComponentWrapper } from './dashboard-component.styles';

const DashboardComponent = () => {
  const { admin } = useStore();
  if (!admin) {
    return <DashboardCard title="Test" count={4} />;
  }
  return (
    <DashboardComponentWrapper>
      <DashboardCard title="Ongoing" count={4} />
      <DashboardCard title="Unassigned" isUnassigned count={3} />
      <DashboardCard title="Completed" isCompleted count={52} />
      <DashboardCard title="Drivers" count={12} />
    </DashboardComponentWrapper>
  );
};

export default DashboardComponent;
