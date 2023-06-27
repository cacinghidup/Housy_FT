import {Container, Table} from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { API } from '../config/api';
import { useState } from 'react';
import ModalIncome from '../components/Admin/modalIncome';


export default function Admin() {
    const { data: order } = useQuery(['ordersCache'], async () => {
        const response = await API.get('/orders');
        return response.data.data;
    },{
        refetchInterval: 1000,
        refetchIntervalInBackground: true,
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    
    const [param, setParam] = useState(null);

    function handleClick(id) {
        setShow(true)
        setParam(id)
    }

    return (
        <Container>
        <div className="HomeAdmin mt-3">
            <div>
                <h2 style={{marginBottom:'25px'}}>Incoming Transaction</h2>
            </div>
            <div>
                <Table striped bordered hover className="mt-3 mb-0">
                    <thead>
                        <tr>
                        <th className="text-center">No</th>
                        <th>Users</th>
                        <th>Trip</th>
                        <th>Status Payment</th>
                        <th className="text-center">Detail</th>
                        </tr>
                    </thead>
                        {order?.map((variant, index) => (
                    <tbody>
                        <tr key={variant?.id}>
                        <td className="text-center">{(index + 1)}</td>
                        <td>{variant?.User?.name}</td>
                        <td>{variant?.Property?.name}</td>
                        <td>{variant?.status}</td>
                        <td style={{cursor:'pointer'}}  className="text-center"><i onClick={() => handleClick(variant.id)} className="fa-solid fa-magnifying-glass"/>
                        </td>
                        </tr>
                    </tbody>
                        ))}
                        <ModalIncome show={show} handleClose={handleClose} params={param}/>
                </Table>
            </div>
        </div>
        </Container>
    )
}