import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { UserOutlined, VideoCameraOutlined, LogoutOutlined } from '@ant-design/icons';
import SearchUser from './components/SearchUser';
import UserTable from './components/UserTable';
import QuestionTable from './components/QuestionTable';

const { Header, Footer, Sider, Content } = Layout;

const Admin = ({ onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '1.2rem' }}>Quiz管理系统</h1>
        <Button type="link" icon={<LogoutOutlined />} onClick={onLogout} style={{ color: 'white' }}>退出</Button>
      </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={({ key }) => setSelectedKey(key)}
            items={[
              { key: '1', icon: <UserOutlined />, label: '用户管理' },
              { key: '2', icon: <VideoCameraOutlined />, label: '题目管理' }
            ]}
          />
        </Sider>
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            {selectedKey === '1' && (
              <>
                <SearchUser />
                <UserTable />
              </>
            )}
            {selectedKey === '2' && (
               <QuestionTable />
            )}
          </div>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Quiz管理系统 ©2025 Created by tfzhang</Footer>
    </Layout>
  );
};

export default Admin;