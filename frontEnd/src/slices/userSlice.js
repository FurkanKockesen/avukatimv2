import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log(email, password);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        { email: email, password: password },
        config
      );

      if (response.status === 200) {
        return response.data;
      } else {
        console.log("adsas");
        return rejectWithValue(response);
      }
    } catch (e) {
      if (e.response.data.detail) {
        return rejectWithValue(e.response.data.detail);
      } else {
        return rejectWithValue(e);
      }
    }
  }
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async (
    {
      isLawyerForm,
      email,
      first_name,
      last_name,
      password,
      password2,
      phone_number,
      image,
    },
    { rejectWithValue }
  ) => {
    if (isLawyerForm) {
      try {
        const config = { headers: { "Content-Type": "multipart/form-data" } };

        let formData = new FormData();
        formData.append("email", email);
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("password", password);
        formData.append("password2", password2);
        formData.append("phone_number", phone_number);
        formData.append("image", image);
        console.log(image);

        for (var key of formData.entries()) {
          console.log(key[0] + ", " + key[1]);
        }

        const response = await axios.post(
          "http://127.0.0.1:8000/api/users/register/lawyer/",
          formData,
          config
        );

        if (response.status === 200) {
          return response.data;
        } else {
          return rejectWithValue(response);
        }
      } catch (e) {
        if (e.response.data.detail) {
          return rejectWithValue(e.response.data.detail);
        } else {
          return rejectWithValue(e);
        }
      }
    } else {
      try {
        console.log("kullanıcı kaydı");
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.post(
          "http://127.0.0.1:8000/api/users/register/normal/",
          { email, first_name, last_name, password, password2 },
          config
        );

        if (response.status === 200) {
          return response.data;
        } else {
          return rejectWithValue(response);
        }
      } catch (e) {
        if (e.response.data.detail) {
          return rejectWithValue(e.response.data.detail);
        } else {
          return rejectWithValue(e);
        }
      }
    }
  }
);

export const getUserDetail = createAsyncThunk(
  "user/getUserDetail",
  async (username, { rejectWithValue }) => {
    const apiURL = "http://127.0.0.1:8000/api/users/lawyers/detail/" + username;
    try {
      const response = await axios.get(apiURL);
      if (response.status === 200) {
        console.log("detay bilgileri çekildi");
        return response;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (e) {
      if (e.response.data.detail) {
        return rejectWithValue(e.response.data.detail);
      } else {
        return rejectWithValue(e);
      }
    }
  }
);

export const updateContact = createAsyncThunk(
  "user/updateContact",
  async ({ phone_number, address, city }, { getState, rejectWithValue }) => {
    const userInfo = getState().user.userInfo;
    const token = userInfo.access;
    console.log(userInfo.email, token);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        "http://127.0.0.1:8000/api/users/update/contact/",
        { phone_number, address, city },
        config
      );

      console.log(response);

      if (response.status === 200) {
        console.log("contact güncellendi");
        return response;
      } else {
        return rejectWithValue(response);
      }
    } catch (e) {
      if (e.response.data.detail) {
        return rejectWithValue(e.response.data.detail);
      } else {
        return rejectWithValue(e);
      }
    }
  }
);

export const updatePhoto = createAsyncThunk(
  "user/updatePhoto",
  async ({ image }, { getState, rejectWithValue }) => {
    const profile_image = image;

    const userInfo = getState().user.userInfo;
    const token = userInfo.access;
    console.log(userInfo.email, token);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      let formData = new FormData();
      formData.append("profile_image", profile_image);

      const response = await axios.put(
        "http://127.0.0.1:8000/api/users/update/image/",
        formData,
        config
      );

      console.log(response);

      if (response.status === 200) {
        console.log("image güncellendi");
        return response;
      } else {
        return rejectWithValue(response);
      }
    } catch (e) {
      if (e.response.data.detail) {
        return rejectWithValue(e.response.data.detail);
      } else {
        return rejectWithValue(e);
      }
    }
  }
);

