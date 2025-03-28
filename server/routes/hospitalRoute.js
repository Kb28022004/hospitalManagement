const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/hospitalController");
const upload = require("../middleware/upload");

// CRUD Routes
router.post("/create", upload.single("hospitalCertificate"), hospitalController.createHospital); // Create hospital
router.get("/get", hospitalController.getAllHospitals); // Get all hospitals
router.get("/single/:id", hospitalController.getHospitalById); // Get single hospital
router.put("/update/:id", upload.single("hospitalCertificate"), hospitalController.updateHospital); // Update hospital
router.delete("/delete/:id", hospitalController.deleteHospital); // Delete hospital
router.post("/bulk/create", hospitalController.bulkHospitalCreate);
module.exports = router;
