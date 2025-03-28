import { useRoutes } from "react-router-dom";
import Home from "../components/Home";
import MainDashboard from "../components/mainDashboard/MainDashboard";
import Dashboard from "../pages/dashboard/Dashboard";
import Hospital from "../pages/hospital/Hospital";
import AddHospital from "../pages/addHospital/AddHospital";
import SingleHospitalCreate from "../pages/singleHospitalCreate/SingleHospitalCreate";
import BulkUpload from "../pages/bulkUpload/BulkUpload";
import EditHospital from "../pages/editHospital/EditHospital";

const AppRoutes = () => {
  const routes = [
    { 
      path: "/", 
      element: <MainDashboard />, 
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "hospital", element: <Hospital /> },
        { path: "edit-hospital/:id", element: <EditHospital /> },
        { 
          path: "addhospital", 
          element: <AddHospital />, 
          children: [
            { path: "singlehospital", element: <SingleHospitalCreate /> },  // ✅ Fixed
            { path: "bulkupload", element: <BulkUpload /> }  // ✅ Fixed
          ] 
        }
      ] 
    }
  ];
  return useRoutes(routes);
};

export default AppRoutes;
