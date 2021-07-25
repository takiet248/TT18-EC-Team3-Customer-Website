import React from 'react';
import "./SignUp.scss";
import { Button, Input } from "../../components/common";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
// import { doRegister } from "../../redux/actions/userActions";

type FormValues = {
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  gender: boolean;
  DOB: string;
};
export const SignUp = () => {
  const history = useHistory();

 
  const {
    register,
    handleSubmit,
  } = useForm<FormValues>();
  const onSubmit = (data: any) => {
    console.log(data);
    // dispatch(
    //   doRegister(
    //     getValues("name"),
    //     getValues("email"),
    //     getValues("password"),
    //     getValues("phone"),
    //     getValues("address"),
    //     getValues("gender"),
    //     getValues("DOB")
    //   )
    // );
    
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
          <Input placeholder="Name" {...register("name")} />
          <Input placeholder="Email" {...register("email")} />
          <Input placeholder="Password" {...register("password")} />
          <Input placeholder="Phone" {...register("phone")} />
          <Input placeholder="Address" {...register("address")} />
          <Input placeholder="Day of birth" {...register("DOB")} />
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
