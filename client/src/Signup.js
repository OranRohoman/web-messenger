import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import AuthWrapper from "./components/Auth/AuthWrapper";
import { register } from "./store/utils/thunkCreators";
import  useStyles  from "./components/Auth/SharedStyles";




const Login = (props) => {
  const classes = useStyles();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid >

      <AuthWrapper
        Buttontext={"Login"} 
        GreyText={"Already have an account?"}
        RedirectPath={"/login"}>
        
        
        <form onSubmit={handleRegister} className={classes.formContent}>
            <Typography className={classes.header}>Create an Account.</Typography>
            
              <FormControl>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
                  className={classes.formInput}
                />
              </FormControl>
            
              <FormControl>
                <TextField
                  label="E-mail Address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                  className={classes.formInput}
                />
              </FormControl>
            
            
              <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                  className={classes.formInput}
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            
            
              <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  required
                  className={classes.formInput}
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            
            <Button type="submit" variant="contained" size="large" className={classes.submitButton}>
              Create
            </Button>
          
        </form>
        
      </AuthWrapper>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
