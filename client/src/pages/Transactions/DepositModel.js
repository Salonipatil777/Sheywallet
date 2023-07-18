import { Form, Modal, message } from "antd";
import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { DepositFunds } from "../../apicalls/transactions";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/LoaderSlice";

const DepositModel = ({ showDeposit, setShowDeposit, reloadData }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const onToken = async (token) => {
    try {
      dispatch(ShowLoading())
      const response = await DepositFunds({
        token,
        amount: form.getFieldValue("amount"),
      });
      dispatch(HideLoading())
      if(response.success) {
        reloadData();
        setShowDeposit(false);
        message.success(response.message)
      }else{
        message.error(response.message)
      }
    } catch (error) {
      dispatch(HideLoading())
      message.error(error.message)
    }
  };
  return (
    <Modal
      title="Deposit"
      open={showDeposit}
      onCancel={() => setShowDeposit(false)}
      footer={null}
    >
      <div className="flex flex-col gap-1">
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please enter amount",
              },
            ]}
          >
            <input type="number" />
          </Form.Item>
          <div className="flex justify-end gap-1">
            <button className="primary-outlined-btn">Cancel</button>
            <StripeCheckout
              token={onToken}
              currency="USD"
              amount={form.getFieldValue("amount") * 100}
              shippingAddress
              stripeKey="pk_test_51ML3MOSHLn3UZM6ASjY2mJg7VGQzluT6wu10EhHF8HokwsqwJNtPA35lAjdpBu0vILXBlrC5j2J0bNZb87emwjYV00ETUsHH2c"
            >
              <button className="primary-contained-btn">Deposit</button>
            </StripeCheckout>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default DepositModel;
