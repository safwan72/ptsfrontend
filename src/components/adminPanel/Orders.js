import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import moment from "moment/moment";
import EditOrder from "./Edit/EditOrder";
export default function Orders({ row,loader }) {
  const [orderId, setorderId] = React.useState(null); 
  const [openEdit, setopenEdit] = React.useState(false);

  const handleClickEddit = () => {
    setopenEdit(!openEdit);
  };

  return (
    <React.Fragment>
      <Title>MyOrders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Order Status</TableCell>
            <TableCell>Payment</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row?.map((item, index) => (
            <TableRow key={item?.id} sx={{cursor:'pointer'}} onClick={()=>{
              setorderId(item?.id);
              handleClickEddit();
              }}>
              <TableCell>{item?.id}</TableCell>
              <TableCell>{moment(item?.ordered_date).format("LL")}</TableCell>
              <TableCell>{item?.user?.user?.username}</TableCell>
              <TableCell>{item?.order_status}</TableCell>
              <TableCell>{item?.delivered ? "True" : "False"}</TableCell>
              <TableCell align="right">{`${item?.total_price_after_discount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {orderId?(
                  <EditOrder open={openEdit} handleClick={handleClickEddit} loader={loader} id={orderId}/>
      ):""}
    </React.Fragment>
  );
}
