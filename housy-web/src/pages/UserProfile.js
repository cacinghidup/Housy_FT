import jwtDecode from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import { API } from "../config/api";
import { Image, Modal } from "react-bootstrap";
import {Button} from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-bootstrap";
import logo from '../components/Navbar/logo.png';
import {Table} from "react-bootstrap";

export default function UserProfile() {

    const idRole = localStorage.token
    const idUser = jwtDecode(idRole)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const handleCloseModal = () => setShowPasswordModal(false);
    const handleShowModal = () => setShowPasswordModal(true);

    const [message, setMessage] = useState(null);

    const [changePassword, setChangePassword] = useState({
        password: "",
        new_password: "",
    })

    const [image, setImage] = useState(null);

    const { data : userProfile } = useQuery(['userProfile'], async () => {
        const response = await API.get('/user/' + idUser.id);
        return response.data.data
    },{
        refetchInterval: 5000,
        refetchIntervalInBackground: true
    })

    const handleChange = (e) => {
        setChangePassword({
            ...changePassword,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeProfile = (e) => {
        setImage(e.target.files[0])
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                }
            }

            const response = await API.patch('/user/' + idUser.id, changePassword, config);

            const alert = (
                <Alert variant="success" className="py-1">
                  Success Change Password
                </Alert>
            );
            setMessage(alert);

            handleCloseModal();

            setMessage(null)

            return response.data.message
        } catch (error) {
            console.log(error)
            const alert = (
                <Alert variant="danger" className="py-1">
                  {error.response.data.message}
                </Alert>
              );
            setMessage(alert);
            // alert(error.response.data.message)
        }
    })

    const handleSubmitProfile = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                }
            }

            const formData = new FormData();
            formData.append('uploadImage', image); 

            const response = await API.patch('/userProfile/' + idUser.id, formData, config);

            console.log("Berhasil Ganti Foto Profil", response)

            handleClose()
        } catch (error) {
            console.log(error)
        }

    })

    const data1 =  userProfile?.Transaction.filter((Transaction) => {
        // eslint-disable-next-line
        return Transaction.status == 'Success'
    })

    console.log(data1)

    return (
        <div className="BgPersonalInfo">
            <div className="CardPersonalInfo ">
                <div className="PersonalInfo d-flex col justify-content-evenly px-5">
                    <div className="d-flex row" style={{margin:'10px 50px 10px 50px'}}>
                        <div>
                            <h2> Personal Info </h2>
                        </div>
                        <div className="d-flex row">
                            <div className="d-flex">
                                <div className="ProfilIcon">
                                    <i className="fa-regular fa-user fa-3x"></i>
                                </div>
                                <div className="d-flex row align-items-center">
                                    <div>
                                        <h6> {userProfile?.name} </h6>
                                    </div>
                                    <div>
                                        <p> Full Name </p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="ProfilIcon">
                                    <i className="fa-regular fa-envelope fa-3x"></i>
                                </div>
                                <div className="d-flex row align-items-center">
                                    <div className="d-flex row">
                                        <h6> {userProfile?.email} </h6>
                                    </div>
                                    <div>
                                        <p> Email </p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="ProfilIcon">
                                    <i className="fa-solid fa-phone fa-3x"></i>
                                </div>
                                <div className="d-flex row">
                                    <div>
                                        <h6> {userProfile?.phone} </h6>
                                    </div>
                                    <div>
                                        <p> Mobile Phone </p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="ProfilIcon">
                                    <i className="fa-solid fa-location-dot fa-3x"></i>
                                </div>
                                <div className="d-flex row">
                                    <div>
                                        <h6> {userProfile?.address} </h6>
                                    </div>
                                    <div>
                                        <p> Address </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{margin:'10px 75px 10px 75px'}}>
                        <div>
                            <Image style={{borderRadius:'5px', width:'400px', height:'350px'}} src={userProfile?.image} ></Image>
                        </div>
                        <div>
                            <Button style={{width:'100%', marginTop:'15px'}} type="button" variant="warning" onClick={handleShow}>Change Photo Profile</Button>
                        </div>
                        <div>
                            <Button style={{width:'100%', marginTop:'15px'}} type="button" variant="warning" onClick={handleShowModal}>Change Password</Button>
                        </div>
                    </div>
                </div>
            </div>
            
            {data1?.map((variant) => (
            <div className="BgPayment">
                <div className="PaymentCard">
                    <div className="pt-3 px-5">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <Image src={logo}/>
                            </div>
                            <div className="d-flex row align-items-center w-25">
                                <div>
                                    <h3 className="text-center"> Booking </h3>
                                </div>
                                <div>
                                    <p className="text-center"> </p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-evenly mt-3">
                            <div>
                                <div>
                                    <h2> {variant?.Property.name} </h2>
                                </div>
                                <div>
                                    <p> {variant?.Property.address} </p>
                                </div>
                                <div>
                                    <p className="btn btn-outline-danger mt-4" style={{cursor:'default'}}> {variant?.status} </p>
                                </div>
                            </div>
                            <div className="InfoTrip">
                                <div className="m-3">
                                    <h5> Check-In </h5>
                                    <p> {variant?.check_in} </p>
                                </div>
                                <div className="m-3">
                                    <h5> Amenities </h5>
                                    <div className="ms-3">
                                        <p> {variant?.Property.furnished} </p>
                                        <p> {variant?.Property.pet} </p>
                                        <p> {variant?.Property.shared_accomodation} </p>
                                    </div>
                                </div>
                                <div className="m-3">
                                    <h5> Check-Out </h5>
                                    <p> {variant?.check_out} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-0">
                        <Table className="mt-3 mb-0">
                            <thead>
                                <tr>
                                <th className="text-center">No</th>
                                <th >Full Name</th>
                                <th></th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th></th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td className="text-center"> 1 </td>
                                <td> {variant?.User.name} </td>
                                <td></td>
                                <td> {variant?.User.phone} </td>
                                <td> {variant?.User.gender} </td>
                                <td>Long Time Rent : </td>
                                <td> ---------- </td>
                                </tr>
                                <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td> Total : </td>
                                <td> {variant?.total} </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            ))}


            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header>
                    Change Photo Profile
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleSubmitProfile.mutate(e)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control 
                                id='image' 
                                type="file" 
                                required
                                onChange={handleChangeProfile}
                                />
                        </Form.Group>

                        <div className='d-flex justify-content-center mt-5'>
                            <Button variant="warning" type="submit" style={{width:'35%'}}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal centered show={showPasswordModal} onHide={handleCloseModal}>
                <Modal.Header>
                    Change Password
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                        <Form.Group className="mb-3">

                            {message && message}

                            <Form.Label className="mt-3">Old Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="password"
                                onChange={handleChange}
                            />
                            <Form.Label className="mt-3">New Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="new_password"
                                onChange={handleChange}
                            />
                        </Form.Group>                        
                        <div className='d-flex justify-content-center mt-5'>
                            <Button variant="warning" type="submit" style={{width:'35%'}} >
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}