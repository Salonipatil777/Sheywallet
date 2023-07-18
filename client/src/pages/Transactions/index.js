import React from "react";
import PageTitle from "../../components/PageTitle";
import { Table, message } from "antd";
import TransferFund from "./TransferFund";
import { useDispatch, useSelector } from "react-redux";
import { GetTransactionsOfUser } from "../../apicalls/transactions";
import { HideLoading, ShowLoading } from "../../redux/LoaderSlice";
import moment from "moment";
import DepositModel from "./DepositModel";

const Transactions = () => {
  const { user } = useSelector((state) => state.users);
  const [showTransferFund, setShowTransferFund] = React.useState(false);
  const [showDeposit, setShowDeposit] = React.useState(false);
  const [data = [], setData] = React.useState([]);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A");
      },
    },
    { title: "Tansaction ID", dataIndex: "_id" },
    { title: "Amount", dataIndex: "amount" },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) => {
        return record.sender === user._id
          ? "Debit"
          : "Credit" || record.receiver === user._id
          ? "Credit"
          : "Debit";
      },
    },
    {
      title: "Reference Account",
      dataIndex: "",
      render: (text, record) => {
        return record.sender === user._id || record.receiver === user._id ? (
          <span>{record.sender}</span>
        ) : (
          <span>{record.sender}</span>
        );
      },
    },
    { title: "Reference", dataIndex: "reference" },
    { title: "Status", dataIndex: "status" },
  ];
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetTransactionsOfUser();
      if (response.success) {
        setData(response.data);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Transactions" />
        <div className="flex gap-1">
          <button
            className="primary-outlined-btn"
            onClick={() => setShowDeposit(true)}
          >
            deposit
          </button>
          <button
            className="primary-contained-btn"
            onClick={() => setShowTransferFund(true)}
          >
            transfer
          </button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} className="mt-2" />
      {showTransferFund && (
        <TransferFund
          showTransferFund={showTransferFund}
          setShowTransferFund={setShowTransferFund}
          reloadData={getData}
        />
      )}
      {showDeposit && (
        <DepositModel
          showDeposit={showDeposit}
          setShowDeposit={setShowDeposit}
          reloadData={getData}
        />
      )}
    </div>
  );
};

export default Transactions;
