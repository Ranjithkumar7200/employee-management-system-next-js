"use client";
import { useEffect, useState } from "react";
import { Button, Col, Container, Table, Modal, Form } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [employee, setEmployee] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`/api/employees`)
        .then((res) => res.json())
        .then((res) => setEmployees(res));
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleShowAddModal = () => {
    setEmployee({ name: "", phone: "", email: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleShowEditModal = (employee) => {
    setEmployee(employee);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };
  const handleSave = async () => {
    console.log(employee);

    const url = isEditing ? `/api/user/${employee._id}` : `/api/employees`;

    const method = isEditing ? "PUT" : "POST";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });
      fetchEmployees();
      handleCloseModal();
    } catch (error) {
      console.error(
        `Error while ${isEditing ? "updating" : "creating"} employee:`,
        error
      );
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/user/${id}`, {
      method: "DELETE",
    });

    fetchEmployees();
  };

  return (
    <Container className="mt-5 w-100 d-flex flex-column justify-content-center">
      <Col className="d-flex flex-row align-items-center justify-content-between mb-4">
        <p>Employee Management System</p>
        <Button onClick={handleShowAddModal}>
          <FaPlus />
        </Button>
      </Col>
      <Table bordered responsive hover className="max-vh-400 overflow-y-scroll">
        <thead>
          <tr>
            <th className="py-3 px-6 text-left">S No.</th>
            <th className="py-3 px-6 text-left">Employee Name</th>
            <th className="py-3 px-6 text-left">Employee Phone</th>
            <th className="py-3 px-6 text-left">Employee Email</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees &&
            employees.map((emp, index) => (
              <tr
                key={emp._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">{emp.name}</td>
                <td className="py-3 px-6 text-left">{emp.phone}</td>
                <td className="py-3 px-6 text-left">{emp.email}</td>
                <td className="py-3 px-6 text-center">
                  <div className="items-center">
                    <Button
                      variant="success"
                      className="mx-1"
                      onClick={() => handleShowEditModal(emp)}
                    >
                      <FaEdit className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="danger"
                      className="mx-1"
                      onClick={() => handleDelete(emp._id)}
                    >
                      <FaTrash className="h-5 w-5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Edit Employee" : "Add New Employee"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formEmployeeName">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={employee.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmployeePhone">
              <Form.Label>Employee Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phone"
                value={employee.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmployeeEmail">
              <Form.Label>Employee Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={employee.email}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
