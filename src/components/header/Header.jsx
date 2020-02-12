import React from 'react';
import {createUseStyles} from 'react-jss';
// import logo from './logo.svg';

const useStyles = createUseStyles({
  bold: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export function SqHeader() {
  const classes = useStyles();
  return (
    <header>
      <h1 className={classes.bold}>squire</h1>
    </header>
  );
};