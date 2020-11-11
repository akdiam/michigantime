import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 0,
  },
  paper: {
    color: 'white',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ConflictModal( {hasConflict, resolveConflict, oldClass, newClass, updatePinsOnSched} ) {
    const classes = useStyles();
    return (
    <div>
        <Modal
        aria-labelledby="conflict-detected"
        aria-describedby="make-the-choice"
        className={classes.modal}
        open={hasConflict} // hasConflict and class name and type in TypeAccordian are the same as old class or new class
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
        >
        <Fade in={hasConflict}>
            <div className={classes.paper}>
            <h1 id="transition-modal-title">Oops! A conflict was detected in your schedule.</h1>
            <p id="transition-modal-description">
              {'Would you like to replace ' + oldClass['ClassName'] + ' ' + oldClass['Type'] + ' ' + oldClass['Section'] + 
              ' with ' + newClass['ClassName'] + ' ' + newClass['Type'] + ' ' + newClass['Section'] + '?'}
            </p>
            <Button
            onClick={() => {
              resolveConflict(oldClass, newClass, false);
              updatePinsOnSched(oldClass);
            }}>
              Yes
            </Button>
            <Button
            onClick={() => {
              resolveConflict(oldClass, newClass, true);
              updatePinsOnSched(newClass);
            }}>
              No
            </Button>
            </div> 
        </Fade>
        </Modal>
    </div>
    );
}