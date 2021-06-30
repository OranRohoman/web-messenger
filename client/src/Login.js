import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  
  Typography,
  Button,
  FormControl,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import AuthWrapper from "./components/Auth/AuthWrapper";
import  useStyles  from "./components/Auth/SharedStyles";


const Login = (props) => {
  
  const { user, login } = props;
  const classes = useStyles();
  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }
  const forgotPassword= () =>{
    alert("TODO implement a password forgot feature.");
  }
  return (
    <Grid >
      <AuthWrapper 
       Buttontext={"Create Account"} 
       GreyText={"Dont have an account?"}
       RedirectPath={"/register"}>
      
      
        <form onSubmit={handleLogin} className={classes.formContent}>
          <Typography className={classes.header}>Welcome Back!</Typography>
          <FormControl margin="normal" required>
            <TextField
              aria-label="username"
              label="Username"
              name="username"
              type="text"
            />
          </FormControl>
          <FormControl margin="normal" required>
            <TextField
              label="Password"
              aria-label="password"
              type="password"
              name="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" onClick={forgotPassword}>
                        <span className={classes.passwordForgot}>Forgot?</span>
                    </InputAdornment>
                  )}}
            />            
          </FormControl>
          
          <Button type="submit" variant="contained" size="large" className={classes.submitButton}>
              Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
