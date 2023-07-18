const { axiosInstance } = require(".");

export const VerifyAccount = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/verify-account",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const TransferFunds = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/transfer-fund",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
}


export const GetTransactionsOfUser = async () => {
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/get-all-transactions"
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
}

export const DepositFunds =async(payload)=>{
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/deposit-funds",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
}