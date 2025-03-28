const Hospital = require("../models/hospitalModel"); // Import the Hospital model
const cloudinary = require("cloudinary").v2; // Ensure Cloudinary is configured


// @desc    Create a new hospital
// @route   POST /api/hospitals
// @access  Public
exports.createHospital = async (req, res) => {
  try {
    const { hospitalId, hospitalName, email, contact, address, hospitalType, establishedYear, departments } = req.body;

    // Check if hospital already exists
    const existingHospital = await Hospital.findOne({ email });
    if (existingHospital) {
      return res.status(400).json({ message: "Hospital with this email already exists" });
    }


    let hospitalCertificate = {};
    if (req.file) {
      hospitalCertificate = {
        public_id: req.file.filename || req.file.path,
        url: req.file.path,
      };
    }
    const newHospital = new Hospital({
      hospitalId,
      hospitalName,
      email,
      contact,
      address,
      hospitalType,
      establishedYear,
      hospitalCertificate,
      departments,
    });

    await newHospital.save();
    res.status(201).json({ success: true, message: "Hospital created successfully", data: newHospital });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all hospitals
// @route   GET /api/hospitals
// @access  Public
exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json({ success: true, data: hospitals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get a single hospital by ID
// @route   GET /api/hospitals/:id
// @access  Public
exports.getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.status(200).json({ success: true, data: hospital });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update hospital details
// @route   PUT /api/hospitals/:id
// @access  Public


exports.updateHospital = async (req, res) => {
  try {
    let updateData = { ...req.body };

    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // If a new certificate is uploaded, handle Cloudinary upload
    if (req.file) {
      // Delete old certificate from Cloudinary (if exists)
      if (hospital.hospitalCertificate && hospital.hospitalCertificate.public_id) {
        await cloudinary.uploader.destroy(hospital.hospitalCertificate.public_id);
      }

      // Upload new certificate to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "hospitals/certificates", // Cloudinary folder
      });

      // Update hospitalCertificate field
      updateData.hospitalCertificate = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    // Update hospital details
    const updatedHospital = await Hospital.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Hospital updated successfully",
      data: updatedHospital,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// @desc    Delete hospital
// @route   DELETE /api/hospitals/:id
// @access  Public
exports.deleteHospital = async (req, res) => {
  try {
    const deletedHospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!deletedHospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.status(200).json({ success: true, message: "Hospital deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.bulkHospitalCreate=async (req, res) => {
  try {
    const { hospitals } = req.body;

    if (!hospitals || hospitals.length === 0) {
      return res.status(400).json({ success: false, message: "No hospital data provided." });
    }

    await Hospital.insertMany(hospitals);

    res.status(201).json({ success: true, message: "Hospitals uploaded successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}