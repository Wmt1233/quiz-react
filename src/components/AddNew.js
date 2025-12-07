import { Form, Input, Button } from 'antd';
import React from 'react';

const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
const tailFormItemLayout = { wrapperCol: { offset: 6, span: 16 } };

const AddNew = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // 这里可以添加 axios.post 调用后端添加接口
  };

  return (
      <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: '请输入密码!' }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: '请确认密码!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    );
  };
export default AddNew;