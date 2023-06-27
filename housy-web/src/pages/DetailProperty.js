import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate, useParams } from "react-router-dom";
import Convert from "../components/Rupiah/rupiah";
import { API, setAuthToken } from "../config/api";
import { UserContext } from "../context/userContext";

export default function DetailProperty() {
    // window.scrollTo(0,0);
    const [state] = useContext(UserContext)
    const navigate = useNavigate()

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    let Navigate = useNavigate()

    useEffect(() => {
        if (state.role === 'admin') {
          Navigate('/admin')
        }
    //eslint-disable-next-line
    },[state])
    
    const ID = useParams("id");
    const { data : Property } = useQuery(['detailProperty'], async () => {
        const response = await API.get('/property/' + ID.id);
        return response.data.data
    })
        
    const [data, setData] = useState({
        total: 0,
        status: '',
        check_in: '',
        check_out: '',
        address_transaction: '',
        property_id: 0,
        user_id: 0,
    })

    const { data : User } = useQuery(['UserBooking'], async () => { 
        const response = await API.get('/user/' + state.user.user_id);
        return response.data.data
    })

    console.log("Hiyaaaa",data)

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        setData({
            total: Property?.price,
            status: 'Waiting Payment',
            address_transaction: User?.address,
            property_id: Property?.id,
            user_id: User?.id,
        })
    }, [Property, User])

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()
        
            setAuthToken(localStorage.token);
                    
            // Configuration
            const config = {
                headers: {
                'Content-type': 'application/json',
                },
            };
        
            // Insert data for login process, you can also make this without any configuration, because axios would automatically handling it.
            const response = await API.post('/booking', data, config );
        
            console.log("Berhasil Booking", response)
            
            navigate(`/payment/${Property?.id}`)
            }
        catch(error) {
                console.log("Gagal Input Booking", error)
            }
      })

    return (
        <div className="bg-light p-5">
            <Carousel interval={null}>
                <Carousel.Item>
                <img
                    className="CarouselTour w-100"
                    src={(Property?.uploadImage)}
                    alt="First"
                />
                </Carousel.Item>
            </Carousel>
            <div className="InnerDetail pt-5">
                <h1> {Property?.name}</h1>
                <div className="mt-4 d-flex col justify-content-between">
                    <div>
                        <p className="mb-1">Start from</p>
                        <h3 className="Text"> {Convert(Property?.price)} / Year </h3>
                    </div>
                    <div>
                        <p className="mb-2"> Benefits </p>
                        <div className="d-flex col justify-content-around">
                            <div>
                                <h5 className="mx-3"> <span className="fa-solid fa-bed"></span> {Property?.bedroom} Beds </h5>
                            </div>
                            <div>
                                <h5 className="mx-3"> <span className="fa-solid fa-shower"></span> {Property?.bathroom} Bathrooms </h5>
                            </div>
                            <div>
                                <h5 className="mx-3"> Area {Property?.area} sqft  </h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p>{Property?.address}</p>
                </div>
                <div className="mt-5">
                    <div>
                        <h5 className="Text"> Description </h5>
                    </div>
                    <div>
                        <p className="Text" style={{textAlign:'justify'}}> {Property?.description} </p>
                    </div>
                </div>
                <hr/>
            <hr/>
                
            {/* { statusUser ? (
            <div className="d-flex justify-content-end align-items-center">
                <Link to={`/payment/${id.id}`}>
                <Button variant="warning" size="lg" type="submit">Book Now</Button>
                </Link>
            </div> 
            {/* ) : ( */}
            <div className="d-flex justify-content-end align-items-center">
                <Button variant="warning" size="lg" type="submit" onClick={handleShow}> Book Now</Button> 
            </div>
            {/* )} */}
            </div>
            <Modal centered onHide={handleClose} show={show}>
                <Modal.Header closeButton={handleClose}><h4>Date</h4></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Check In</Form.Label>
                            <Form.Control type="date" name="check_in" onChange={handleChange} />
                            <hr/>
                            <Form.Label>Check Out</Form.Label>
                            <Form.Control type="date" name="check_out" onChange={handleChange} />
                            <br/>
                                <div className="d-flex justify-content-center">
                                        <Button className="btn btn-warning w-50" variant="warning" size="lg" type="submit" onClick={(e) => handleSubmit.mutate(e)}>Order</Button>
                                </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}