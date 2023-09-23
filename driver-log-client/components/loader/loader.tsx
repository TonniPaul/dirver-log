import SvgIcon from '../svg-icon/svg-icon';
import { InfiniteRotate, LoaderContainer } from './loader.styles';

const Loader = () => {
  return (
    <LoaderContainer>
      <div>
        <InfiniteRotate>
          <SvgIcon name="driver" />
        </InfiniteRotate>
        <h1>Driver Log</h1>
        <p>
          Efficiently Track and Manage Your Driver Logs with Driver Log -
          Simplify Compliance, Maximize Efficiency!
        </p>
      </div>
    </LoaderContainer>
  );
};

export default Loader;
