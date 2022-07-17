import {
  Alert,
  CircularProgress, createTheme, styled, TextField, ThemeProvider, useMediaQuery
} from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/dist/client/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SwipeableViews from "react-swipeable-views";
import MainLayout from "../components/layouts/MainLayout";
import setAvatarIndex from "../other/setAvatarIndex";
import avatar1 from "../public/images/avatar1.png";
import avatar10 from "../public/images/avatar10.png";
import avatar2 from "../public/images/avatar2.png";
import avatar3 from "../public/images/avatar3.png";
import avatar4 from "../public/images/avatar4.png";
import avatar5 from "../public/images/avatar5.png";
import avatar6 from "../public/images/avatar6.png";
import avatar7 from "../public/images/avatar7.png";
import avatar8 from "../public/images/avatar8.png";
import avatar9 from "../public/images/avatar9.png";
import { changeAvatar, updateInfo } from "../redux/profileSlice";
import s from "../styles/profile.module.css";
import {
  IInputProfileValues,
  ILocale,
  IProfileSubmit
} from "../Typescript/interfaces/data";
import { useAppDispatch, useAppSelector } from "../Typescript/redux-hooks";

export async function getStaticProps({ locale }: ILocale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "settings",
        "profile",
      ])),
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

const Profile: React.FC = () => {
  const st = useTranslation("settings").t;
  const ct = useTranslation("common").t;
  const { t } = useTranslation("profile");

  const dispatch = useAppDispatch();

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

  const name = useAppSelector((state) => state.sign.name);
  const email = useAppSelector((state) => state.sign.email);
  const type = useAppSelector((state) => state.sign.type);
  const error = useAppSelector((state) => state.profile.error);
  const success = useAppSelector((state) => state.profile.success);
  const id = useAppSelector((state) => state.sign.id);
  const avatar = useAppSelector((state) => state.sign.avatar);
  const registration_date = useAppSelector(
    (state) => state.sign.registration_date
  );
  const links = useAppSelector((state) => state.sign.links);
  const stats = useAppSelector((state) => state.sign.stats);
  const isPending = useAppSelector((state) => state.profile.isPending);

  if (registration_date !== null) {
    const date = new Date(registration_date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
  }

  const [values, setValues] = useState<IInputProfileValues>({
    email: email || "",
    name: name || "",
    telegram: links.telegram || "",
    instagram: links.instagram || "",
  });

  const handleChange =
    (prop: keyof IInputProfileValues) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setValues({ ...values, [prop]: event.target.value });
      setValue(prop, event.target.value);
    };

  const allAvatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10,
  ];

  const unUsingAvatars = allAvatars.filter((e, i) => {
    return i !== avatar;
  });

  let subUnUsingAvatars = [];

  const onSubmit = ({
    name,
    email,
    telegram,
    instagram,
  }: IProfileSubmit): void => {
    const name_surname: string[] = name.split(" ");

    let str: string = "";

    for (let i = 0; i < name_surname.length; i++) {
      str = str.concat(
        name_surname[i].charAt(0).toUpperCase() +
          name_surname[i].slice(1).toLowerCase()
      );
      str = str.concat(" ");
    }
    str = str.trimEnd();

    dispatch(
      updateInfo({
        name: str,
        email: email.replace(/\s+/g, "").toLowerCase(),
        telegram: telegram !== "" ? telegram : null,
        instagram: instagram !== "" ? instagram : null,
      })
    );
  };

  const handleChangeAvatar = (avatar: StaticImageData): void => {
    const number = setAvatarIndex(avatar);

    dispatch(changeAvatar({ avatar: number }));
  };

  let size = 9;

  const max1700 = useMediaQuery("(max-width:1700px)");
  if (max1700) {
    size = 8;
  }

  const max1600 = useMediaQuery("(max-width:1600px)");
  if (max1600) {
    size = 7;
  }

  const max1500 = useMediaQuery("(max-width:1500px)");
  if (max1500) {
    size = 6;
  }

  const max1400 = useMediaQuery("(max-width:1400px)");
  if (max1400) {
    size = 5;
  }

  const max1200 = useMediaQuery("(max-width:1200px)");
  if (max1200) {
    size = 4;
  }

  const max1050 = useMediaQuery("(max-width:1050px)");
  if (max1050) {
    size = 3;
  }

  const max900 = useMediaQuery("(max-width:900px)");
  if (max900) {
    size = 2;
  }

  const max800 = useMediaQuery("(max-width:800px)");
  if (max800) {
    size = 6;
  }

  const max650 = useMediaQuery("(max-width:650px)");
  if (max650) {
    size = 5;
  }

  const max570 = useMediaQuery("(max-width:570px)");
  if (max570) {
    size = 4;
  }

  const max500 = useMediaQuery("(max-width:500px)");
  if (max500) {
    size = 3;
  }

  const max430 = useMediaQuery("(max-width:430px)");
  if (max430) {
    size = 2;
  }

  const max359 = useMediaQuery("(max-width:359px)");
  if (max359) {
    size = 1;
  }

  for (let i = 0; i < Math.ceil(unUsingAvatars.length / size); i++) {
    subUnUsingAvatars[i] = unUsingAvatars.slice(i * size, i * size + size);
  }

  const maxSteps = subUnUsingAvatars.length;

  const [activeStep, setActiveStep] = useState<number>(0);
  const handleNext = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleStepChange = (step: number): void => {
    setActiveStep(step);
  };

  return (
    <MainLayout t={st}>
      <ThemeProvider theme={theme}>
        <main className={s.left}>
          <div className={s.container}>
            <div className={s.left__inner}>
              <section className={s.top}>
                <img
                  src={allAvatars[avatar].src}
                  className={s.top__mainAva}
                  alt="uhistory avatar"
                />
                <div className={s.top__right}>
                  <SwipeableViews
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                  >
                    {subUnUsingAvatars.map((e, i) => {
                      return (
                        <div className={s.top__rightAvatars} key={i}>
                          {e.map((e, i) => {
                            return (
                              <img
                                src={e.src}
                                className={s.top__rightAvatar}
                                key={i}
                                alt="uhistory avatar"
                                onClick={() => handleChangeAvatar(e)}
                              />
                            );
                          })}
                        </div>
                      );
                    })}
                  </SwipeableViews>
                  {max1700 && (
                    <button
                      disabled={activeStep === maxSteps - 1}
                      className={s.top__avatarsButtonRight}
                      onClick={handleNext}
                    >
                      <i
                        className="bi bi-arrow-right"
                        style={
                          !max800 ? { fontSize: "45px" } : { fontSize: "30px" }
                        }
                      />
                    </button>
                  )}
                  <div className={s.top__rightInfo}>
                    <div className={s.top__rightInfoEl}>
                      {t("registration_date")}:{" "}
                      <span className={s.top__rightInfoValue}>
                        {day}/{month}/{year}
                      </span>
                    </div>
                    <div className={s.top__rightInfoEl}>
                      {t("you_watched")}:{" "}
                      <span className={s.top__rightInfoValue}>
                        {stats.watched} {t("items")}
                      </span>
                    </div>
                    <div className={s.top__rightInfoEl}>
                      {t("you_liked")}:{" "}
                      <span className={s.top__rightInfoValue}>
                        {stats.liked} {t("items")}
                      </span>
                    </div>
                    <div className={s.top__rightInfoEl}>
                      {t("profile_id")}:{" "}
                      <span className={s.top__rightInfoValue}>{id}</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className={s.personal}>
                <div className={s.personalContainer}>
                  <form
                    className={s.personal__inner}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className={s.personal__el}>
                      <h2> {t("name")}: </h2>
                      <CustomTextField
                        id="name"
                        placeholder="ELON MUSK"
                        variant="outlined"
                        required
                        defaultValue={name}
                        error={!!errors.name}
                        onChangeCapture={(e: any) => {
                          setValues({
                            ...values,
                            name: e.target.value,
                          });
                        }}
                        onChange={handleChange("name")}
                        customcolor={
                          Number(values.name.length) > 20 ||
                          Number(values.name.length) < 3 ||
                          !values.name.match(
                            /^(?=[а-яА-ЯёЁa-zA-Z0-9 ]*$)(?!.*[<>'"/;`%~@#$^*()_+=[\]{}|\\,.?:])/
                          )
                            ? "#bcd9ff"
                            : "#94ffa8"
                        }
                        helperText={errors.name && errors.name.message}
                        {...register("name", {
                          required: ct("filled"),
                          minLength: {
                            value: 3,
                            message: ct("min", { count: 5 }),
                          },
                          maxLength: {
                            value: 20,
                            message: ct("max", { count: 20 }),
                          },
                          pattern: {
                            value:
                              /^(?=[а-яА-ЯёЁa-zA-Z0-9 ]*$)(?!.*[<>'"/;`%~@#$^*()_+=[\]{}|\\,.?:])/,
                            message: ct("invalid_name"),
                          },
                        })}
                        sx={
                          !max800
                            ? {
                                input: {
                                  color: "#fff",
                                  padding: "12px 0",
                                  textAlign: "center",
                                  fontSize: "20px",
                                  background: "rgba(41, 41, 41, 0.3)",
                                },
                                width: "100%",
                                maxWidth: "700px",
                              }
                            : {
                                input: {
                                  color: "#fff",
                                  padding: "7px 3px",
                                  textAlign: "center",
                                  fontSize: "15px",
                                  background: "rgba(41, 41, 41, 0.3)",
                                },
                                width: "100%",
                              }
                        }
                      />
                    </div>
                    <div className={s.personal__el}>
                      <h2> Email: </h2>
                      {type === "google_acc" ? (
                        <CustomTextField
                          id="email"
                          placeholder="EXAMPLE@GMAIL.COM"
                          variant="outlined"
                          required
                          error={!!errors.email}
                          value={email || ""}
                          customcolor={
                            Number(values.email.length) > 35 ||
                            Number(values.email.length) < 8 ||
                            !values.email.match(
                              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+\s*$/i
                            )
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
                            !max800
                              ? {
                                  input: {
                                    color: "#fff",
                                    padding: "12px 0",
                                    textAlign: "center",
                                    fontSize: "20px",
                                    background: "rgba(41, 41, 41, 0.3)",
                                  },
                                  width: "100%",
                                  maxWidth: "700px",
                                }
                              : {
                                  input: {
                                    color: "#fff",
                                    padding: "7px 3px",
                                    textAlign: "center",
                                    fontSize: "15px",
                                    background: "rgba(41, 41, 41, 0.3)",
                                  },
                                  width: "100%",
                                }
                          }
                        />
                      ) : (
                        <CustomTextField
                          id="email"
                          placeholder="EXAMPLE@GMAIL.COM"
                          variant="outlined"
                          required
                          error={!!errors.email}
                          defaultValue={email}
                          onChangeCapture={(e: any) => {
                            setValues({
                              ...values,
                              email: e.target.value,
                            });
                          }}
                          onChange={handleChange("email")}
                          customcolor={
                            Number(values.email.length) > 35 ||
                            Number(values.email.length) < 8 ||
                            !values.email.match(
                              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+\s*$/i
                            )
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
                            !max800
                              ? {
                                  input: {
                                    color: "#fff",
                                    padding: "12px 0",
                                    textAlign: "center",
                                    fontSize: "20px",
                                    background: "rgba(41, 41, 41, 0.3)",
                                  },
                                  width: "100%",
                                  maxWidth: "700px",
                                }
                              : {
                                  input: {
                                    color: "#fff",
                                    padding: "7px 3px",
                                    textAlign: "center",
                                    fontSize: "15px",
                                    background: "rgba(41, 41, 41, 0.3)",
                                  },
                                  width: "100%",
                                }
                          }
                        />
                      )}
                    </div>
                    <div className={s.personal__el}>
                      <h2 className={s.personal__elTelegram}> Telegram: </h2>
                      <CustomTextField
                        id="telegram"
                        placeholder="@EXAMPLE"
                        variant="outlined"
                        error={!!errors.telegram}
                        onChangeCapture={(e: any) => {
                          setValues({
                            ...values,
                            telegram: e.target.value,
                          });
                        }}
                        defaultValue={links.telegram || ""}
                        onChange={handleChange("telegram")}
                        customcolor={
                          Number(values.telegram.length) > 25 ||
                          Number(values.telegram.length) < 3 ||
                          !values.telegram.match(
                            /.*\B@(?=\w{5,32}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*/
                          )
                            ? "#bcd9ff"
                            : "#94ffa8"
                        }
                        helperText={errors.telegram && errors.telegram.message}
                        {...register("telegram", {
                          minLength: {
                            value: 3,
                            message: ct("min", { count: 3 }),
                          },
                          maxLength: {
                            value: 25,
                            message: ct("max", { count: 25 }),
                          },
                          pattern: {
                            value:
                              /.*\B@(?=\w{5,32}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*/,
                            message: ct("invalid_telegram"),
                          },
                        })}
                        sx={
                          !max800
                            ? {
                                input: {
                                  color: "#fff",
                                  padding: "12px 0",
                                  textAlign: "center",
                                  fontSize: "20px",
                                  background: "rgba(41, 41, 41, 0.3)",
                                },
                                width: "100%",
                                maxWidth: "700px",
                              }
                            : {
                                input: {
                                  color: "#fff",
                                  padding: "7px 3px",
                                  textAlign: "center",
                                  fontSize: "15px",
                                  background: "rgba(41, 41, 41, 0.3)",
                                },
                                width: "100%",
                              }
                        }
                      />
                    </div>
                    <div className={s.personal__el}>
                      <h2 className={s.personal__elInstagram}> Instagram: </h2>
                      <CustomTextField
                        id="instagram"
                        placeholder="HTTPS://WWW.INSTAGRAM.COM/EXAMPLE"
                        variant="outlined"
                        error={!!errors.instagram}
                        defaultValue={links.instagram || ""}
                        onChangeCapture={(e: any) => {
                          setValues({
                            ...values,
                            instagram: e.target.value,
                          });
                        }}
                        onChange={handleChange("instagram")}
                        customcolor={
                          Number(values.instagram.length) > 45 ||
                          Number(values.instagram.length) < 8 ||
                          !values.instagram.match(
                            /(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com)\/([A-Za-z0-9-_\.]+)/im
                          )
                            ? "#bcd9ff"
                            : "#94ffa8"
                        }
                        helperText={
                          errors.instagram && errors.instagram.message
                        }
                        {...register("instagram", {
                          minLength: {
                            value: 8,
                            message: ct("min", { count: 8 }),
                          },
                          maxLength: {
                            value: 45,
                            message: ct("max", { count: 45 }),
                          },
                          pattern: {
                            value:
                              /(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com)\/([A-Za-z0-9-_\.]+)/im,
                            message: ct("invalid_instagram"),
                          },
                        })}
                        sx={
                          !max800
                            ? {
                                input: {
                                  color: "#fff",
                                  padding: "12px 0",
                                  textAlign: "center",
                                  fontSize: "20px",
                                  background: "rgba(41, 41, 41, 0.3)",
                                },
                                width: "100%",
                                maxWidth: "700px",
                              }
                            : {
                                input: {
                                  color: "#fff",
                                  padding: "7px 3px",
                                  textAlign: "center",
                                  fontSize: "15px",
                                  background: "rgba(41, 41, 41, 0.3)",
                                },
                                width: "100%",
                              }
                        }
                      />
                    </div>
                    <div className={s.personal__bottom}>
                      <button
                        className={s.personal__formSubmit}
                        disabled={isPending}
                        type="submit"
                      >
                        {isPending && (
                          <CircularProgress
                            size={20}
                            sx={{ color: "#73777B", marginRight: "10px" }}
                          />
                        )}{" "}
                        Submit
                      </button>
                      {success && (
                        <Alert variant="filled" severity="success">
                          Changes confirmed
                        </Alert>
                      )}
                    </div>
                    {error && (
                      <div style={{ display: "flex" }}>
                        <Alert variant="filled" severity="error">
                          Some error occurred. Try again later
                        </Alert>
                      </div>
                    )}
                  </form>
                </div>
              </section>
              <section className={s.bottom}>
                <div className={s.bottom__links}>
                  <Link href="https://www.instagram.com/uhistorynft/" passHref>
                    <a target="_blank">
                      <i
                        className={"bi bi-instagram" + " " + s.iconOnHover}
                        style={{ fontSize: "30px" }}
                      />
                    </a>
                  </Link>

                  <Link href="https://t.me/uhistorynft" passHref>
                    <a target="_blank">
                      <i
                        className={"bi bi-telegram" + " " + s.iconOnHover}
                        style={{ fontSize: "30px" }}
                      />
                    </a>
                  </Link>

                  <Link href="https://discord.gg/YhfRQvrEtE" passHref>
                    <a target="_blank">
                      <i
                        className={"bi bi-discord" + " " + s.iconOnHover}
                        style={{ fontSize: "30px" }}
                      />
                    </a>
                  </Link>

                  <Link
                    href="https://twitter.com/i/lists/1546545585632706561?t=rmbtytn7S4n_CSqhg67Z_A&s=09"
                    passHref
                  >
                    <a target="_blank">
                      <i
                        className={"bi bi-twitter" + " " + s.iconOnHover}
                        style={{ fontSize: "30px" }}
                      />
                    </a>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </main>
      </ThemeProvider>
    </MainLayout>
  );
};

const InitialProfile: React.FC = () => {
  const isAuthed = useAppSelector((state) => state.sign.isAuthed);

  return <Profile key={!isAuthed ? 0 : 1} />;
};

export default InitialProfile;
