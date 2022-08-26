import './Emergency.css'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';
import CallIcon from '@mui/icons-material/Call';
import Collapse from '@mui/material/Collapse';
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';

const rows = [
    {
        department: 'National Emergency Number',
        phone: 112,
        icon: CallIcon
    },
    {
        department: 'Disaster Management Service',
        phone: 108,
        icon: CallIcon
    },
    {
        department: 'Ambulance',
        phone: 102,
        icon: CallIcon
    },
    {
        department: 'Fire',
        phone: 101,
        icon: CallIcon
    },
    {
        department: 'Police',
        phone: 100,
        icon: CallIcon
    }
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1976d2',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#d9e2f3',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


const card = (
    <React.Fragment>
        <CardContent>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: '30rem' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell sx={{ fontSize: '1.1rem' }}><strong>Department</strong></StyledTableCell>
                            <StyledTableCell sx={{ fontSize: '1.1rem' }} align="right"><strong>Phone Number</strong></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow
                                key={row.department}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {row.department}
                                </StyledTableCell>
                                <StyledTableCell align="right"><a href={`tel:${row.phone}`}>{row.phone}</a></StyledTableCell>
                                {/* /* <TableCell align="right">{row.icon}</TableCell> */}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </CardContent>
        <CardActions>
            For more information<Button size="small" href="https://indianhelpline.com/" target="_blank">click here</Button>
        </CardActions>
    </React.Fragment>
);



export default function Emergency() {
    return (
        <Box sx={{ maxWidth: '40rem' }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}