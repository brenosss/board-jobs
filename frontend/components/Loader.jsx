import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/core/styles";
import { styles } from './Style'

const useStyle = makeStyles(styles)

export function Loader({isLoaded}) {
  const classes = useStyle()
  if (isLoaded == false){
    return(
      <div className={classes.progress}>
        <CircularProgress />
      </div>
    )
  }
  return null
}
