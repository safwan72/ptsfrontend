import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import moment from "moment/moment";
import EditFeedback from "./Edit/EditFeedback";
export default function Feedback({ row,loader }) {
  const [feedId, setfeedId] = React.useState(null); 
  const [openEdit, setopenEdit] = React.useState(false);

  const handleClickEddit = () => {
    setopenEdit(!openEdit);
  };
 const truncate=(str)=> {
    return str?.length > 10 ? str?.substring(0, 7) + "..." : str;
}
  return (
    <React.Fragment>
      <Title>Feedbacks</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Resolved</TableCell>
            <TableCell align="right">Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row?.map((item, index) => (
            <TableRow key={item?.id} sx={{cursor:'pointer'}} onClick={()=>{
                setfeedId(item?.id);
              handleClickEddit();
              }}>
              <TableCell>{item?.id}</TableCell>
              <TableCell>{item?.email}</TableCell>
              <TableCell>{moment(item?.added_at).format("LL")}</TableCell>
              <TableCell>{item?.phone}</TableCell>
              <TableCell>{item?.resolved ? "True" : "False"}</TableCell>
              <TableCell align="right">{truncate(item?.message)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {feedId?(
                  <EditFeedback open={openEdit} handleClick={handleClickEddit} loader={loader} id={feedId}/>
      ):""}
    </React.Fragment>
  );
}
