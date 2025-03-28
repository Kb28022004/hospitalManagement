import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Papa from 'papaparse';
import './BulkUpload.css';


const BulkUpload = () => {
  const [file, setFile] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const generateCSV = () => {
    const csvData = [
      ["hospitalId", "hospitalName", "email", "contact", "address", "hospitalType", "establishedYear", "departments"],
      ["HOS123", "Apollo Hospital", "apollo@gmail.com", "9876543210", "Delhi", "Cancer Hospital", "1990", "Cardiology, Neurology"],
      ["HOS456", "Fortis Hospital", "fortis@gmail.com", "9876509876", "Mumbai", "General Hospital", "1985", "Orthopedic, ENT"]
    ];

    const csvContent = csvData.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "hospitals_template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    Papa.parse(uploadedFile, {
      complete: function (results) {
        const rows = results.data.slice(1); 
        const formattedHospitals = rows.map(row => ({
          hospitalId: row[0],
          hospitalName: row[1],
          email: row[2],
          contact: row[3],
          address: row[4],
          hospitalType: row[5],
          establishedYear: row[6],
          departments: row[7]?.split(",") || []
        }));
        setHospitals(formattedHospitals);
      },
      header: false
    });
  };

  const handleOpenDialog = () => {
    if (!file) {
      alert("Please upload a CSV file first!");
      return;
    }
    setOpenDialog(true);
  };

  // Close Dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  const handleSubmit = async () => {
    if (!file) return alert("Please upload a CSV file first!");

    try {
      const response = await fetch("http://localhost:8000/api/v1/hospital/bulk/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hospitals })
      });

      const data = await response.json();
      if (data.success) alert("Hospitals uploaded successfully!");
      else alert("Error: " + data.message);
    } catch (error) {
      alert("Error uploading hospitals: " + error.message);
    }
  };

  return (
    <div className='bulkUploadMainContainer'>
      <div className="bulkUpload-section-1">
        <Button onClick={generateCSV}>Generate CSV File</Button>
        <div>
          <VisibilityOutlinedIcon fontSize='large' sx={{ color: "white", cursor: "pointer" }} onClick={handleOpenDialog} />
        </div>
      </div>
      <div className="bulkUpload-section-2">
        <label>Upload CSV*</label>
        <input type="file" accept=".csv" onChange={handleFileChange} />
      </div>
      <div className="bulkUpload-section-3">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Uploaded CSV Data</DialogTitle>
        <DialogContent>
          {hospitals.length > 0 ? (
            <table border="1" width="100%">
              <thead>
                <tr>
                  <th>Hospital ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Type</th>
                  <th>Year</th>
                  <th>Departments</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital, index) => (
                  <tr key={index}>
                    <td>{hospital.hospitalId}</td>
                    <td>{hospital.hospitalName}</td>
                    <td>{hospital.email}</td>
                    <td>{hospital.contact}</td>
                    <td>{hospital.address}</td>
                    <td>{hospital.hospitalType}</td>
                    <td>{hospital.establishedYear}</td>
                    <td>{hospital.departments.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available. Please upload a valid CSV file.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BulkUpload;
