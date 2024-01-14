import React from 'react';
import { useTable } from 'react-table';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Select, Button, Heading } from '@chakra-ui/react';

const OrderManager = () => {
    // Mock data for demonstration purposes
    const data = React.useMemo(
        () => [
            { id: 1, products: 'Product A', quantity: 2, price: 20, address: '123 Street, City', status: 'Pending' },
            { id: 2, products: 'Product B', quantity: 1, price: 30, address: '456 Street, City', status: 'Delivered' },
            // ... add more rows as needed
        ],
        [],
    );

    const columns = React.useMemo(
        () => [
            { Header: 'ID', accessor: 'id' },
            { Header: 'Products', accessor: 'products' },
            { Header: 'Quantity', accessor: 'quantity' },
            { Header: 'Price', accessor: 'price' },
            { Header: 'Address', accessor: 'address' },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ row }) => (
                    <Select defaultValue={row.values.status} variant="outline">
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                    </Select>
                ),
            },

            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => (
                    <Button onClick={() => handleUpdate(row.values.id)} colorScheme="teal" size="sm">
                        Update
                    </Button>
                ),
            },
        ],
        [],
    );

    const handleUpdate = (orderId) => {
        console.log(`Update order with ID: ${orderId}`);
    };

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <Box p={4}>
            <Heading fontSize={30} mb={4}>
                Order Manager
            </Heading>
            <Table {...getTableProps()} variant="striped" colorScheme="teal" size="sm">
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column) => (
                                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map((cell, index) => (
                                    <Td {...cell.getCellProps()} key={index}>
                                        {cell.render('Cell')}
                                    </Td>
                                ))}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </Box>
    );
};

export default OrderManager;