export const updateUserName = createAsyncThunk(
  "user/updateUserName",
  async ({ username }, { getState, rejectWithValue }) => {
    const userInfo = getState().user.userInfo;
    const token = userInfo.access;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        "http://127.0.0.1:8000/api/users/update/username/",
        { username: username },
        config
      );

      if (response.status === 200) {
        console.log("kullanici adi güncellendi");
        return response;
      } else {
        return rejectWithValue(response);
      }
    } catch (e) {
      if (e.response.data.detail) {
        return rejectWithValue(e.response.data.detail);
      } else {
        return rejectWithValue(e);
      }
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async ({ password, password2 }, { getState, rejectWithValue }) => {
    const userInfo = getState().user.userInfo;
    const token = userInfo.access;
    console.log(userInfo.email, token);
    const new_password = password;
    const new_password_confirm = password2;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        "http://127.0.0.1:8000/api/users/password/change/",
        { new_password, new_password_confirm },
        config
      );

      console.log(response);

      if (response.status === 200) {
        console.log("parola güncellendi");
        return response;
      } else {
        return rejectWithValue(response);
      }
    } catch (e) {
      if (e.response.data.detail) {
        return rejectWithValue(e.response.data.detail);
      } else {
        return rejectWithValue(e);
      }
    }
  }
);

export const updateEmail = createAsyncThunk(
  "user/updateEmail",
  async ({ email }, { getState, rejectWithValue }) => {
    const userInfo = getState().user.userInfo;
    const token = userInfo.access;
    const new_email = email;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        "http://127.0.0.1:8000/api/users/update/email/",
        { new_email },
        config
      );

      console.log(response);

      if (response.status === 200) {
        console.log("email güncellendi");
        return response;
      } else {
        return rejectWithValue(response);
      }
    } catch (e) {
      if (e.response.data.detail) {
        return rejectWithValue(e.response.data.detail);
      } else {
        return rejectWithValue(e);
      }
    }
  }
);

export const updateAbout = createAsyncThunk(
  "user/updateAbout",
  async ({ hakkimda }, { getState, rejectWithValue }) => {
    const userInfo = getState().user.userInfo;
    const token = userInfo.access;
    console.log(userInfo.email, token);
    const description = hakkimda;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        "http://127.0.0.1:8000/api/users/update/description/",
        { description },
        config
      );

      console.log(response);

      if (response.status === 200) {
        console.log("hakkimda güncellendi");
        return response;
      } else {
        return rejectWithValue(response);
      }
    } catch (e) {
      if (e.response.data.detail) {
        return rejectWithValue(e.response.data.detail);
      } else {
        return rejectWithValue(e);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userInfo: {},
    userDetail: {},
    isFetching: false,
    isSuccess: false,
    isError: false,
    actionMessage: "haha",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.actionMessage = "";
      return state;
    },
    logOut: (state) => {
      state.isLogin = false;
      state.userInfo = {};
      state.userDetail = {};
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.actionMessage = "";
      return state;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.some,
      };
    },
    [getUserDetail.fulfilled]: (state, { payload }) => {
      state.userDetail = payload.data;
    },
    [getUserDetail.rejected]: (state, { payload }) => {
      console.log(payload);
    },
    [getUserDetail.pending]: (state) => {},
    /*-----------------------*/
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLogin = true;
      state.userInfo = payload;
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.actionMessage = payload;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    /*-----------------------*/
    [signUp.fulfilled]: (state, { payload }) => {
      /*
      state.isLogin = true;
      state.userInfo = payload;
      */
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    },
    [signUp.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [signUp.rejected]: (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.actionMessage = payload;
    },
    /* ---------------------------------- */
    [updateContact.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    },
    [updateContact.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [updateContact.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.actionMessage = payload;
    },
    /* ---------------------------------- */
    [updatePhoto.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    },
    [updatePhoto.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [updatePhoto.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.actionMessage = payload;
    },
    /* -------------------------- */
    [updateUserName.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.userInfo["username"] = JSON.parse(payload.config.data)["username"];
    },
    [updateUserName.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [updateUserName.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.actionMessage = payload;
    },
    /* -------------------------- */
    [updatePassword.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    },
    [updatePassword.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [updatePassword.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.actionMessage = payload;
    },
    /* -------------------------- */
    [updateEmail.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.userInfo["email"] = JSON.parse(payload.config.data)["new_email"];
    },
    [updateEmail.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [updateEmail.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.actionMessage = payload;
    },
    /* -------------------------- */
    [updateAbout.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    },
    [updateAbout.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [updateAbout.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.actionMessage = payload;
    },
  },
});

export const { clearState, logOut } = userSlice.actions;
export const userSelector = (state) => state.user;

export default userSlice.reducer;
