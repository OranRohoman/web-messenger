import React from 'react'
import {
    Grid,
    Typography,
    Button,
    Paper,
    Hidden,

  } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import chatImg from '../../assets/chatImg.svg';
import bjImg from '../../assets/bg-img.png';
import { useHistory } from "react-router-dom";
import './AuthWrapper.css';


const useStyles = makeStyles((theme) => ({
    customButton:{
        color:"#3A8DFF",
        padding:"12px 42px",
        textAlign:"center"
      }
    
}));
const AuthWrapper = (props) => {
    const classes = useStyles();
    
    const { Buttontext , GreyText, RedirectPath} = props;
    const history = useHistory();


    return (
    <Grid container component="main" style={{height:"100vh"}}>
        <Hidden only="xs">
            <Grid 
            item  sm={3} md={5} 
            className="image" 
            style={{
                backgroundImage: `linear-gradient(to bottom,rgb(58, 141, 255,0.85), rgb(134, 185, 255,0.85)), url(${bjImg})`,            
            }}
            >
            <img src={chatImg} className="chatImg" alt=""/>
            <Typography variant="h5" className="text">
                Converse With anyone
            </Typography>
            <Typography variant="h5" className="text">
                with any language
            </Typography>
            
            </Grid>
        </Hidden>
        <Grid 
        className="rightSide"
        container  
        item xs={12} sm={9} md={7} 
        >
            <Grid className="authHeader">
                <Typography className="greyText">{GreyText}</Typography>
                <Button onClick={() => history.push(RedirectPath)}
                    variant="outlined"
                    component={Paper}
                    elevation={1}
                    size="large"
                    className={classes.customButton}
                >{Buttontext}</Button>
            </Grid>
            <Grid className="formStyle">
                
                {props.children}
            </Grid>
        </Grid>
    </Grid>
        
    )
}

export default AuthWrapper;
