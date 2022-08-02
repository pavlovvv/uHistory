import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { API } from "../other/DataAccessLayer";
import { getOwnInfo } from "./signSlice";

export interface IUpdateInfo {
  name: string;
  email: string;
  telegram: StringOrNull;
  instagram: StringOrNull;
}

export const updateInfo = createAsyncThunk<
  void,
  IUpdateInfo,
  { dispatch: AppDispatch }
>(
  "profile/updateInfo",
  async function ({ name, email, telegram, instagram }, { dispatch }) {
    try {
      dispatch(setPending(true));
      const response = await API.profileAPI.updateInfo(
        name,
        email,
        telegram,
        instagram
      );
      dispatch(setSuccess(true));
      dispatch(setPending(false));
      dispatch(getOwnInfo());
    } catch (err) {
      dispatch(setPending(false));
      dispatch(setError("Some error occurred. Try again later"));
    }
  }
);

export interface IChangeAvatar {
  avatar: number;
}

export const changeAvatar = createAsyncThunk<
  void,
  IChangeAvatar,
  { dispatch: AppDispatch }
>("profile/changeAvatar", async function ({ avatar }, { dispatch }) {
  try {
    const response = await API.profileAPI.changeAvatar(avatar);
    dispatch(getOwnInfo());
  } catch (err) {
    dispatch(setError("Some error occurred. Try again later"));
  }
});

type StringOrNull = string | null;

interface ISignState {
  error: StringOrNull;
  success: boolean;
  isPending: boolean;
}

const initialState: ISignState = {
  error: null,
  success: false,
  isPending: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.success = true;
    },

    setPending(state, action: PayloadAction<boolean>) {
      state.isPending = action.payload;
    },

    setSuccess(state, action: PayloadAction<boolean>) {
      state.success = action.payload;
      state.error = null;
    },
  },
});

export const { setError, setSuccess, setPending } = profileSlice.actions;

export default profileSlice.reducer;
