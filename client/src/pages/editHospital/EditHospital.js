import { useState, useEffect } from "react";
import { Button, CircularProgress, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";
import CustomizeFieldsModal from "../../components/CustomizeFieldModal";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import "./EditHospital.css";
import { useGetSingleApiQuery, useUpdateHospitalMutation } from "../../feature/api/hospitalApi";
import toast from "react-hot-toast";

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



// Generate year options dynamically
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

const EditHospital = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedFields, setSelectedFields] = useState([
    "hospitalId",
    "hospitalName",
    "contact",
    "hospitalEmail",
    "hospitalType",
    "hospitalAddress",
    "establishedYear",
    "hospitalCertificate",
  ]);

  const {id}=useParams()


const {data,isLoading,isSuccess,isError,error}=useGetSingleApiQuery(id)

  const [inputFields, setInputFields] = useState({
    hospitalId: "",
    hospitalName: "",
    email: "",
    contact: "",
    hospitalType: "",
    address: "",
    establishedYear: "",
    hospitalCertificate: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const [updateHospital,{data:updateHospitalData,isLoading:updateHospitalLoading,isError:updateHospitalIsError,error:updateHospitalError,isSuccess:updateHospitalSuccess}]=useUpdateHospitalMutation(id)

  // Load selectedFields from localStorage on mount
  useEffect(() => {
    const savedFields = localStorage.getItem("selectedFields");
    if (savedFields) {
      setSelectedFields(JSON.parse(savedFields));
    }
  }, []);

  // Update localStorage when selectedFields change
  useEffect(() => {
    localStorage.setItem("selectedFields", JSON.stringify(selectedFields));
  }, [selectedFields]);

  // Handle input field changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputFields((prev) => ({ ...prev, [id]: value }));
  };

  // Handle file upload and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setInputFields((prev) => ({ ...prev, hospitalCertificate: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("hospitalId", inputFields.hospitalId);
    formData.append("hospitalName", inputFields.hospitalName);
    formData.append("email", inputFields.email);
    formData.append("contact", inputFields.contact);
    formData.append("hospitalType", inputFields.hospitalType);
    formData.append("address", inputFields.address);
    formData.append("establishedYear", inputFields.establishedYear);
  
    // Append hospital certificate file if available
    if (inputFields.hospitalCertificate) {
      formData.append("hospitalCertificate", inputFields.hospitalCertificate);
    }
  
    try {
      await updateHospital({ id, formData }).unwrap();
   
    } catch (error) {
      console.error("Error updating hospital:", error);
      toast.error(error?.data?.message)
    }
  };
  
  useEffect(() => {
    if (isSuccess && data) {
      setInputFields({
        hospitalId: data.data.hospitalId || "",
        hospitalName:data.data.hospitalName || "",
        email: data.data.email || "",
        contact: data.data.contact || "",
        hospitalType: data.data.hospitalType || "",
        address: data.data.address || "",
        establishedYear: data.data.establishedYear || "",
        hospitalCertificate: data.data.hospitalCertificate || null,
      });
  
      // If there's an uploaded certificate, set the preview image
      if (data.data.hospitalCertificate) {
        setPreviewImage(data.data.hospitalCertificate.url);
      }
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if(updateHospitalIsError && updateHospitalError){
        toast.error(updateHospitalError?.data?.message)
    }
    if(updateHospitalSuccess && updateHospitalData){
        toast.success(updateHospitalData?.message); // Corrected toast type
    }
  
   
   
  }, [updateHospitalIsError , updateHospitalError,updateHospitalSuccess , updateHospitalData])
  
  
  return (
    <>
      <div className="addHospitalMainContainer">
        <div className="addHospitalContainer">
          <div className="addHospital-section-1">
            <h3>Edit Hospital</h3>
            <Button onClick={() => setOpenModal(true)} className="buttonStyling">
              Customize Fields
            </Button>
          </div>
          <hr />

          {/* Form Start */}
          <form className="singleHospitalForm" onSubmit={handleSubmit}>
            {/* First Row */}
            <div className="form-1">
              {selectedFields.includes("hospitalId") && (
                <div>
                  <label htmlFor="hospitalId">Hospital ID</label>
                  <input
                    type="text"
                    id="hospitalId"
                    value={inputFields.hospitalId}
                    onChange={handleChange}
                    placeholder="Enter hospital ID"
                    required
                  />
                </div>
              )}
              {selectedFields.includes("hospitalName") && (
                <div>
                  <label htmlFor="hospitalName">Hospital Name</label>
                  <input
                    type="text"
                    id="hospitalName"
                    value={inputFields.hospitalName}
                    onChange={handleChange}
                    placeholder="Enter hospital name"
                    required
                  />
                </div>
              )}
              {selectedFields.includes("hospitalEmail") && (
                <div>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={inputFields.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />
                </div>
              )}
            </div>

            {/* Second Row */}
            <div className="form-2">
              {selectedFields.includes("contact") && (
                <div>
                  <label htmlFor="contact">Contact Number</label>
                  <input
                    type="tel"
                    id="contact"
                    value={inputFields.contact}
                    onChange={handleChange}
                    placeholder="Enter hospital contact number"
                    required
                  />
                </div>
              )}
              {selectedFields.includes("hospitalAddress") && (
                <div>
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    value={inputFields.address}
                    onChange={handleChange}
                    placeholder="Enter hospital address"
                    required
                  />
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
                  <select
                    id="establishedYear"
                    value={inputFields.establishedYear}
                    onChange={handleChange}
                    required
                  >
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
                  <label htmlFor="hospitalCertificate">Upload Image</label>
                  <input
                    type="file"
                    id="hospitalCertificate"
                    accept="image/*, application/pdf"
                    onChange={handleFileChange}
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="form-4">
              <Button startIcon={<AddOutlinedIcon />} variant="contained" color="success" type="submit" disabled={updateHospitalLoading}>
                {updateHospitalLoading ? <CircularProgress size={24} /> : "Update Hospital"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setInputFields({ hospitalId: "", hospitalName: "", email: "", contact: "", hospitalType: "", address: "", establishedYear: "", hospitalCertificate: null })}
              >
                Cancel
              </Button>
            </div>
          </form>
          {/* Form End */}

          {/* Image Preview */}
          {previewImage && (
            <Card className="previewCard">
              <CardMedia component="img" height="200" image={previewImage} alt="Uploaded Hospital Certificate" />
              <CardContent>
                <Typography variant="h6">Uploaded Image</Typography>
              </CardContent>
            </Card>
          )}

          <hr />
          <Outlet context={{ selectedFields }} />
        </div>
      </div>

      {/* Customize Fields Modal */}
      <CustomizeFieldsModal open={openModal} onClose={() => setOpenModal(false)} selectedFields={selectedFields} setSelectedFields={setSelectedFields} />
    </>
  );
};

export default EditHospital;
