import "./SignUp.scss";
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

export const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className="signup-container">
      <div className="signup-image">
        <img
          src="https://www.cambly.com/fe/static/signup_illustration.png"
          alt="sign up image"
        />
      </div>
      <form className={`${classes.root}  signup-form`}>
        <h3>Start learning with your favorite tutors in our platform now!</h3>
        <p>Sign up with your email address:</p>
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
      </form>
    </div>
  );
};
