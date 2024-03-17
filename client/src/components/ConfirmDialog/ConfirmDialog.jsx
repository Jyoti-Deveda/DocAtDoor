import Style from "./ConfirmDialog.module.css";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { forwardRef, useEffect, useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import SectionSubHeading from "../Headings/SectionSubHeading/SectionSubHeading";

/* eslint-disable */

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const ConfirmDialog = ({
  heading = "Please Confirm",
  question,
  action,
  open,
  setOpen
}) => {

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    action();
    handleClose();
  }


  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [open])

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className={Style.container}
      >
      

        <DialogTitle className={Style.heading}>
          {/* <SectionSubHeading title={heading} /> */}
          {heading}
        </DialogTitle>


        <DialogContent className={`font-lg text-gray`}>
          {question}
        </DialogContent>


        <DialogActions>

          <CustomButton
            variant="outlined"
            color="primary"
            size="xsmall"
            onClick={handleClose}
            boxShadow={false}
          >
            No
          </CustomButton>

          <CustomButton
            size="xsmall"
            variant="contained"
            color="primary"
            onClick={handleConfirm}
          >
            Yes
          </CustomButton>

        </DialogActions>
      </Dialog>
    </>
  )
}
/* eslint-enable */
export default ConfirmDialog