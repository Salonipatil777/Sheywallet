// import React from "react";
// import { Table, Tabs, message } from "antd";
// import PageTitle from "../../components/PageTitle";
// import NewRequestModal from "./newRequestModel";
// import { getAllRequestsByUser } from "../../apicalls/request";
// import { HideLoading, ShowLoading } from "../../redux/LoaderSlice";
// import { useDispatch, useSelector } from "react-redux";
// import moment from "moment";

// const { TabPane } = Tabs;

// const Requests = () => {
//   const [data, setData] = React.useState([]);
//   const [showNewRequest, setShowNewRequest] = React.useState(false);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.users);
// const columns = [
//   {
//     title: "Request ID",
//     dataIndex: "_id",
//     key: "id",
//   },
//   {
//     title: "Sender",
//     dataIndex: "sender",
//     render(user) {
//       return user._id;
//     },
//   },
//   {
//     title: "Receiver",
//     dataIndex: "receiver",
//     render(user) {
//       return user._id;
//     },
//   },
//   {
//     title: "Amount",
//     dataIndex: "amount",
//   },
//   {
//     title: "Date",
//     dataIndex: "date",
//     render: (text, record) => {
//       return moment(record.creatAt).format("DD-MM-YYYY hh:mm:ss A");
//     },
//   },
//   {
//     title: "Status",
//     dataIndex: "status",
//   },
// ];
//   const getData = async () => {
//     try {
//       dispatch(ShowLoading());
//       const response = await getAllRequestsByUser();
//       if (response.success) {
//         const sendData = response.data.filter(
//           (item) => item.sender === user._id
//         );
//         const receiveData = response.data.filter(
//           (item) => item.receiver === user._id
//         );
//         setData({
//           sent: sendData,
//           received: receiveData,
//         });
//       }
//       dispatch(HideLoading());
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };
//   React.useEffect(() => {
//     getData();
//   }, []);
//   return (
//     <div>
// <div className="flex justify-between">
//   <PageTitle title="Request" />
//   <button
//     className="primary-outlined-btn"
//     onClick={() => setShowNewRequest(true)}
//   >
//     Request Funds
//   </button>
// </div>
// <Tabs defaultActiveKey="1">
//   <TabPane tab="Sent" key="1">
//     <Table columns={columns} dataSource={data.sent} />
//   </TabPane>
//   <TabPane tab="Received" key="2">
//     <Table columns={columns} dataSource={data.received} />
//   </TabPane>
// </Tabs>
//       {showNewRequest && (
//         <NewRequestModal
//           showNewRequest={showNewRequest}
//           setShowNewRequest={setShowNewRequest}
//         />
//       )}
//     </div>
//   );
// };

// export default Requests;

import React from "react";
import PageTitle from "../../components/PageTitle";
import { Table, Tabs, message } from "antd";
import NewRequestModal from "./newRequestModel";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/LoaderSlice";
import moment from "moment";
import {
  getAllRequestsByUser,
  updateRequestStatus,
} from "../../apicalls/request";
import TabPane from "antd/es/tabs/TabPane";
import { ReloadUser } from "../../redux/userSlice";

const Requests = () => {
  const [showNewRequest, setShowNewRequest] = React.useState(false);
  const [data = [], setData] = React.useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllRequestsByUser();
      if (response.success) {
        setData(response.data);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const updateStatus = async (record, status) => {
    try {
      if (status === "accepted" && record.amount > user.balance) {
        message.error("Insufficient Funds");
        return;
      } else {
        dispatch(ShowLoading());
        const response = await updateRequestStatus({
          ...record,
          status,
        });
        dispatch(HideLoading());
        if (response.success) {
          message.success(response.message);
          getData();
          dispatch(ReloadUser(true));
        } else {
          message.error(response.message);
        }
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A");
      },
    },
    {
      title: "Request ID",
      dataIndex: "_id",
      key: "id",
    },
    // {
    //   title: "Sender",
    //   dataIndex: "sender",
    // },
    {
      title: "Receiver",
      dataIndex: "receiver",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "description",
      dataIndex: "description",
    },

    { title: "Status", dataIndex: "status" },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        if (record.status === "pending" && record.receiver === user._id) {
          return (
            <div className="flex gap-1">
              <h1
                className="text-sm underline"
                onClick={() => updateStatus(record, "accepted")}
              >
                Accept
              </h1>
              <h1
                className="text-sm underline"
                onClick={() => updateStatus(record, "rejected")}
              >
                Reject
              </h1>
            </div>
          );
        }
      },
    },
  ];

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Request" />
        <button
          className="primary-outlined-btn"
          onClick={() => setShowNewRequest(true)}
        >
          Request Funds
        </button>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Sent" key="1">
          <Table columns={columns} dataSource={data} className="mt-2" />
        </TabPane>
        <TabPane tab="Received" key="2">
          <Table columns={columns} dataSource={data} className="mt-2" />
        </TabPane>
      </Tabs>
      {showNewRequest && (
        <NewRequestModal
          showNewRequest={showNewRequest}
          setShowNewRequest={setShowNewRequest}
          reloadData={getData}
        />
      )}
    </div>
  );
};

export default Requests;
