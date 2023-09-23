import {
  DashboardCardWrapper,
  IDashboardCardStyleProp,
} from './dashboard-card.styles';

interface IDashboardCardProps extends IDashboardCardStyleProp {
  title: string;
  count: number;
}
const DashboardCard = ({
  title,
  count,
  isCompleted,
  isUnassigned,
}: IDashboardCardProps) => {
  return (
    <DashboardCardWrapper isCompleted={isCompleted} isUnassigned={isUnassigned}>
      <p>
        {title} {title !== 'Drivers' && 'trips'}
      </p>
      <p>{count}</p>
    </DashboardCardWrapper>
  );
};

export default DashboardCard;
