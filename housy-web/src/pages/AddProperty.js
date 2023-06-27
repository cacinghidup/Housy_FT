import { Container, Form } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { setAuthToken } from "../config/api";
import { useMutation } from "@tanstack/react-query";

export default function AddProperty() {
    const navigate = useNavigate();
    const APIKey = process.env.REACT_APP_API_KEY

    const [city, setCity] = useState({
        provinsi: "",
    });

    // console.log("Ini tuh kotaaaaa",city)
    
    const handleChange = (e) => {
        setCity({
            ...city,
            [e.target.name]: e.target.value,
        });
    }

    const { data : province } = useQuery(['provinceAdd'], async () => {
        const response = await axios.get(`https://api.binderbyte.com/wilayah/provinsi?api_key=${APIKey}`);
        return response.data.value;
    }, {
        refetchOnWindowFocus: true
    })

    // console.log("Test API ke 2 weh", province)

    const { data : cityFilter } = useQuery(['cityAdd'], async () => {
        const response = await axios.get(`https://api.binderbyte.com/wilayah/kabupaten?api_key=${APIKey}&id_provinsi=${city.provinsi}`);
        return response.data.value;
    }, {
        refetchInterval: 5000,
    })

    // const testtt = document.getElementById('provinsi')?.value
    // console.log(testtt)

    const [form, setForm] = useState({
        name: '',
        province: '',
        city: '',
        address: '',
        price: 0,
        furnished: '',
        pet: '',
        shared_accomodation: '',
        bedroom: 0,
        bathroom: 0,
        area: 0,
        description: '',
        uploadImage: '',
    })

    // console.log("Ini buat add property",form)

    const handleChangeAddProperty = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.type === 'file' ? e.target.files : e.target.value
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            setAuthToken(localStorage.token);

            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                }
            }

            const formData = new FormData();
            formData.set('name', form.name);
            formData.set('province', form.province);
            formData.set('city', form.city);
            formData.set('address', form.address);
            formData.set('price', form.price);
            formData.set('furnished', form.furnished);
            formData.set('pet', form.pet);
            formData.set('shared_accomodation', form.shared_accomodation);
            formData.set('bedroom', form.bedroom);
            formData.set('bathroom', form.bathroom);
            formData.set('area', form.area);
            formData.set('description', form.description);
            formData.set('uploadImage', form.uploadImage[0]);

            const response = await API.post('/propertys', formData, config);

            console.log("Berhasil Add Property : ", response)
            console.log("Data : ", formData)

            navigate('/admin')

         } catch (err) {
            console.log("Gagal Add Property :", err)
        }
    });


    return (
        <>
        <Container>
        <div className='BgAddTrip'>
            <div>
                <div>
                    <h3 className='mb-4'> Add Property </h3>
                </div>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <Form.Group className='mb-3'>
                        <Form.Label> Name Property </Form.Label>
                        <Form.Control 
                            id="name" 
                            type="text"
                            onChange={handleChangeAddProperty}
                            value={form.name}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label> Provinsi untuk Database </Form.Label>
                            <select className="form-select" id="province" onChange={handleChangeAddProperty}>
                                <option disabled selected></option>
                                    {province?.map((data) => (
                                        <option key={data?.id}> {data?.name} </option>
                                    ))}
                            </select>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label> Provinsi untuk Search Kota </Form.Label>
                            <select className="form-select" onChange={handleChange} name="provinsi">
                                <option disabled selected></option>
                                    {province?.map((data) => (
                                        <option value={data?.id} key={data?.id}> {data?.name} </option>
                                    ))}
                            </select>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label> Kota </Form.Label>
                            <select className="form-select" onChange={handleChangeAddProperty} id="city">
                                <option disabled selected></option>
                                    {cityFilter?.map((data) => (
                                        <option value={data?.name} key={data?.id}> {data?.name} </option>
                                    ))}
                            </select>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                            id="address" 
                            type="text"
                            onChange={handleChangeAddProperty}
                            value={form.address}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label> Price </Form.Label>
                        <Form.Control 
                            id='price' 
                            type="number"
                            min='0'
                            onChange={handleChangeAddProperty}
                            value={form.price}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Amenities</Form.Label>
                            <hr/>
                            <div className="form-check m-3 d-flex justify-content-between mt-0">
                                <label className="form-check-label Text" htmlFor="furnished">
                                    Furnished
                                </label>
                                <input  value="Furnished"
                                        className="form-check-input"
                                        id="furnished" 
                                        type="checkbox"
                                        onChange={handleChangeAddProperty} 
                                        />
                            </div>
                            <div className="form-check m-3 d-flex justify-content-between">
                                <label className="form-check-label Text" htmlFor="pet">
                                    Pet Allowed
                                </label>
                                <input  value="PetAllowed"
                                        className="form-check-input" 
                                        type="checkbox" 
                                        id="pet"
                                        onChange={handleChangeAddProperty}
                                        />
                            </div>
                            <div className="form-check m-3 d-flex justify-content-between">
                                <label className="form-check-label Text" htmlFor="shared_accomodation">
                                    Shared Accomodation
                                </label>
                                <input  value="SharedAccomodation"
                                        className="form-check-input"
                                        id="shared_accomodation" 
                                        type="checkbox"
                                        onChange={handleChangeAddProperty} 
                                        />
                            </div>
                            <hr/>
                    </Form.Group>
                    <Form.Group className='row mx-1 mb-3'>
                        <Form.Label>Facilities</Form.Label>
                        <Form.Control 
                            className='col' 
                            type="number" 
                            id='bedroom'
                            min='0'
                            max='5'
                            onChange={handleChangeAddProperty}
                            value={form.bedroom}
                            />
                        <Form.Label className='d-flex col align-items-center'>Beds</Form.Label>
                        <Form.Control 
                            className='col' 
                            type="number" 
                            id='bathroom'
                            min='0'
                            max='5'
                            onChange={handleChangeAddProperty}
                            value={form.bathroom}
                            />
                        <Form.Label className='d-flex col align-items-center'>Bathroom</Form.Label>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Area</Form.Label>
                        <Form.Control 
                            id='area' 
                            type="number"
                            min='0'
                            onChange={handleChangeAddProperty}
                            value={form.area}
                           />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            id='description' 
                            as="textarea"
                            style={{ height: '100px', resize: 'none' }}
                            onChange={handleChangeAddProperty}
                            value={form.description}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control 
                            id='uploadImage'
                            type="file" 
                            required 
                            onChange={handleChangeAddProperty}
                            />
                    </Form.Group>

                    <div className='d-flex justify-content-center mt-5'>
                        <Button variant="warning" type="submit" style={{width:'35%'}}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
        </Container>
        </>
    )
}