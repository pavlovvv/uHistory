import {
  createTheme, IconButton, InputAdornment, NoSsr,
  TextField, ThemeProvider, useMediaQuery, CircularProgress,
  Alert
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/dist/client/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setSigning } from "../redux/signSlice";
import s from "../styles/signup.module.css";
import { IInputPasswordValues, ILocale, ISignUpSubmit } from "../Typescript/interfaces/data";
import { useAppDispatch, useAppSelector } from "../Typescript/redux-hooks";
import InitialLayout from "../components/layouts/InitialLayout";
import { signUp } from "../redux/signSlice";
import { useRouter } from "next/dist/client/router";


export async function getStaticProps({ locale }: ILocale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "initial", "signup"])),
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

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter()

  const isPending = useAppSelector(state => state.sign.isPending)
  const error = useAppSelector(state => state.sign.error)
  const isRegConfirmed = useAppSelector(state => state.sign.isRegConfirmed)
  const isAuthed = useAppSelector(state => state.sign.isAuthed)

  const { t } = useTranslation("signup");
  const it = useTranslation("initial").t;
  const ct = useTranslation("common").t;

  useEffect(() => {

    if (isRegConfirmed) {
      router.push('/main')
    }

    else if (isAuthed) {
      router.push('/main')
    }

  }, [isRegConfirmed, isAuthed])

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
    name: "",
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
    name
  }: ISignUpSubmit): void => {

    const name_surname: string[] = name.split(' ')

    let str: string = ''

    for (let i = 0; i < name_surname.length; i++) {
      str = str.concat(name_surname[i].charAt(0).toUpperCase() +
      name_surname[i].slice(1).toLowerCase())
      str = str.concat(' ')
    }
    str = str.trimEnd()

    dispatch(
      signUp({
        email: email.replace(/\s+/g, "").toLowerCase(),
        password,
        name: str
      })
    );
  };

  return (
    <InitialLayout t={it}>
      <ThemeProvider theme={theme}>
        <main className={s.signup}>
          <section className={s.signup__signupPanel + " " + s.signupPanel}>
            <div className={s.container}>
              <div className={s.signupPanel__inner}>
                <h3 className={s.signupPanel__title}>{t("registration")}</h3>
                <form onSubmit={handleSubmit(onSubmit)} className={s.signup__form}>

                <div className={s.signup__formSection}>
                    <label htmlFor="name" className={s.signup__formLabel}>
                      {" "}
                      <i className="bi bi-person" /> {t("your_name")}
                    </label>
                    <CustomTextField
                      id="name"
                      placeholder="ELON MUSK"
                      variant="outlined"
                      required
                      error={!!errors.name}
                      onChangeCapture={(e: any) => {
                        setValues({
                          ...values,
                          name: e.target.value,
                        });
                      }}
                      onChange={handleChange("name")}
                      customcolor={
                        Number(values.name.length) > 20 
                        || Number(values.name.length) < 5 
                        || !values.name.match(/^([A-Za-zА-Яа-яієїґ]{2,}\s[A-Za-zА-Яа-яієїґ]{1,}'?-?[A-Za-zА-Яа-яієїґ]{2,}\s?([A-Za-zА-Яа-яієїґ]{1,})?)/)
                          ? "#bcd9ff"
                          : "#94ffa8"
                      }
                      helperText={errors.name && errors.name.message}
                      {...register("name", {
                        required: ct("filled"),
                        minLength: {
                          value: 5,
                          message: ct("min", { count: 5 }),
                        },
                        maxLength: {
                          value: 20,
                          message: ct("max", { count: 20 }),
                        },
                        pattern: {
                          value: /^([A-Za-zА-Яа-яієїґ]{2,}\s[A-Za-zА-Яа-яієїґ]{1,}'?-?[A-Za-zА-Яа-яієїґ]{2,}\s?([A-Za-zА-Яа-яієїґ]{1,})?)/,
                          message: ct("invalid_name"),
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

                  <div className={s.signup__formSection}>
                    <label htmlFor="email" className={s.signup__formLabel}>
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

                  <div className={s.signup__formSection}>
                    <label htmlFor="password" className={s.signup__formLabel}>
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
                        ||Number(values.password.length) < 8 
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
                        pattern: {
                          value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                          message: ct("invalid_password")
                        }
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

                  <div className={s.signup__rules}>
                    <ul>
                      <li className={s.signup__rule}>
                        - {t("rule1")} <span className={s.signup__ruleBold}>{t("rule1.1")}</span>
                      </li>
                      <li className={s.signup__rule}>
                        - {t("rule2")}
                      </li>
                      <li className={s.signup__rule}>
                        - {t("rule3")}
                      </li>
                      <li className={s.signup__rule}>
                        - {t("rule4")} <span className={s.signup__ruleBold}>{t("rule4.1")}</span>
                      </li>
                    </ul>
                  </div>
                  <button className={s.signup__formSubmit} disabled={isPending} type='submit'>
                      {isPending && (
                          <CircularProgress size={20} sx={{ color: "#73777B", marginRight: '10px' }} />
                        )} {t("submit")}
                  </button>
                </form>
                <div className={s.signup__newAcc}>
                  {t("already")}{" "}
                  <Link href="/login" passHref>
                    <span className={s.signup__newAccSpan}>{t("login")}</span>
                  </Link>
                </div>
                {error &&  <Alert variant="filled" severity="error" sx={{mt: '15px'}}>
                    {error}
               </Alert>}
              </div>
            </div>
          </section>
          <section
            className={s.signup__signupChar}
            style={{ position: "relative" }}
          >
            <NoSsr>
              <iframe
                className={s.signup__signupCharFrame}
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

export default SignUp;