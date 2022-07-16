import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isPending,
} from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";
import { API } from "../DataAccessLayer/DAL";

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
>(
  "sign/continueWithGoogle",
  async function ({ email, name }, { dispatch }) {
    try {
        const response = await API.signAPI.continueWithGoogle(
          email,
          name
        );
        if (response.data.msg === 'Login confirmed') {
          dispatch(googleLogin())
        }
        else {
          dispatch(setAuth(true))
        }
    } catch (error) {
      dispatch(setError("Some error occured. Try again later"));
    }
  }
);

export interface IUpdateCurrency {
  currency: string;
}

export const updateCurrency = createAsyncThunk<
  void,
  IUpdateCurrency,
  { dispatch: AppDispatch }
>(
  "sign/updateCurrency",
  async function ({ currency }, { dispatch }) {
        const response = await API.signAPI.updateCurrency(currency);
        dispatch(getOwnInfo())
  }
);


interface ISetUser {
  id: number
  name: string
  email: string
  type: string
  currency: string
}



type StringOrNull = string | null;

interface ISignState {
  isSigning: boolean
  isPending: boolean
  email: string
  name: StringOrNull
  isAuthed: boolean
  id: number | null
  isAuthFulfilled: boolean
  error: StringOrNull
  logInError: StringOrNull
  type: StringOrNull
  isRegConfirmed: boolean
  currency: StringOrNull
  key: number
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
  key: 0
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
      state.isRegConfirmed = true
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
      state.currency = action.payload.currency
      state.isAuthed = true;
      state.isAuthFulfilled = true;
    },

    refreshComponent(state) {
      state.key++
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
} = signSlice.actions;

export default signSlice.reducer;
