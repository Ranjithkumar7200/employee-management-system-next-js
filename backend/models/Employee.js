// models/Employee.js
import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.models.Employee ||
  mongoose.model("Employee", EmployeeSchema);
