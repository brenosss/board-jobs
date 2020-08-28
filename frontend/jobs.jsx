import React from 'react';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    textTransform: 'capitalize'
  },
  menuItem:{
    textTransform: 'capitalize'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  progress: {
    'text-align': 'center',
    'padding-top': '20px',
  }
})

const useStyle = makeStyles(styles)

function FormSelect({name, choices, value, handleChange}) {
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
function Loader({isLoaded}) {
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
function TableContent({rows, search}){
  return (
    rows.map((row) => (
      <TableRow key={row.id}>
        <TableCell component="th" scope="row"> {row.title}</TableCell>
        <TableCell>{row.company}</TableCell>
        <TableCell>{row.type}</TableCell>
        <TableCell>{row.location}</TableCell>
      </TableRow>
    ))
  )
}
function TableJobs({rows}){
  const headerCells = ['Title', 'Company', 'Type', 'Location']
  const classes = useStyle()
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headerCells.map(headerCell => (
              <TableCell key={headerCell}>{headerCell}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableContent rows={rows}/>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
class JobsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      city: 'all',
      technology: 'all',

    };
    this.classes = props.classes
    this.handleChange = this.handleChange.bind(this);

    this.cityOptionsSelect = {
      name: 'city',
      choices: ['all', 'chicago', 'san francisco', 'phoenix', 'london', 'beijing', 'paris'],
      handleChange: this.handleChange
    }
    this.technologyOptionsSelect = {
      name: 'technology',
      choices: ['all', 'javascript', 'java', 'python', 'react', 'ruby', 'go'],
      handleChange: this.handleChange
    }
  }

  componentDidMount() {
    this.fetchComponent()
  }
  fetchComponent(){
    fetch("http://127.0.0.1:8000/jobs")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  handleChange(event){
    const name = event.target.name
    this.setState(
      {[name]: event.target.value, isLoaded: false },
      () => {this.fetchComponent()}
    )
  };
  render(){
    return (
      <div>
        <FormSelect
          value={this.state.city}
          {...this.cityOptionsSelect}
        />
        <FormSelect
          value={this.state.technology}
          {...this.technologyOptionsSelect}
        />
        <TableJobs rows={this.state.items}/>
        <Loader isLoaded={this.state.isLoaded}/>
      </div>
    );
  }
}
export default withStyles(styles)(JobsTable);
