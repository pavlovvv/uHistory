import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";
import { API } from "../other/DataAccessLayer";
import { IWatchedArr } from "./../Typescript/interfaces/data";
import { AppDispatch } from "./store";

export interface ISignUp {
  email: string;
  password: string;
  name: string;
}

export const signUp = createAsyncThunk<
  object,
  ISignUp,
  { dispatch: AppDispatch }
>("sign/signUp", async function ({ email, password, name }, { dispatch }) {
  try {
    dispatch(setPending(true));
    const response = await API.signAPI.signUp(email, password, name, "default");
    const auth = getAuth();
    const firebaseSignUp = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    dispatch(confirmReg());
    dispatch(setPending(false));
  } catch (error) {
    dispatch(setPending(false));

    if (!error.response) {
      return dispatch(setError("Some error occured. Try again later"));
    }

    const status = error.response.status;
    dispatch(setError(status ? error.response.data.msg : "Some error occured"));
  }
});

export interface IAuth {
  email: string;
  password: string;
}

export const auth = createAsyncThunk<object, IAuth, { dispatch: AppDispatch }>(
  "sign/auth",
  async function ({ email, password }, { dispatch }) {
    try {
      dispatch(setPending(true));
      const response = await API.signAPI.auth(email, password);

      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password).catch(console.log);

      dispatch(setPending(false));
      const data = await response.data;

      dispatch(setUsername(data.username));
    } catch (error) {
      dispatch(setPending(false));

      if (!error.response) {
        return dispatch(setLogInError("Some error occured. Try again later"));
      }

      const status = error.response.status;
      dispatch(
        setLogInError(status ? error.response.data.msg : "Some error occured")
      );
    }
  }
);

export const logOut = createAsyncThunk<
  object,
  undefined,
  { dispatch: AppDispatch }
>("sign/logOut", async function (_, { dispatch }) {
  const response = await API.signAPI.logOut();
  dispatch(setAuth(false));
});

export const getOwnInfo = createAsyncThunk<
  object,
  undefined,
  { dispatch: AppDispatch }
>("sign/getInfo", async function (_, { dispatch }) {
  try {
    const response = await API.signAPI.getOwnInfo();

    dispatch(setUser(response.data));
  } catch (error) {
    dispatch(setAuthFulfilled(true));
  }
});

export interface IContinueWithGoogle {
  email: string;
  name: string;
}

export const continueWithGoogle = createAsyncThunk<
  void,
  IContinueWithGoogle,
  { dispatch: AppDispatch }
>("sign/continueWithGoogle", async function ({ email, name }, { dispatch }) {
  try {
    const response = await API.signAPI.continueWithGoogle(email, name);
    if (response.data.msg === "Login confirmed") {
      dispatch(googleLogin());
    } else {
      dispatch(setAuth(true));
    }
  } catch (error) {
    dispatch(setError("Some error occured. Try again later"));
  }
});

export interface IUpdateCurrency {
  currency: string;
}

export const updateCurrency = createAsyncThunk<
  void,
  IUpdateCurrency,
  { dispatch: AppDispatch }
>("sign/updateCurrency", async function ({ currency }, { dispatch }) {
  const response = await API.signAPI.updateCurrency(currency);
  dispatch(getOwnInfo());
});

export interface ILikeItem {
  id: number;
}

export const likeItem = createAsyncThunk<
  void,
  ILikeItem,
  { dispatch: AppDispatch }
>("sign/updateCurrency", async function ({ id }, { dispatch }) {
  dispatch(setPending(true));

  dispatch(likeItemArr(id));

  const response = await API.signAPI.likeItem(id);

  await dispatch(getOwnInfo());
  dispatch(setPending(false));
});

export interface IWatchItem {
  id: number;
}

export const watchItem = createAsyncThunk<
  void,
  IWatchItem,
  { dispatch: AppDispatch }
>("sign/updateCurrency", async function ({ id }, { dispatch }) {
  const date = new Date();

  const response = await API.signAPI.watchItem(id, date);

  dispatch(getOwnInfo())
});

