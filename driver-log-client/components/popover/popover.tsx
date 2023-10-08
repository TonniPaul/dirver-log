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
  bottom?: boolean;
}

const Popover = ({
  icon,
  children,
  bottom,
  iconPrimary,
  paddingRight,
  isSmaller,
}: IPopover) => {
  return (
    <Root>
      <Trigger>
        <PopoverIcon
          name={icon}
          isSmaller={isSmaller}
          iconPrimary={iconPrimary}
        />
      </Trigger>
      <Portal>
        <PopoverContent
          side={bottom ? 'bottom' : 'top'}
          align={'end'}
          paddingRight={paddingRight}
        >
          {children}
          <PopoverArrow iconPrimary={iconPrimary} />
        </PopoverContent>
      </Portal>
    </Root>
  );
};

export default Popover;
