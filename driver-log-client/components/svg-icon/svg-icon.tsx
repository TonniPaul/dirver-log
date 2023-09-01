import { FC, SVGProps } from 'react';

interface ISvgProps extends SVGProps<SVGSVGElement> {
   name: string;
}

const SvgIcon: FC<ISvgProps> = ({ name, ...props }) => {
   return (
      <svg {...props}>
         <use xlinkHref={`/assets/sprite.svg#icon-${name}`} />
      </svg>
   );
};

export default SvgIcon;
