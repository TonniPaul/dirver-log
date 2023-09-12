import SvgIcon from '@/components/svg-icon/svg-icon';
import {
  ISidebarItemStyleProps,
  SidebarItemContainer,
} from './sidebar-item-card.styles';

interface ISidebarItemProps extends ISidebarItemStyleProps {
  icon: string;
  description: string;
}

const SidebarItemCard = ({ icon, description, active }: ISidebarItemProps) => {
  return (
    <SidebarItemContainer active={active}>
      <SvgIcon name={icon} />
      <p>{description}</p>
    </SidebarItemContainer>
  );
};
export default SidebarItemCard;
