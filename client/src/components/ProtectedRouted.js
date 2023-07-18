import React, { useEffect } from "react";
import { message } from "antd";
import { GetUserInfo } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReloadUser, setUser } from "../redux/userSlice";
import { HideLoading, ShowLoading } from "../redux/LoaderSlice";
import DefaultLayout from "./defaultLayout";

const ProtectedRouted = (props) => {
  const { user ,reloadUser} = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetUserInfo();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        message.error = response.message;
        navigate("/login");
      }
      dispatch(ReloadUser(false))
    } catch (error) {
      dispatch(HideLoading());
      message.error = error.message;
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (!user) {
        getData();
      }
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if(reloadUser){
      getData();
    }
  },[reloadUser])
  return (
    user && (
      <div>
        <DefaultLayout>
        {props.children}
        </DefaultLayout>
      </div>
    )
  );
};

export default ProtectedRouted;
