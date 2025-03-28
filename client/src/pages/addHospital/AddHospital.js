import { NavLink, Outlet } from "react-router-dom";
import "./AddHospital.css";
import { Button, List } from "@mui/material";
import CustomizeFieldsModal from "../../components/CustomizeFieldModal";
import { useState, useEffect } from "react";

const listItems = ["Single Hospital", "Bulk Upload"];

const AddHospital = () => {
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

  return (
    <>
      <div className="addHospitalMainContainer">
        <div className="addHospitalContainer">
          <div className="addHospital-section-1">
            <h3>Add Hospital</h3>
            <Button onClick={() => setOpenModal(true)} className="buttonStyling">
              Customize Fields
            </Button>
          </div>
          <hr />
          <div className="addHospital-section-2">
            {listItems.map((curItem) => {
              const route = curItem.toLowerCase().replace(" ", ""); // Ensure correct route format
              return (
                <NavLink
                  to={route}
                  className={({ isActive }) =>
                    isActive ? "accountSettingsListItem active" : "accountSettingsListItem"
                  }
                  key={route}
                >
                  <List>{curItem}</List>
                </NavLink>
              );
            })}
          </div>
          <hr />
          {/* Pass selectedFields as context */}
          <Outlet context={{ selectedFields }} />
        </div>
      </div>
      <CustomizeFieldsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedFields={selectedFields}
        setSelectedFields={setSelectedFields}
      />
    </>
  );
};

export default AddHospital;
