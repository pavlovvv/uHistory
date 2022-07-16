import {
  createTheme, IconButton, InputAdornment, NoSsr,
  TextField, ThemeProvider, useMediaQuery, Alert, CircularProgress
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/dist/client/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setSigning } from "../redux/signSlice";
import s from "../styles/login.module.css";
import { IInputPasswordValues, ILocale, ILoginSubmit } from "../Typescript/interfaces/data";
import { useAppDispatch, useAppSelector } from "../Typescript/redux-hooks";
import InitialLayout from "./../components/layouts/InitialLayout";
import { auth } from "../redux/signSlice";
import { useRouter } from "next/dist/client/router";

export async function getStaticProps({ locale }: ILocale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "initial", "login"])),
    },
  };
}

interface ICustomTextFieldProps {
  customcolor: string;
}

const CustomTextField = styled(TextField)<ICustomTextFieldProps>(
  ({ theme, customcolor }) => ({
    "& label.Mui-focused": {
      color: customcolor,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: customcolor,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: customcolor === "#94ffa8" ? "#94ffa8" : "white",
        borderRadius: "10px",
      },
      "&:hover fieldset": {
        borderColor: customcolor,
      },
      "&.Mui-focused fieldset": {
        borderColor: customcolor,
      },
    },
  })
);

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter()

  const isPending = useAppSelector(state => state.sign.isPending)
  const logInError = useAppSelector(state => state.sign.logInError)
  const isAuthed = useAppSelector(state => state.sign.isAuthed)
  const isAuthFulfilled = useAppSelector(state => state.sign.isAuthFulfilled)

  const { t } = useTranslation("login");
  const it = useTranslation("initial").t;
  const ct = useTranslation("common").t;

  useEffect(() => {
    if (isAuthFulfilled && isAuthed) {
      router.push('/main')
    }
  }, [isAuthFulfilled, isAuthed]);

  useEffect(() => {
    dispatch(setSigning(true));
  }, []);

  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onBlur",
  });

  const theme = createTheme({
    palette: {
      error: {
        main: "#FF5959",
      },
    },
  });

  const [values, setValues] = useState<IInputPasswordValues>({
    password: "",
    email: "",
    showPassword: false,
  });

  const handleChange =
    (prop: keyof IInputPasswordValues) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setValues({ ...values, [prop]: event.target.value });
      setValue(prop, event.target.value);
    };

  const handleClickShowPassword = (): void => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };

  const max500 = useMediaQuery("(max-width:500px)");

  const onSubmit = ({
    email,
    password,
  }: ILoginSubmit): void => {

    dispatch(
      auth({
        email: email.replace(/\s+/g, "").toLowerCase(),
        password,
      })
    );
  };

  return (
    <InitialLayout t={it}>
      <ThemeProvider theme={theme}>
        <main className={s.login}>
          <section className={s.login__loginPanel + " " + s.loginPanel}>
            <div className={s.container}>
              <div className={s.loginPanel__inner}>
                <h3 className={s.loginPanel__title}>Login</h3>
                <form onSubmit={handleSubmit(onSubmit)} className={s.login__form}>
                  <div className={s.login__formSection}>
                    <label htmlFor="email" className={s.login__formLabel}>
                      {" "}
                      <i className="bi bi-envelope" /> {t("your_email")}
                    </label>
                    <CustomTextField
                      id="email"
                      placeholder="EXAMPLE@GMAIL.COM"
                      variant="outlined"
                      required
                      error={!!errors.email}
                      onChangeCapture={(e: any) => {
                        setValues({
                          ...values,
                          email: e.target.value,
                        });
                      }}
                      onChange={handleChange("email")}
                      customcolor={
                        Number(values.email.length) > 35 
                         || Number(values.email.length) < 8 || !values.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+\s*$/i)
                          ? "#bcd9ff"
                          : "#94ffa8"
                      }
                      helperText={errors.email && errors.email.message}
                      {...register("email", {
                        required: ct("filled"),
                        minLength: {
                          value: 8,
                          message: ct("min", { count: 8 }),
                        },
                        maxLength: {
                          value: 35,
                          message: ct("max", { count: 35 }),
                        },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+\s*$/i,
                          message: ct("invalid_email"),
                        },
                      })}
                      sx={
                        !max500
                          ? {
                              input: {
                                color: "#fff",
                                paddingTop: "12px",
                                paddingBottom: "12px",
                                textAlign: "center",
                                fontSize: "20px",
                              },
                              width: "100%",
                            }
                          : {
                              input: {
                                color: "#fff",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                textAlign: "center",
                                fontSize: "15px",
                              },
                              width: "100%",
                            }
                      }
                    />
                  </div>

                  <div className={s.login__formSection}>
                    <label htmlFor="password" className={s.login__formLabel}>
                      {" "}
                      <i className="bi bi-key" /> {t("your_password")}
                    </label>
                    <CustomTextField
                      id="password"
                      placeholder="**********"
                      variant="outlined"
                      required
                      error={!!errors.password}
                      type={values.showPassword ? "text" : "password"}
                      onChangeCapture={(e: any) => {
                        setValues({
                          ...values,
                          password: e.target.value,
                        });
                      }}
                      onChange={handleChange("password")}
                      helperText={errors.password && errors.password.message}
                      customcolor={
                        Number(values.password.length) > 25 
                        || Number(values.password.length) < 8 
                        || !values.password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
                          ? "#bcd9ff"
                          : "#94ffa8"
                      }
                      {...register("password", {
                        required: ct("filled"),
                        minLength: {
                          value: 8,
                          message: ct("min", { count: 8 }),
                        },
                        maxLength: {
                          value: 25,
                          message: ct("max", { count: 25 }),
                        },
                      })}
                      sx={
                        !max500
                          ? {
                              input: {
                                color: "#fff",
                                paddingTop: "12px",
                                paddingBottom: "12px",
                                textAlign: "center",
                                fontSize: "20px",
                              },
                              width: "100%",
                            }
                          : {
                              input: {
                                color: "#fff",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                textAlign: "center",
                                fontSize: "15px",
                              },
                              width: "100%",
                            }
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              sx={{ color: "#fff" }}
                            >
                              {values.showPassword ? (
                                <i className="bi bi-eye-slash" />
                              ) : (
                                <i className="bi bi-eye" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <button className={s.login__formSubmit} disabled={isPending} type='submit'>
                      {isPending && (
                          <CircularProgress size={20} sx={{ color: "#73777B", marginRight: '10px' }} />
                        )} {t("submit")}
                  </button>
                </form>
                <div className={s.login__newAcc}>
                  {t("no_acc")}{" "}
                  <Link href="/signup" passHref>
                    <span className={s.login__newAccSpan}>{t("reg")}</span>
                  </Link>
                </div>
                {logInError &&  <Alert variant="filled" severity="error" sx={{mt: '15px'}}>
                    {logInError}
               </Alert>}
              </div>
            </div>
          </section>
          <section
            className={s.login__loginChar}
            style={{ position: "relative" }}
          >
            <NoSsr>
              <iframe
                className={s.login__loginCharFrame}
                src="https://my.spline.design/untitled-05e79ae47a0e75eaca386082fcc88eb0/"
                frameBorder="0"
                width="600px"
                height={!max500 ? "1000px" : "600px"}
              />
            </NoSsr>
          </section>
        </main>
      </ThemeProvider>
    </InitialLayout>
  );
};

export default Login;