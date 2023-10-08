import { useEffect, useState } from 'react';
import { BookingFormContainer } from './booking-form.styles';

const BookingForm = () => {
  const [value, setValue] = useState('');
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const [addressList, setAddressList] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const getSourceList = async () => {
    if (value) {
      setLoading(true);
      try {
        const res = await fetch(`/api/search-address?q=${value}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const result = await res.json();
        setAddressList(result);
      } catch (error) {
        console.error('API Error:', error);
      } finally {
        setLoading(false);
      }
    } else {
      // Handle the case when the input is empty
      setAddressList([]);
    }
  };

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      addressList;
      loading;
      getSourceList();
    }, 1000);

    return () => clearTimeout(debounceFetch);
  }, [value]);

  return (
    <BookingFormContainer>
      <div>
        <label htmlFor="address">Where From?</label>
        <input
          type="text"
          name="address"
          id="where-from"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="street-address"
        />
      </div>

      <div>
        <label htmlFor="where-to">Where To?</label>
        <input type="text" name="where-to" id="where-to" />
      </div>

      {/* {loading && <p>Loading...</p>}
         {!loading && addressList.length > 0 && (
            <ul>
               {addressList.map((address) => (
                  <li key={address.id}>{address.name}</li>
               ))}
            </ul>
         )} */}
    </BookingFormContainer>
  );
};

export default BookingForm;
