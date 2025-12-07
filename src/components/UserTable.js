import { Space, Table, message } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const columns = [
    { title: '序号', dataIndex: 'id', key: 'id' },
    { title: '用户名', dataIndex: 'userName', key: 'userName', render: (text) => <a>{text}</a> },
    { 
        title: '日期', 
        dataIndex: 'updateTime', 
        key: 'updateTime',
        render: (text) => text ? new Date(text).toLocaleString() : '',
    },
    {
        title: '操作',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>编辑</a>
                <a style={{color: 'red'}}>删除</a>
            </Space>
        ),
    },
];

const UserTable = () => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1, pageSize: 5, total: 0, showSizeChanger: false, position: ['bottomLeft']
    });
    const [loading, setLoading] = useState(false);

    const fetchData = (page = 1, pageSize = 5) => {
        setLoading(true);
        const token = localStorage.getItem('token'); // 获取Token

        axios
            .get(`http://localhost:8080/users?page=${page}&pageSize=${pageSize}`, {
                headers: { 'token': token } // 在请求头中携带Token
            })
            .then((response) => {
                const res = response.data;
                // 根据后端实际返回结构调整，这里假设结构为 {code:1, data: {row:[], total: 100}}
                if(res.data && res.data.row){
                    setData(res.data.row.map((item) => ({ key: item.id, ...item })));
                    setPagination((prev) => ({
                        ...prev, current: page, pageSize: pageSize, total: res.data.total,
                    }));
                }
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                message.error("获取数据失败");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize);
    }, []);

    const handleTableChange = (pag) => {
        fetchData(pag.current, pag.pageSize);
    };

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    );
};
export default UserTable;