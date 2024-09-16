import { useState, useEffect } from 'react';
import { parseCSV } from './DataParser';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel
} from '@mui/material';
import JobLineChart from './LineChart';

const MainTable = () => {
    const [data, setData] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('year');

    useEffect(() => {
        parseCSV('/salaries.csv', (parsedData) => {
            const yearData = parsedData.reduce((acc, curr) => {
                const year = curr.work_year;
                const salary = parseFloat(curr.salary_in_usd);

                if (!acc[year]) {
                    acc[year] = { year, totalJobs: 0, totalSalary: 0 };
                }
                acc[year].totalJobs += 1;
                acc[year].totalSalary += salary;

                return acc;
            }, {});

            const tableData = Object.values(yearData).map((item) => ({
                year: item.year,
                totalJobs: item.totalJobs,
                avgSalary: (item.totalSalary / item.totalJobs).toFixed(2),
            }));

            setData(tableData);
        });
    }, []);

    const handleSort = (property) => {
        const isAscending = orderBy === property && order === 'asc';
        setOrder(isAscending ? 'desc' : 'asc');
        setOrderBy(property);

        const sortedData = [...data].sort((a, b) => {
            if (isAscending) {
                return a[property] < b[property] ? -1 : 1;
            } else {
                return a[property] > b[property] ? -1 : 1;
            }
        });

        setData(sortedData);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'year'}
                                    direction={orderBy === 'year' ? order : 'asc'}
                                    onClick={() => handleSort('year')}
                                >
                                    Year
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'totalJobs'}
                                    direction={orderBy === 'totalJobs' ? order : 'asc'}
                                    onClick={() => handleSort('totalJobs')}
                                >
                                    Total Jobs
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'avgSalary'}
                                    direction={orderBy === 'avgSalary' ? order : 'asc'}
                                    onClick={() => handleSort('avgSalary')}
                                >
                                    Average Salary (USD)
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.year}>
                                <TableCell>{row.year}</TableCell>
                                <TableCell>{row.totalJobs}</TableCell>
                                <TableCell>{row.avgSalary}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <JobLineChart data={data} />
        </>
    );
};

export default MainTable;
