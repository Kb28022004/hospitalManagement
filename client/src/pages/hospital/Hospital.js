import './Hospital.css'
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

import {
    Button,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
  } from "@mui/material";
import Loader from '../../helper/Loader';
import { useDeleteHospitalMutation, useDeleteHospitalQuery, useGetAllHospitalsQuery } from '../../feature/api/hospitalApi';
import { useEffect } from 'react';
import {toast} from 'react-hot-toast'

  const tableRowData = [
    "#",
    "Hospital Name",
    "Address",
    "Contact Number",
    "Email",
    "Hospital ID",
    "Hospital Type",
    "Established Year",
    "Action",
  ];

const Hospital = () => {

  const {data,isLoading,isError,error,isSuccess,refetch}=useGetAllHospitalsQuery()
  const [deleteHospital,{data:deleteData,isLoading:deleteLoading,isError:deleteIsError,error:deleteError,isSuccess:deleteSuccess}]=useDeleteHospitalMutation()

  const hospitalData=data?.data || []

  
  const handleDelete=async(id)=>{
try {
  await deleteHospital(id)
} catch (error) {
  console.log(error);
  
}
  }


    useEffect(() => {
      if(isError && error){
        toast.error(error?.data?.message)
      }
      if(deleteIsError && deleteError){
        toast.error(deleteError?.data?.message)
      }
      if(deleteSuccess && deleteData){
        toast.success(deleteData.message)
        refetch()
      }
    }, [isError, error, deleteIsError, deleteError, deleteSuccess, deleteData, refetch])
    
  return (
    <div className="hospitalDetailsMainContainer">
    <div className="hospitalDetails-container">
      {/* Upper Section */}
      <div className="upper-section--container">
        <p>Hospital Details</p>
        <Button
        component={NavLink}
        to='/addhospital'
         startIcon={<AddOutlinedIcon/>}
          variant="outlined"
          sx={{textTransform:"capitalize"}}
          className="addHospitalButton"
        >
          Add Hospital
        </Button>
      </div>

      {/* Table Section */}
      <div className="table-section-container">
        <TableContainer>
          <Table>
            {/* Table Head */}
            <TableHead>
              <TableRow>
                {tableRowData.map((header, index) => (
                  <TableCell key={index} style={{ fontWeight: "bold" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Table Body */}
            {isLoading ? (
              <Loader />
            ) : hospitalData.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <p>No hospitalData found</p>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {hospitalData.map((row, index) => (
                  <TableRow key={row._id}>
                    <TableCell sx={{ fontSize: "10.5px" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell sx={{ fontSize: "10px" }}>
                      {row.hospitalName}
                    </TableCell>
                    <TableCell sx={{ fontSize: "10.5px", width: "22%" }}>
                      {row.address}
                    </TableCell>
                    <TableCell sx={{ fontSize: "10.5px", width: "20%" }}>
                      {row.contact}
                    </TableCell>
                    <TableCell sx={{ fontSize: "10.5px", width: "20%" }}>
                      {row.email}
                    </TableCell>
                    <TableCell sx={{ fontSize: "10.5px", width: "20%" }}>
                      {row.hospitalId}
                    </TableCell>
                    <TableCell sx={{ fontSize: "10.5px" }}>
                      {row.hospitalType}
                    </TableCell>
                    <TableCell sx={{ fontSize: "10.5px" }}>
                      {row.establishedYear}
                    </TableCell>
                    <TableCell
                      style={{
                        display: "flex",
                        
                        cursor: "pointer",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <NavLink style={{ color: "black" }} to={`/edit-hospital/${row._id}`}>
                        <Tooltip title="Edit details">
                          <EditOutlinedIcon fontSize="small" />
                        </Tooltip>
                      </NavLink>
                     
                      <NavLink style={{ color: "black" }}>
                        <Tooltip title="Delete">
                          <DeleteOutlinedIcon
                          color='error'
                          onClick={()=>handleDelete(row._id)}
                            fontSize="small"
                          />
                        </Tooltip>
                      </NavLink>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>

      {/* Lower Section */}
      <div className="lower-section-container">
        <p>
          Showing entries
        </p>
       
          <Pagination
          
            
            shape="rounded"
            color="primary"
          />
     
      </div>
    </div>
  </div>
  )
}

export default Hospital