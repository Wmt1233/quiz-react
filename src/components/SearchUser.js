import { Input, Space, Button, Modal } from 'antd';
import React, { useState } from 'react';
import AddNew from './AddNew';

const { Search } = Input;
const onSearch = (value) => console.log(value);

const SearchUser = () => {
  const [open, setOpen] = useState(false);

  return (
    <Space direction="horizontal" style={{ marginBottom: 16 }}>
      <Search
        placeholder="请输入用户名"
        allowClear
        enterButton="查询用户"
        size="middle"
        onSearch={onSearch}
      />
      <Button type="primary" onClick={() => setOpen(true)}>添加用户</Button>
      
      <Modal
        title="添加用户"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null} // 隐藏默认的确定/取消按钮，使用Form内部的提交
      >
        <AddNew />
      </Modal>
    </Space>
  );
}
export default SearchUser;