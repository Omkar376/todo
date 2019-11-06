import React from "react";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import axios from "axios";
import Creatable from 'react-select/creatable';
import { Urls } from '../apiurls';

const FormItem = Form.Item;


class CustomForm extends React.Component {
  
  state = {
    bucket : this.props.bucket,
    description : this.props.description,
    done: this.props.done,
    selectedBucket : this.props.bucket
  };
  handleChange(){
    console.log(this.state.done);
    const doneStatus = this.state.done === undefined || this.state.done === null? this.props.done : this.state.done 
    this.setState({done:!doneStatus})
  };
  handleSelectChange = selectedOption => {
    this.setState({ selectedBucket : selectedOption.value });
  };
  getStatus(){  
    return this.state.done === undefined || this.state.done === null ? this.props.done : this.state.done
  }
  getBucket(){  
    return this.state.bucket === undefined ? this.props.bucket : this.state.bucket
  }

  getDescription(){  
    return this.state.description === undefined ? this.props.description : this.state.description
  }

  onChange = (selections) => {
    console.log("Change Handler 1 : Selected: ", selections);
    
    const newOptions = [].concat(this.state.options);
    
    selections.forEach(selection => {
      const match = this.state.options.find(
        entry => (entry.value === selection.value));
      if (!match) {
        newOptions.add(match);
      }
    });
    
    this.setState({
      val: [].concat(selections),
      options: newOptions
    });
  };

  handleFormSubmit = async (event, requestType, todoid) => {
    event.preventDefault();
    //const bucket= event.target.elements.bucket.value==undefined||event.target.elements.bucket.value=='' ? this.props.bucket : event.target.elements.bucket.value
    console.log(this.state.selectedBucket)
    const bucket= this.state.selectedBucket === undefined ? this.props.bucket : this.state.selectedBucket
    const description = event.target.elements.description.value===undefined||event.target.elements.description.value==='' ? this.props.description : event.target.elements.description.value
    const done = this.getStatus() 
    const postObj = {
      id:this.props.todoid,
      bucket: bucket,
      description: description,
      done : done
    }

    console.log(postObj)
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    };
    
    if (requestType === "post") {
      await axios.post(`${Urls.Todos.Post}`, postObj, {headers : headers})
        .then(res => {
          if (res.status === 201) {
           // this.props.history.push(`/todos`);
           window.location.reload()
          }
        })
    } else if (requestType === "put") {
      await axios.put(`${Urls.Todos.Put}`, postObj, {headers : headers})
        .then(res => {
          if (res.status === 200) {
            this.props.history.push(`/todos`);
          }
        })
    }
  };

  render() {
    return (
      <div>
        
        <Form
          onSubmit={event =>
            this.handleFormSubmit(
              event,
              this.props.requestType
              ,this.props.todoid
            )
          }
        >
          <br></br>
          <FormItem label="Bucket2">
          <Creatable onChange={this.handleSelectChange}
         // selectedValue={{ label: this.props.bucket, value: this.props.bucket }}
          //value={this.props.bucketList.filter(option => option.label === this.props.bucket)}
          placeholder = {this.props.bucket}
          options={this.props.bucketList}
          />
          </FormItem>
          <FormItem label="Description">
            <Input name="description" placeholder="Enter Description" defaultValue={this.getDescription()} />
          </FormItem>
          <FormItem label="Done">
            <Input name="done" ref="check_done" type="checkbox" value={this.state.done} checked={this.getStatus()} onChange={this.handleChange.bind(this)}>
              </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              {this.props.btnText}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(CustomForm);
