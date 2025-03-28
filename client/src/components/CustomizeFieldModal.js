import { useState, useEffect } from "react";
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, Button, 
  FormControlLabel, Checkbox, TextField 
} from "@mui/material";
import { NavLink } from "react-router-dom";

const CustomizeFieldsModal = ({ open, onClose, selectedFields, setSelectedFields }) => {
  const fieldOptions = [
    { label: "Hospital ID", key: "hospitalId" },
    { label: "Hospital Name", key: "hospitalName" },
    { label: "Contact Number", key: "contact" },
    { label: "Email ID", key: "hospitalEmail" },
    { label: "Hospital Type", key: "hospitalType" },
    { label: "Address", key: "hospitalAddress" },
    { label: "Established Year", key: "establishedYear" },
    { label: "Image Upload", key: "hospitalCertificate" }
  ];

  const [showInput, setShowInput] = useState(false);
  const [customField, setCustomField] = useState("");
  const [customFields, setCustomFields] = useState([]);

  // Check if there are custom fields in local storage
  useEffect(() => {
    const storedFields = JSON.parse(localStorage.getItem("customFields")) || [];
    setCustomFields(storedFields);
  }, []);

  // Handle field selection
  const handleCheckboxChange = (key) => {
    setSelectedFields((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  // Handle adding custom fields
  const handleAddCustomField = () => {
    if (customField.trim() && !selectedFields.includes(customField)) {
      const updatedCustomFields = [...customFields, customField];
      setCustomFields(updatedCustomFields);
      setSelectedFields([...selectedFields, customField]);
      setCustomField(""); // Reset input field
      setShowInput(false); // Hide input field after adding
      localStorage.setItem("customFields", JSON.stringify(updatedCustomFields)); // Save to localStorage
    }
  };

  // Handle update button
  const handleUpdate = () => {
    localStorage.setItem("selectedFields", JSON.stringify(selectedFields));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Hospital Field Details</DialogTitle>
      <DialogContent>
        {fieldOptions.map((field) => (
          <FormControlLabel
            key={field.key}
            control={
              <Checkbox
                checked={selectedFields.includes(field.key)}
                onChange={() => handleCheckboxChange(field.key)}
              />
            }
            label={field.label}
          />
        ))}

        {/* Render Custom Fields */}
        {customFields.map((field, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={selectedFields.includes(field)}
                onChange={() => handleCheckboxChange(field)}
              />
            }
            label={field}
          />
        ))}

        {/* Show input field only when "Add Custom Field" is clicked */}
        {showInput && (
          <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
            <TextField
              value={customField}
              onChange={(e) => setCustomField(e.target.value)}
              placeholder="Enter Field Name"
              variant="outlined"
              size="small"
              style={{ marginRight: "10px", flex: 1 }}
            />
            <Button variant="contained" color="primary" onClick={handleAddCustomField}>
              Add
            </Button>
          </div>
        )}

        <NavLink 
          style={{ marginLeft: "25px", marginTop: "10px", display: "block", cursor: "pointer" }}
          onClick={() => setShowInput(true)}
        >
          Add Custom Field
        </NavLink>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleUpdate} color="primary" variant="contained">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomizeFieldsModal;
