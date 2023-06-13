import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Box, Button, styled } from '@mui/material';
import AddUser from './Add/AddUser';
import AddAdmin from './Add/AddAdmin';


const ColorButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: "#F8C544",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#f2b315",
  },
}));
export default function Customers({row,loader}) {
  const [open, setOpen] = React.useState(false);
  const [openA, setopenA] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickA = () => {
    setopenA(!openA);
  };
return (
    <React.Fragment>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap',my:4}}>
      <Title>Admins</Title>
      <ColorButton variant='contained' onClick={()=>handleClickA()}>Add New Admin</ColorButton>
      </Box>
      <AddAdmin open={openA} handleClick={handleClickA} loader={loader}/>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {row?.admins?.map((item,index)=>(
            <TableRow key={item?.id} sx={{cursor:'pointer'}}>
              <TableCell>{item?.user?.id}</TableCell>
              <TableCell>{item?.user?.username}</TableCell>
              <TableCell>{item?.user?.email}</TableCell>
              <TableCell>{item?.full_name}</TableCell>
              <TableCell>{item?.phone}</TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap',my:4}}>
      <Title>Admins</Title>
      <ColorButton variant='contained' onClick={()=>handleClick()}>Add New Customer</ColorButton>
      </Box>
      <AddUser open={open} handleClick={handleClick} loader={loader}/>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {row?.customers?.map((item,index)=>(
            <TableRow key={item?.id} sx={{cursor:'pointer'}}>
              <TableCell>{item?.user?.id}</TableCell>
              <TableCell>{item?.user?.username}</TableCell>
              <TableCell>{item?.user?.email}</TableCell>
              <TableCell>{item?.full_name}</TableCell>
              <TableCell>{item?.phone}</TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>

    </React.Fragment>
  );
}