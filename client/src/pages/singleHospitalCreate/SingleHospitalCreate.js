import { Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import "./SingleHospitalCreate.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCreateHospitalMutation } from "../../feature/api/hospitalApi";
import toast from "react-hot-toast";
import LocationPicker from "../../components/LocationPicker";

const SingleHospitalCreate = () => {
  const { selectedFields: contextSelectedFields } = useOutletContext();

  const [inputFields, setInputFields] = useState({
    hospitalId: "",
    hospitalName: "",
    email: "",
    contact: "",
    hospitalType: "",
    address: "",
    establishedYear: "",
  });

  const [hospitalCertificate, setHospitalCertificate] = useState(null);
  const [selectedFields, setSelectedFields] = useState(
    JSON.parse(localStorage.getItem("selectedFields")) || contextSelectedFields
  );

  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("selectedFields", JSON.stringify(selectedFields));
  }, [selectedFields]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputFields((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    setHospitalCertificate(e.target.files[0]);
  };

  const [createHospital, { data, isLoading, isSuccess, isError, error }] =
    useCreateHospitalMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(inputFields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (hospitalCertificate) {
      formData.append("hospitalCertificate", hospitalCertificate);
    }

    try {
      await createHospital(formData);
    } catch (err) {
      console.error("Error creating hospital:", err);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const hospitalTypes = [
    "General Hospital",
    "Specialized Hospital",
    "Teaching Hospital",
    "Children’s Hospital",
    "Psychiatric Hospital",
    "Rehabilitation Center",
    "Maternity Hospital",
    "Military Hospital",
    "Cancer Hospital",
    "Orthopedic Hospital",
    "Neurology Hospital",
  ];

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess && data) {
      toast.success(data?.message);
      setInputFields({
        hospitalId: "",
        hospitalName: "",
        email: "",
        contact: "",
        hospitalType: "",
        address: "",
        establishedYear: "",
      });
      setHospitalCertificate(null);
      navigate("/hospital");
    }
  }, [data, isSuccess, isError, error]);

  return (
    <form className="singleHospitalForm" onSubmit={handleSubmit}>
      {/* First Row */}
      <div className="form-1">
        {selectedFields.includes("hospitalId") && (
          <div>
            <label htmlFor="hospitalId">Hospital ID</label>
            <input type="text" id="hospitalId" value={inputFields.hospitalId} onChange={handleChange} placeholder="Enter hospital id" required />
          </div>
        )}
        {selectedFields.includes("hospitalName") && (
          <div>
            <label htmlFor="hospitalName">Hospital Name</label>
            <input type="text" id="hospitalName" value={inputFields.hospitalName} onChange={handleChange} placeholder="Enter hospital name" required />
          </div>
        )}
        {selectedFields.includes("hospitalEmail") && (
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={inputFields.email} onChange={handleChange} placeholder="Enter email" required />
          </div>
        )}
      </div>

      {/* Second Row */}
      <div className="form-2">
        {selectedFields.includes("contact") && (
          <div>
            <label htmlFor="contact">Contact Number</label>
            <input type="tel" id="contact" value={inputFields.contact} onChange={handleChange} placeholder="Enter hospital contact number" required />
          </div>
        )}
        {selectedFields.includes("hospitalAddress") && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "75px" }}>
              <label htmlFor="address">Address</label>
              <NavLink onClick={() => setShowMap(true)} style={{ color: "blue", cursor: "pointer" }}>
                Search with map
              </NavLink>
            </div>
            <input type="text" id="address" value={inputFields.address} onChange={handleChange} placeholder="Enter hospital address" required />
          </div>
        )}
        {selectedFields.includes("hospitalType") && (
          <div>
            <label htmlFor="hospitalType">Hospital Type</label>
            <select id="hospitalType" value={inputFields.hospitalType} onChange={handleChange} required>
              <option value="">Select Hospital Type</option>
              {hospitalTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Third Row */}
      <div className="form-3">
        {selectedFields.includes("establishedYear") && (
          <div>
            <label htmlFor="establishedYear">Established Year</label>
            <select id="establishedYear" value={inputFields.establishedYear} onChange={handleChange} required>
              <option value="">Select Established Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectedFields.includes("hospitalCertificate") && (
          <div>
            <label htmlFor="hospitalCertificate">Upload Certificate</label>
            <input type="file" id="hospitalCertificate" accept="image/*, application/pdf" onChange={handleFileChange} />
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="form-4">
        <Button startIcon={<AddOutlinedIcon />} variant="contained" color="success" type="submit" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : "Add Hospital"}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() =>
            setInputFields({
              hospitalId: "",
              hospitalName: "",
              email: "",
              contact: "",
              hospitalType: "",
              address: "",
              establishedYear: "",
            })
          }
        >
          Cancel
        </Button>
      </div>

      {/* Dialog for Map */}
      <Dialog open={showMap} onClose={() => setShowMap(false)} maxWidth="md" fullWidth>
        <DialogTitle>Select Location</DialogTitle>
        <DialogContent>
          <LocationPicker
            setAddress={(address) => setInputFields((prev) => ({ ...prev, address }))}
            onClose={() => setShowMap(false)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowMap(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default SingleHospitalCreate;
