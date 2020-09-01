import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { styles } from './Style'

const useStyle = makeStyles(styles)

export function FormSelect({name, choices, value, handleChange}) {
  const classes = useStyle()
  return(
    <FormControl className={classes.formControl}>
      <InputLabel id={`${name}-select-label`}>{name}</InputLabel>
      <Select
        labelId={`${name}-select-label`}
        id={`${name}-select`}
        onChange={handleChange}
        name={name}
        value={value}
      >
      {choices.map((choice) => (
        <MenuItem className={classes.menuItem} key={choice} value={choice}>{choice}</MenuItem>
      ))}
      </Select>
    </FormControl>
  )
}
