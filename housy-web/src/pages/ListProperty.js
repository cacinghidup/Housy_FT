import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Card, Container } from "react-bootstrap";
import { API } from "../config/api";

export default function ListProperty() {

    const { data: property } = useQuery(['allProperty'], async () => {
        const response = await API.get('/propertys');
        return response.data.data;
    },{
        refetchInterval: 1000,
        refetchIntervalInBackground: true,
    });

    const handleDelete = useMutation(async (id) => {
        try {
            await API.delete(`/property/${id}`);
            console.log("Berhasil Menghapus",id);
        } catch (error) {
            console.log("Gagal Menghapus",error);
        }
    });

    return (
        <>
        <Container>
            <div className="mt-3">
                <h2> List Property </h2>
            </div>
        <div className="d-flex col justify-content-center m-1 p-0">
            <div className="d-flex justify-content-center right-home">
                <div className='GridGroupTour'>
                    {property?.map((variant) => (
                        <div className='col p-0 m-2' key={variant.id}>
                        <Card className='GroupCard p-2 my-4'>
                            <div style={{position:'relative'}}>
                                <div>
                                    <Card.Img style={{height:'250px', width:'100%'}} className='GroupCardImage' variant="top" src={(variant.uploadImage)}/>
                                </div>
                                <div>
                                    <p style={{display:'none'}} className={`${variant.furnished}`}> Furnished </p>
                                </div>
                                <div>
                                    <p style={{display:'none'}} className={`${variant.pet}`}> Pet Allowed </p>
                                </div>
                                <div>
                                    <p style={{display:'none'}} className={`${variant.shared_accomodation}`}> Share Accomodation </p>
                                </div>
                            </div>
                            <Card.Body className='row d-flex justify-content-start m-0 p-0' style={{textAlign:'center'}}>
                            <Card.Title className='pt-2 GroupCardTitle' style={{color: 'black'}}>{variant.name}</Card.Title>
                            <div className='GroupCardPrice mt-2 m-0'>
                                <Card.Text style={{color: 'black', textAlign:'left'}}>
                                    IDR {(variant.price).toLocaleString()} / Year
                                </Card.Text>
                                <Card.Text style={{color: 'black', textAlign:'left'}}>
                                    {variant.bedroom} Beds, {variant.bathroom} Baths, {variant.area}sqft
                                </Card.Text>
                                <Card.Text muted style={{color: 'black', textAlign:'left'}}>
                                    {variant.province}, {variant.city}
                                </Card.Text>
                                <hr/>
                                {variant?.ready ? (<div style={{color: 'green'}}>Property Tersedia</div>) : (<div style={{color: 'red'} }>Property Terjual</div>)}
                                <hr/>
                            </div>
                            {variant?.ready ? (
                            <Button className="btn btn-danger" variant="danger" onClick={() => handleDelete(variant.id)}>
                                Delete Property
                            </Button>
                            ) : (
                            <div></div>
                            )}
                            </Card.Body>
                        </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </Container>
        </>
    )
}