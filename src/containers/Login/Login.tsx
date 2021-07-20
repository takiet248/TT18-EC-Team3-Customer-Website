import "./Login.scss";
import TextField from "@material-ui/core/TextField";
import { Button } from "../../components/common";
import { useHistory } from "react-router";

export const Login = () => {
  const history = useHistory();
  return (
    <div className="register">
      <div className="register__image">
        <img
          src="https://www.cambly.com/fe/static/login_illustration_big.png"
          alt="sign up image"
        />
      </div>
      <form className="register__container">
        <div className="register__form">
          <h3>Welcome back to Amitu!</h3>
          <p>Login with your email address:</p>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            name="email"
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            name="password"
          />

          <Button width="100%" marginBottom={20}>
            Login
          </Button>
          <p>
            New to Amitu?{" "}
            <span className="signup" onClick={() => history.push("/sign-up")}>
              Sign up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};
