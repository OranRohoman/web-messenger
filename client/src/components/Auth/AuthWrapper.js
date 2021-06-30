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


const useStyles = makeStyles((theme) => ({
    customButton:{
        color:"#3A8DFF",
        padding:"12px 42px",
        textAlign:"center"
    },
    rightSide:{
        display:"flex",
        flexDirection: 'column',
        alignItems: 'center',
        
    },
    authHeader:{
        width:"90%",

        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        gap:'10%',
        alignItems: 'center',
        marginTop: '10%',
        backgroundColor:"white",
        [theme.breakpoints.down('sm')]:{
            width:"90%",
            height:"10%",
            justifyContent:"center",
            
            
        },
    },
    image:{
        width: "100%",
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        
        
        display:'flex',
        justifyContent: 'center',
        flexDirection:'column',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',  
    },
    
    greyText:{
        color:'#B0B0B0',
    },
    formStyle:{
        display: 'flex',
        justifyContent: 'space-evenly',
        width:'100%',
    },
    chatImg:{
        marginBottom:'30px',
    },

    
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
            className={classes.image} 
            style={{
                backgroundImage: `linear-gradient(to bottom,rgb(58, 141, 255,0.85), rgb(134, 185, 255,0.85)), url(${bjImg})`,            
            }}
            >
            <img src={chatImg} className={classes.chatImg} alt=""/>
            <Typography variant="h5" >
                Converse With anyone
            </Typography>
            <Typography variant="h5" >
                with any language
            </Typography>
            
            </Grid>
        </Hidden>
        <Grid 
        className={classes.rightSide}
        container  
        item xs={12} sm={9} md={7} 
        >
            <Grid className={classes.authHeader}>
                <Typography className={classes.greyText}>{GreyText}</Typography>
                <Button onClick={() => history.push(RedirectPath)}
                    variant="outlined"
                    component={Paper}
                    elevation={1}
                    size="large"
                    className={classes.customButton}
                >{Buttontext}</Button>
            </Grid>
            <Grid className={classes.formStyle}>
                
                {props.children}
            </Grid>
        </Grid>
    </Grid>
        
    )
}

export default AuthWrapper;
