import { Space, Table } from 'antd';
import React from 'react';

const columns = [
    { title: '序号', dataIndex: 'id', key: 'id' },
    { title: '题目', dataIndex: 'question', key: 'question' },
    { title: '选项', dataIndex: 'options', key: 'options', render: (options) => options.join(', ') },
    { title: '答案', dataIndex: 'answer', key: 'answer' },
    {
        title: '操作',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>编辑</a>
                <a>删除</a>
            </Space>
        ),
    },
];

const data = [
    { key: '1', id: '1', question: '什么是React？', options: ['A. 库', 'B. 框架'], answer: 'A' },
    { key: '2', id: '2', question: 'React Hook?', options: ['A. useState', 'B. class'], answer: 'A' },
];

const QuestionTable = () => (
    <Table columns={columns} dataSource={data} />
);
export default QuestionTable;