import { Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { UserContext } from '../../context/userContext';
import { API, setAuthToken } from '../../config/api';



function ModalLogin({show, hidden, showRegister}) {

  function showModalReg() {
    hidden()
    showRegister()
  }

  let navigate = useNavigate();

  // eslint-disable-next-line
  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  
  const handleChange = (e) => {
    setForm({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Insert data for login process, you can also make this without any configuration, because axios would automatically handling it.
      const response = await API.post('/login', form);

      console.log("login success : ", response);

      localStorage.setItem('token', response.data.data.token)
      
      // Send data to useContext
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.data,
      });

      setAuthToken(localStorage.token);

      // Status check
      if (response.data.data.role === 'owner') {
        navigate('/homeAdmin')
        // userAdmin(true)
        // hidden(false)
      } else {
        navigate('/')
        // user(true)
        // hidden(false)
      }

      const alert = (
        <Alert variant="success" className="py-1">
          Login success
        </Alert>
      );
      setMessage(alert);

      document.getElementById('email').value = ""
      document.getElementById('password').value = ""

      hidden();

    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);

      console.log("login failed : ", error);
    }
  });

  return (
    <>
      <Modal centered show={show} onEscapeKeyDown={hidden} onHide={hidden}>
        <div style={{position:'relative'}}>
          <Image style={{position:'absolute', right:'0', bottom:'-65px'}}/>
          <Image style={{position:'absolute', bottom:'-112px'}}/>
        </div>
        <Modal.Header >
          <Modal.Title className='LoginTitle my-4'>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        {message && message}

            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    id='email'
                    onChange={handleChange}
                    placeholder="name@example.com"
                    autoFocus
                ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    id='password' 
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>
                <Button className='btn btn-warning w-100' variant="secondary" type='submit'>
                  Login
                </Button>
            </Form>
            <p style={{textAlign:'center', marginTop:'15px', cursor:'pointer'}} onClick={showModalReg}>Don't have an account? ? Klik <b>Here</b></p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalLogin