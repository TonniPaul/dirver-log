import BookingForm from '../cards/booking-form/booking-form';
import Maps, { IMapsProp } from '../maps/map';
import { BookingsContainer } from './bookings.styles';

interface IBookingsProp extends IMapsProp {}
const Bookings = ({ lng, lat }: IBookingsProp) => {
  return (
    <BookingsContainer>
      <Maps lat={lat} lng={lng} />
      <BookingForm />
    </BookingsContainer>
  );
};

export default Bookings;
