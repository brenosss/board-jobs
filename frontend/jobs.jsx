import React from 'react';
import { withStyles } from "@material-ui/core/styles";
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

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
});

class JobsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      city: {}

    };
    this.classes = props.classes
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetch_jobs()
  }

  fetch_jobs(){
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
    this.setState({city: event.target.value, isLoaded: false});
    this.fetch_jobs()
  };


  render_forms(){
    return(
      <FormControl className={this.classes.formControl}>
        <InputLabel id="city-select-label">City</InputLabel>
        <Select
          labelId="city-select-label"
          id="city-select"
          onChange={this.handleChange}
        >
          <MenuItem value={'chicago'}>Chicago</MenuItem>
          <MenuItem value={'san francisco'}>San Francisco</MenuItem>
          <MenuItem value={'phoenix'}>Phoenix</MenuItem>
        </Select>
      </FormControl>
    )
  }
  render_table_body(){
    return (
      this.state.items.map((row) => (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row"> {row.title}</TableCell>
          <TableCell>{row.company}</TableCell>
          <TableCell>{row.type}</TableCell>
          <TableCell>{row.location}</TableCell>
        </TableRow>
      ))
    )
  }
  render_progress(){
    if (this.state.isLoaded == false){
      return(
        <div className={this.classes.progress}>
          <CircularProgress />
        </div>
      )
    }
  }
  render(){
    return (
      <div>
        {this.render_forms()}
        <TableContainer component={Paper}>
          <Table className={this.classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.render_table_body()}
            </TableBody>
          </Table>
        </TableContainer>
        {this.render_progress()}
      </div>
    );
  }
}
export default withStyles(styles)(JobsTable);
