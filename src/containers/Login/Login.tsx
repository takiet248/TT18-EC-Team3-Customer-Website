import "./Login.scss";
import { Button, Input } from "../../components/common";
import { useForm } from "react-hook-form";
import { doLogin } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

type FormValues = {
  email: string;
  password: string;
};
export const Login = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, getValues } = useForm<FormValues>();
  const token = localStorage.getItem("access");


  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(doLogin(getValues("email"), getValues("password")));
  };
  return (
    <div className="register">
      <div className="register__image">
        <img
          src="https://www.cambly.com/fe/static/login_illustration_big.png"
          alt="sign up image"
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