export interface IWatchI2tem {
  link: string
}

export const getScene = createAsyncThunk<
  void,
  IWatchI2tem,
  { dispatch: AppDispatch }
>("sign/getScene", async function ({}, { dispatch }) {
    debugger
    console.log(1)
  const response = await API.itemAPI.getScene();

  console.log(response)

});



interface ISetUser {
  id: number;
  name: string;
  email: string;
  type: string;
  currency: string;
  telegram: string;
  instagram: string;
  liked: number;
  watched: number;
  registration_date: Date;
  avatar: number;
  likedArr: number[];
  watchedArr: IWatchedArr[];
}

type StringOrNull = string | null;

interface ISignState {
  isSigning: boolean;
  isPending: boolean;
  email: string;
  name: StringOrNull;
  isAuthed: boolean;
  id: number | null;
  isAuthFulfilled: boolean;
  error: StringOrNull;
  logInError: StringOrNull;
  type: StringOrNull;
  isRegConfirmed: boolean;
  currency: StringOrNull;
  key: number;
  avatar: number;
  registration_date: Date | null;
  links: {
    telegram: StringOrNull;
    instagram: StringOrNull;
  };
  stats: {
    liked: number;
    watched: number;
  };
  likedArr: number[];
  watchedArr: IWatchedArr[];
}

const initialState: ISignState = {
  isSigning: false,
  isPending: false,
  email: null,
  name: null,
  type: null,
  currency: null,
  id: null,
  isAuthed: false,
  isAuthFulfilled: false,
  error: null,
  logInError: null,
  isRegConfirmed: false,
  key: 0,
  avatar: 0,
  registration_date: null,
  links: {
    telegram: null,
    instagram: null,
  },
  stats: {
    liked: 0,
    watched: 0,
  },
  likedArr: [],
  watchedArr: [],
};

const signSlice = createSlice({
  name: "sign",
  initialState,
  reducers: {
    setSigning(state, action: PayloadAction<boolean>) {
      state.isSigning = action.payload;
    },

    setUsername(state, action: PayloadAction<string>) {
      state.name = action.payload;
      state.isAuthed = true;
    },

    confirmReg(state) {
      state.error = null;
      state.isRegConfirmed = true;
    },

    googleLogin(state) {
      state.isAuthed = true;
    },

    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },

    setLogInError(state, action: PayloadAction<string>) {
      state.logInError = action.payload;
    },

    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuthed = action.payload;
      state.isRegConfirmed = action.payload;
    },

    setPending(state, action: PayloadAction<boolean>) {
      state.isPending = action.payload;
    },

    setUser(state, action: PayloadAction<ISetUser>) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.type = action.payload.type;
      state.currency = action.payload.currency;
      state.avatar = action.payload.avatar;
      state.registration_date = action.payload.registration_date;
      state.links.telegram = action.payload.telegram;
      state.links.instagram = action.payload.instagram;
      state.stats.liked = action.payload.liked;
      state.stats.watched = action.payload.watched;
      state.likedArr = action.payload.likedArr;
      state.watchedArr = action.payload.watchedArr;
      state.isAuthed = true;
      state.isAuthFulfilled = true;
    },

    refreshComponent(state) {
      state.key++;
    },

    likeItemArr(state, action: PayloadAction<number>) {
      if (state.likedArr.includes(action.payload)) {
        state.likedArr = state.likedArr.filter((e) => {
          return e !== action.payload;
        });
      } else {
        state.likedArr.push(action.payload);
      }
    },

    setAuthFulfilled(state, action: PayloadAction<boolean>) {
      state.isAuthFulfilled = action.payload;
    },
  },
});

export const {
  setSigning,
  setUsername,
  confirmReg,
  setError,
  googleLogin,
  setLogInError,
  setAuth,
  setPending,
  setUser,
  setAuthFulfilled,
  refreshComponent,
  likeItemArr,
} = signSlice.actions;

export default signSlice.reducer;
