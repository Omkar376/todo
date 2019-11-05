import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button} from "antd";
import CustomForm from "../components/Form";


class TodoDetail extends React.Component {
  state = {
    todo: {},
    bucketList: []
  };

  componentDidMount() {
    const todoid = this.props.match.params.todoid;
    console.log(localStorage.getItem("token"))
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`
    };
    axios.get(`http://127.0.0.1:8000/details/?id=${todoid}` ,{headers:headers}).then(res => {
      this.setState({
        todo: res.data[0]
      });
    });
    axios.get(`http://127.0.0.1:8000/buckets/` ,{headers:headers}).then(res => {
      this.setState({
        bucketList: res.data
      });
    });
  }

  handleDelete = event => {
    
    event.preventDefault();
    const todoid = this.props.match.params.todoid;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`
     // Authorization: 'Token 439b7f2095fcaa75bbbd4de214638f7bf3987cbf'
    };
    axios.delete(`http://127.0.0.1:8000/delete/?id=${todoid}` ,{headers:headers})
    .then(res => {
      if (res.status === 200 ||res.status === 204) {
        this.props.history.push(`/todos`);
      }
    })
  };

  render() {
    return (
      <div>
        <h2>Todo item</h2>
        <br></br>
        <form onSubmit={this.handleDelete}>
          <Button type="danger" htmlType="submit">           
            Delete
          </Button>
        </form>
        <CustomForm
          {...this.props}
          token={this.props.token}
          requestType="put"
          todoid={this.props.match.params.todoid}
          btnText="Update"
          bucket={this.state.todo.bucket}
          description={this.state.todo.description}
          done={this.state.todo.done}
          bucketList={this.state.bucketList}
        />
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(TodoDetail);
