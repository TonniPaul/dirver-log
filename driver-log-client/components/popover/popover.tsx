import { ReactNode } from 'react';
import {
  IPopoverStyleProps,
  PopoverArrow,
  PopoverContent,
  PopoverIcon,
} from './popover.styles';
import { Root, Trigger, Portal } from '@radix-ui/react-popover';

interface IPopover extends IPopoverStyleProps {
  icon: string;
  children: ReactNode;
}

const Popover = ({ icon, children, iconPrimary, paddingRight }: IPopover) => {
  return (
    <Root>
      <Trigger>
        <PopoverIcon
          name={icon}
          width={30}
          height={30}
          iconPrimary={iconPrimary}
        />
      </Trigger>
      <Portal>
        <PopoverContent side="top" paddingRight={paddingRight}>
          {children}
          <PopoverArrow iconPrimary={iconPrimary} />
        </PopoverContent>
      </Portal>
    </Root>
  );
};

export default Popover;
