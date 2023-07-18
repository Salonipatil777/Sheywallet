import React from "react";
import { Form, Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { TransferFunds, VerifyAccount } from "../../apicalls/transactions";
import { HideLoading, ShowLoading } from "../../redux/LoaderSlice";
import { ReloadUser } from "../../redux/userSlice";

const TransferFund = ({
  showTransferFund,
  setShowTransferFund,
  reloadData,
}) => {
  const { user } = useSelector((state) => state.users);
  const [isverified, setIsverified] = React.useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const verifyAccount = async () => {
    try {
      dispatch(ShowLoading());
      const response = await VerifyAccount({
        receiver: form.getFieldValue("receiver"),
      });
      dispatch(HideLoading());
      if (response.success) {
        setIsverified("true");
      } else {
        setIsverified("false");
      }
    } catch (error) {
      dispatch(HideLoading());
      setIsverified("false");
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const payload = { ...values, sender: user._id, status: "success" };

      const response = await TransferFunds(payload);
      if (response.success) {
        reloadData();
        setShowTransferFund(false);
        message.success(response.message);
        dispatch(ReloadUser(true))
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  return (
    <div>
      <Modal
        title="transfer Funds"
        open={showTransferFund}
        onCancel={() => setShowTransferFund(false)}
        onClose={() => setShowTransferFund(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <div className="flex gap-2 items-center">
            <Form.Item label="account number" name="receiver" className="w-100">
              <input type="text" />
            </Form.Item>
            <button
              className="primary-contained-btn mt-1"
              onClick={verifyAccount}
            >
              VERIFY
            </button>
          </div>
          {isverified === "true" && (
            <div className="success-bg">Account Verified SuccessFully</div>
          )}
          {isverified === "false" && (
            <div className="error-bg">Invalid Account</div>
          )}
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please enter amount",
              },
              {
                max: user.balance,
                message: "Insuffisiant amount",
              },
            ]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <textarea />
          </Form.Item>
          <div className="flex justify-end gap-1">
            <button
              className="primary-outlined-btn mt-1"
              onClick={() => setShowTransferFund(false)}
            >
              CANCEL
            </button>
            {isverified === "true" && (
              <button className="primary-contained-btn mt-1" type="submit">
                TRANSFER
              </button>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default TransferFund;
