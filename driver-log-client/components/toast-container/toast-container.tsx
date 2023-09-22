import { ToastContainer as ToastWrapper } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContainer = () => {
  return (
    <>
      <ToastWrapper
        position="bottom-right"
        autoClose={5000}
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default ToastContainer;
