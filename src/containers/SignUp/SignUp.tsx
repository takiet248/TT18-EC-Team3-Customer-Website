import React, { useEffect } from "react";
import "./SignUp.scss";
import { Button, Input } from "../../components/common";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/store";
import { doRegister } from "../../redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { EToken } from "../../constants";
// import { doRegister } from "../../redux/actions/userActions";

type FormValues = {
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  gender: number;
  DOB: string;
};

export const SignUp = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setValue("gender", 1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const { register, handleSubmit, setValue } = useForm<FormValues>();
  const onSubmit = (data: any) => {
    dispatch(doRegister(data))
      .then(unwrapResult)
      .then((res: IResLogin) => {
        if (res) {
          const token = res.access;
          window.localStorage.setItem(EToken.accessToken, token);
          window.location.replace("/");
        }
      });
  };

  return (
    <div className="register">
      <div className="register__image">
        <img
          src="https://www.cambly.com/fe/static/signup_illustration.png"
          alt="signupimage"
        />
      </div>
      <form className="register__container" onSubmit={handleSubmit(onSubmit)}>
        <div className="register__form">
          <h3>Start learning with your favorite tutors in our platform now!</h3>
          <p>Sign up with your email address</p>
          <Input placeholder="Name" {...register("name")} required />
          <Input
            placeholder="Email"
            {...register("email")}
            required
            type="email"
          />
          <Input
            placeholder="Password"
            {...register("password")}
            type="password"
            required
          />
          <Input placeholder="Phone" {...register("phone")} required />
          <Input placeholder="Address" {...register("address")} required />
          <Input placeholder="Date of birth" {...register("DOB")} required />

          <Button width="100%" marginBottom={20} type="submit">
            Sign Up
          </Button>
          <p>
            Already have an account?{" "}
            <span className="login" onClick={() => history.push("/login")}>
              Log in
            </span>
          </p>
          <p>
            By creating an account, you agree to our <span>User Agreement</span>{" "}
            and <span>Privacy Policy</span>.
          </p>
        </div>
      </form>
    </div>
  );
};
