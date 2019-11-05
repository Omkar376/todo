import React from "react";
import { List, Avatar } from "antd";

const Todos = props => {
  return (
    <List
      itemLayout="vertical"
      size="medium"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 10
      }}
      dataSource={props.data}
      renderItem={item => (
        <List.Item
          key={item.id} 
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={`/todos/${item.id}`}>{item.bucket} : {item.description}</a>}
          />
          
        </List.Item>
      )}
    />
  );
};

export default Todos;
