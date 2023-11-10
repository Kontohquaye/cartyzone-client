import { useContext } from "react";
import { PaystackButton } from "react-paystack";
import { toast } from "react-toastify";
import { Store } from "../services/Store";
import backendInstance from "../utils/api";

const stackId = import.meta.env.VITE_PCLIENT_ID;

const config = {
  reference: new Date().getTime().toString(),
  email: "user@example.com",
  amount: 20000,
  currency: "GHS",
  publicKey: `${stackId}`,
};

const PaystackButtons = ({ order, orderId }) => {
  const {
    state: { userInfo },
  } = useContext(Store);

  const handlePaystackSuccessAction = async (reference) => {
    const id = reference.trxref;
    const status = reference.status;
    const update_time = `${Date.now()}`;
    const email_address = order.shippingDetails.email;

    try {
      const data = await backendInstance.put(
        `api/orders/order/${orderId}/pay`,
        {
          id,
          status,
          update_time,
          email_address,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      // console.log(data);
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error("error occurred use another payment");

      // console.log(reference);
    }
  };

  const handlePaystackCloseAction = () => {
    // console.log("closed");
    toast.info("section closed");
  };

  const componentProps = {
    ...config,
    text: "Paystack",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };
  return (
    <div className="btn bg-green-600 text-white px-1 py-2 rounded-md text-center font-bold">
      <PaystackButton className="w-full h-full" {...componentProps} />
    </div>
  );
};

export default PaystackButtons;
