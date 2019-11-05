import React from "react";
import axios from "axios";
import Todos from "../components/Todo";
import CustomForm from "../components/Form";


class TodoList extends React.Component {
  state = {
    todos: [],
    bucketList : []
  };



  fetchTodolist = () => {
    const headers = {
      "Content-Type": "application/json",
     // Authorization: `Token ${this.props.token}`
     Authorization: `Token ${localStorage.getItem("token")}`
      //Authorization: 'Token 439b7f2095fcaa75bbbd4de214638f7bf3987cbf'
    };
    console.log(localStorage.getItem('token') != null)
    axios.get("http://127.0.0.1:8000/todos/", {
      headers : headers 
    }).then(res => {
      this.setState({
        todos: res.data
      });
    });
    axios.get(`http://127.0.0.1:8000/buckets/` ,{headers:headers}).then(res => {
      this.setState({
        bucketList: res.data
      });
    });
  }

  componentDidMount() {
    this.fetchTodolist();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      this.fetchTodolist();      
    }
  }

  render() {
    return (
      <div>
        <h2> Add a todo item </h2>
        <CustomForm requestType="post" 
        done={false} 
        todoID={null}
        token= {localStorage.getItem("token")}
        btnText="Create"
        bucket="default"  
        bucketList={this.state.bucketList}/>
        <h2> Todo list({this.state.todos.length})</h2>
        <h2>Bucket: Description</h2>

        <Todos data={this.state.todos} /> <br />
       
      </div>
    );
  }
}

export default TodoList;
