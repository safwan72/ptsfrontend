import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Box, Button, Typography, styled } from "@mui/material";
import AddDishModal from "./Add/AddDishModal";
import EditDish from "./Edit/EditDish";

const ColorButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: "#F8C544",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#f2b315",
  },
}));

export default function Menu({ row, loader }) {
  const [open, setOpen] = React.useState(false);
  
  const handleClick = () => {
    setOpen(!open);
  };
  const [dishId, setdishId] = React.useState(null); 
  const [openEdit, setopenEdit] = React.useState(false);

  const handleClickEddit = () => {
    setopenEdit(!openEdit);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          mb: 4,
        }}
      >
        <Title>Menu</Title>
        <ColorButton variant="contained" onClick={() => handleClick()}>
          Add New Dish
        </ColorButton>
      </Box>
      <AddDishModal open={open} handleClick={handleClick} loader={loader} />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Featured</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Discount</TableCell>
            <TableCell align="right">New Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row?.map((item, index) => (
            <TableRow key={item?.id} sx={{cursor:'pointer'}} onClick={()=>{
            setdishId(item?.id);
            handleClickEddit();
            }}>
              <TableCell>{item?.id}</TableCell>
              <TableCell>{item?.dish_name}</TableCell>
              <TableCell>
                {item?.dish_category?.map((item, index) => (
                  <Box key={index}>
                    <Typography variant="caption">{item?.name},</Typography>
                    <br />
                  </Box>
                ))}
              </TableCell>
              <TableCell>{item?.featured ? "True" : "False"}</TableCell>
              <TableCell>{item?.price}</TableCell>
              <TableCell>{item?.discount}</TableCell>
              <TableCell align="right">{item?.new_price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {dishId?(
                  <EditDish open={openEdit} handleClick={handleClickEddit} loader={loader} id={dishId}/>
      ):""}
    </React.Fragment>
  );
}
