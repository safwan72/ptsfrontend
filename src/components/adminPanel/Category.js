import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Box, Button, styled } from "@mui/material";
import AddCategory from "./Add/AddCategory";
import EditCategory from "./Edit/EditCategory";

const ColorButton = styled(Button)(({ theme }) => ({
  color: "black",
  backgroundColor: "#F8C544",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#f2b315",
  },
}));
export default function Category({ row, loader }) {
  const [open, setOpen] = React.useState(false);
  const [categoryId, setcategoryId] = React.useState(null);

  const handleClick = () => {
    setOpen(!open);
  };
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
        <Title>Category</Title>
        <ColorButton variant="contained" onClick={() => handleClick()}>
          Add New Category
        </ColorButton>
      </Box>
      <AddCategory open={open} handleClick={handleClick} loader={loader} />{" "}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Active Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row?.map((item, index) => (
            <TableRow key={item?.id} sx={{cursor:'pointer'}} onClick={()=>{
              setcategoryId(item?.id);
              handleClickEddit();
              }}>
              <TableCell>{item?.id}</TableCell>
              <TableCell>{item?.name}</TableCell>
              <TableCell>{item?.isActive ? "True" : "False"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
          {
            categoryId?(
              <EditCategory open={openEdit} handleClick={handleClickEddit} loader={loader} id={categoryId}/>
            ):""
          }
    </React.Fragment>
  );
}
