import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "../../components/common";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      width: 400,
      marginBottom: 20,
    },
  },
}));

export const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className="signup-container">
      <div className="signup-image">
        <img
          src="https://www.cambly.com/fe/static/login_illustration_big.png"
          alt="sign up image"
        />
      </div>
      <form className={`${classes.root}  signup-form`}>
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

        <Button width={400} marginBottom={20}>
          Login
        </Button>

        <p>
          New to Amitu?{" "}
          <span className="signup" onClick={() => history.push("/sign-up")}>
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};
