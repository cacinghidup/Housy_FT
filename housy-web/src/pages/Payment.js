import { Image } from "react-bootstrap";
import {Table} from "react-bootstrap";
import { Button } from "react-bootstrap";
import logo from '../components/Navbar/logo.png';
import { useQuery } from "@tanstack/react-query";
import { API } from "../config/api";
import jwtDecode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import Convert from "../components/Rupiah/rupiah";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { setAuthToken } from "../config/api";

export default function Payment() {
    window.scrollTo(0,0);
    const { id } = useParams("id")
    
    const navigate = useNavigate()

    const idRole = localStorage.token
    const idUser = jwtDecode(idRole)

    const { data : payment } = useQuery(['propertyPayments'], async () => {
        const response = await API.get('/property/' + id);
        return response.data.data
    })

    const { data : user } = useQuery(['userPayment'], async () => {
        const response = await API.get('/user/' + idUser.id);
        return response.data.data
    })

    // console.log(payment, user?.Booking[(user.Booking.length - 1)])

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formatted = new Date(user?.Booking[(user.Booking.length - 1)]?.created_at).toLocaleDateString('en-US', options);

    const start = new Date(user?.Booking[(user.Booking.length - 1)]?.check_in);
    const end = new Date(user?.Booking[(user.Booking.length - 1)]?.check_out);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const totalPrice = (Math.ceil(user?.Booking[(user.Booking.length - 1)]?.total / 365) * diffDays)

    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;
    
        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);
    
        document.body.appendChild(scriptTag);
        return () => {
          document.body.removeChild(scriptTag);
        };
    }, []);

    const handleBuy = useMutation(async (e) => {
        try {
          e.preventDefault();

          setAuthToken(localStorage.token);
    
          const config = {
            headers: {
              'Content-type': 'application/json',
            },
          };
    
          const data = {
            total : totalPrice,
            status : user?.Booking[(user.Booking.length - 1)].status,
            check_in : user?.Booking[(user.Booking.length - 1)].check_in,
            check_out : user?.Booking[(user.Booking.length - 1)].check_out,
            address_transaction : user?.Booking[(user.Booking.length - 1)].address_transaction,
            property_id : user?.Booking[(user.Booking.length - 1)].property_id,
            user_id : idUser.id,       
        };
    
          const body = JSON.stringify(data);

          const response = await API.post('/transaction', body, config);
          console.log("transaction success :", response)
    
          const token = response.data.data.token;
          window.snap.pay(token, {
            onSuccess: function (result) {
              /* You may add your own implementation here */
              console.log(result);
              navigate("/userProfile");
            },
            onPending: function (result) {
              /* You may add your own implementation here */
              console.log(result);
              navigate("/userProfile");
            },
            onError: function (result) {
              /* You may add your own implementation here */
              console.log(result);
              navigate("/userProfile");
            },
            onClose: function () {
              /* You may add your own implementation here */
              alert("you closed the popup without finishing the payment");
            },
          });

          await API.delete('/booking/' + user?.Booking[(user.Booking.length - 1)].id)

        } catch (error) {
          console.log("transaction failed : ", error);
        }
    });

    return (
        <>
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
                                    <p className="text-center"> {formatted} </p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-evenly mt-3">
                            <div>
                                <div>
                                    <h2> {payment?.name} </h2>
                                </div>
                                <div>
                                    <p>  {payment?.address} </p>
                                </div>
                                <div>
                                    <p className="btn btn-outline-danger mt-4" style={{cursor:'default'}}> {user?.Booking[(user.Booking.length - 1)]?.status} </p>
                                </div>
                            </div>
                            <div className="InfoTrip">
                                <div className="m-3">
                                    <h5> Check-In </h5>
                                    <p> {user?.Booking[(user.Booking.length - 1)]?.check_in} </p>
                                </div>
                                <div className="m-3">
                                    <h5> Amenities </h5>
                                    <div className="ms-3">
                                        <p> {payment?.furnished} </p>
                                        <p> {payment?.pet} </p>
                                        <p> {payment?.shared_accomodation} </p>
                                    </div>
                                </div>
                                <div className="m-3">
                                    <h5> Check-Out </h5>
                                    <p> {user?.Booking[(user.Booking.length - 1)]?.check_out} </p>
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
                                <td> {user?.name} </td>
                                <td></td>
                                <td> {user?.phone} </td>
                                <td> {user?.gender} </td>
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
                                <td> {Convert(totalPrice)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div >
                    <div className="d-flex justify-content-end my-5">
                        <Button variant="warning" size="lg" type="submit" onClick={(e) => handleBuy.mutate(e)}> Pay Now </Button>
                    </div>                
                </div>
            </div>
        </>
    )
}