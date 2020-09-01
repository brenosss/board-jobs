import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import { styles } from './components/Style'
import { FormSelect } from './components/FormSelect'
import { TableJobs } from './components/TableJobs'
import { Loader } from './components/Loader'

class Main extends React.Component {
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
export default withStyles(styles)(Main);
