import React from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/LoaderSlice";
import { GetAllUsers, UpdateVerifiedUser } from "../../apicalls/users";
import { Table, message } from "antd";
import PageTitle from "../../components/PageTitle";

const Users = () => {
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllUsers();
      dispatch(HideLoading());
      if (response.success) {
        setUsers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const updateStatus = async (record, isverified) => {
    try {
      dispatch(ShowLoading());
      const response = await UpdateVerifiedUser({
        selectedUser: record._id,
        isverified,
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "fname",
    },
    {
      title: "Last Name",
      dataIndex: "lname",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className="flex gap-1">
            {record.isverified ? (
              <button
                className="primary-outlined-btn"
                onClick={() => updateStatus(record, false)}
              >
                Suspend
              </button>
            ) : (
              <button
                className="primary-outlined-btn"
                onClick={() => updateStatus(record, true)}
              >
                Activate
              </button>
            )}
          </div>
        );
      },
    },

    {
      title: "Verified",
      dataIndex: "isverified",
      render: (text, record) => {
        if (text) {
          return <span>Yes</span>;
        } else {
          return <span>No</span>;
        }
      },
    },
  ];

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <PageTitle title="Users" />
      <Table columns={columns} dataSource={users} className="mt-2" />
    </div>
  );
};

export default Users;
