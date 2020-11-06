import React, { FC } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { Done } from '@material-ui/icons';

interface DoneDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  text: string;
}

const DoneDialog: FC<DoneDialogProps> = ({ onClose, open, title, text }) => {

  return (
    <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
                <Done />
                {text}
          </DialogContentText>   
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default DoneDialog;