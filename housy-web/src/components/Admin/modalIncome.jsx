import { useQuery } from "@tanstack/react-query";
import { Image, Modal, Table } from "react-bootstrap";
import { API } from "../../config/api";
import Convert from "../Rupiah/rupiah";
import logo from '../Navbar/logo.png';

export default function ModalIncome({show, handleClose, params}) {

    const { data: order, isLoading } = useQuery(['detailIncomeCache'], async () => {
        const response = await API.get('/transaction/' + params);
        return response.data.data;
    },{
        refetchInterval: 500,
        refetchIntervalInBackground: true,
    });

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formatted = new Date(order?.created_at).toLocaleDateString('en-US', options);

    const start = new Date(order?.check_in);
    const end = new Date(order?.check_out);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const totalPrice = (Math.ceil(order?.Property.price / 365) * diffDays)


    return (
        <>
            <Modal show={show} onHide={handleClose} fullscreen={true}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Income</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                {isLoading ? (
                    <div>Loading...</div>
                ) : (

                <div className="BgPayment">
                <div className="PaymentCard">
                    <div className="pt-3 px-5">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <Image src={logo} />
                            </div>
                            <div className="d-flex row align-items-center w-25">
                                <div>
                                    <h3 className="text-center"> Booking </h3>
                                </div>
                                <div>
                                    <p className="text-center"> {formatted} </p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-evenly mt-3">
                            <div>
                                <div>
                                    <h2> {order?.Property.name} </h2>
                                </div>
                                <div>
                                    <p>  {order?.Property.address} </p>
                                </div>
                                <div>
                                    <p className="btn btn-outline-danger mt-4" style={{cursor:'default'}}> {order?.status} </p>
                                </div>
                            </div>
                            <div className="InfoTrip">
                                <div className="m-3">
                                    <h5> Check-In </h5>
                                    <p> {order?.check_in} </p>
                                </div>
                                <div className="m-3">
                                    <h5> Amenities </h5>
                                    <div className="ms-3">
                                        <p> {order?.Property.furnished} </p>
                                        <p> {order?.Property.pet} </p>
                                        <p> {order?.Property.shared_accomodation} </p>
                                    </div>
                                </div>
                                <div className="m-3">
                                    <h5> Check-Out </h5>
                                    <p> {order?.check_out} </p>
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
                                <td> {order?.User.name} </td>
                                <td></td>
                                <td> {order?.User.phone} </td>
                                <td> {order?.User.gender} </td>
                                <td>Long Time Rent : </td>
                                <td> {diffDays} Hari </td>
                                </tr>
                                <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td> Total : </td>
                                <td> {Convert(totalPrice)} </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
                )}
                </Modal.Body>
            </Modal>
        </>
    )
}