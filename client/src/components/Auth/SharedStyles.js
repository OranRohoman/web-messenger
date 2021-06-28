import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  submitButton:{
    backgroundColor:"#3A8DFF",
    color:"#FFFFFF",
    padding:"12px 24px",
    marginLeft:"35%",
    width:"35%"
  },
  header:{

    fontWeight:"bold",
    fontSize:30,
    fontFamily:"Open Sans"
  },
  formheader:{
    fontSize:"small",
    color:"#B0B0B0",
  },
  formContent:{
    display:"flex",
    width:"100%",
    height:"100%",
    flexDirection:"column",
    justifyContent:"space-evenly",
    margin:theme.spacing(15),
    marginLeft:"10%",

  },
  formInput:{
    width:"100%",
    fontSize:"900"
  
  
  },

  
}));


export default useStyles;
