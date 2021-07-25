import React from 'react';
import "./Login.scss";
import { Button, Input } from "../../components/common";
import { useForm } from "react-hook-form";
// import { useAppDispatch } from "../../redux/store";
// import { doLogin } from "../../redux";
// import { unwrapResult } from "@reduxjs/toolkit";
// import { EToken } from "../../constants";

type FormValues = {
  email: string;
  password: string;
};
export const Login = () => {
  // const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: any) => {
    // dispatch(doLogin(data))
    //   .then(unwrapResult)
    //   .then((res: IResLogin) => {
    //     if (res) {
    //       const token = res.access;
    //       window.localStorage.setItem(EToken.accessToken, token);
    //       window.location.reload;
    //     }
    //   });
  };
  return (
    <div className="register">
      <div className="register__image">
        <img
          src="https://www.cambly.com/fe/static/login_illustration_big.png"
          alt="signupimage"
        />
      </div>
      <form className="register__container" onSubmit={handleSubmit(onSubmit)}>
        <div className="register__form">
          <h3>Welcome back to Amitu!</h3>
          <p>Login with your email address</p>
          <Input placeholder="Email" {...register("email")} />
          <Input placeholder="Password" {...register("password")} />

          <Button width="100%" marginBottom={20} type="submit">
            Login
          </Button>
          <p>
            New to Amitu? <span className="signup">Sign up</span>
          </p>
        </div>
      </form>
    </div>
  );
};
