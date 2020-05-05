/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles(()=>({
    footer: {
      position: "absolute",
      left: "0",
      right: "0",
      bottom: "0",
      height: "60px",
      borderTop: "1px solid #e4eaec",
      padding: "0px",
      zIndex: 109,
      // fontSize: .875rem,
      
      },
      footer1: {
        bottom: "0",
        borderTop: "1px solid gray" ,
        padding: "15px 0",
      },
      left:{
          float:"left",
        display: "block"
      },
      right: {
        padding: "15px 0",
        margin: "0",
        fontSize: "14px",
        textAlign: "center"
      },
      block:{
          color:"inherit",
          padding: "15px",
          textTransform: "uppercase",
          borderRadius: "3px",
          textDecoration: "none",
          position: "relative",
        //   fontWeight: "500",
        fontSize: "12px",
        display: "block"
      }
   
}));

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div >
        
        <p className={classes.right}>
          <span>
            &copy; {new Date().getFullYear()}{" "}
          
            React Admin
          </span>
        </p>
      </div>
    </footer>
  );
}
