import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { API } from '../../config/api';


function ModalRegister({show, hidden}) {

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    gender: "",
  });

  // console.log(form);

  const handleChange = (e) => {
    setForm({
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      gender: document.getElementById('gender').value
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post('/register', form);

      console.log("register success : ", response)

      const alert = (
        <Alert variant="success" className="py-1">
          Register success!
        </Alert>
      );
      setMessage(alert);

      // CLEAR INPUT FORM
      document.getElementById('name').value = ""
      document.getElementById('email').value = ""
      document.getElementById('password').value = ""
      document.getElementById('phone').value = ""
      document.getElementById('address').value = ""
      document.getElementById('gender').value = ""

    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          {error.response.data.message}
        </Alert>
      );
      setMessage(alert);
      console.log("register failed : ", error);
    }
  });

  return (
    <>
      <Modal centered show={show} onEscapeKeyDown={hidden} onHide={hidden}>
        <div style={{position:'relative'}}>
          <Image style={{position:'absolute', right:'0', bottom:'-65px'}}/>
          <Image style={{position:'absolute', bottom:'-112px'}} />
        </div>
        <Modal.Header closeButton={hidden}>
          <Modal.Title className='LoginTitle my-4'>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        {message && message}

            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="John Doe"
                    required
                    autoFocus
                    id="name"
                    onChange={handleChange}
                />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    id="email"
                    required
                    onChange={handleChange}
                />
                </Form.Group>
                  <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    id="password"
                    required
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                      type="tel"
                      placeholder="08123456789"
                      id="phone"
                      onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select id='gender' required onChange={handleChange}>
                    <option> </option>
                    <option> Male </option>
                    <option> Female </option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                      as="textarea"
                      placeholder="Alamat"
                      style={{height:'100px', resize:'none'}}
                      id="address"
                      required
                      onChange={handleChange}
                  />
                </Form.Group>
                <Button className='btn btn-warning w-100' variant="secondary" type='submit'>
                  Register
                </Button>
            </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalRegister;