import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { API } from "../config/api";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { UserContext } from "../context/userContext";
import { useEffect } from "react";

export default function MainPage() {

    const [state] = useContext(UserContext)
    const APIKey = process.env.REACT_APP_API_KEY

    let Navigate = useNavigate()

    useEffect(() => {
        if (state.role === 'admin') {
          Navigate('/admin')
        }
        //eslint-disable-next-line
    },[state])

    const [city, setCity] = useState({
        provinsi: "",
    });

    const handleChange = (e) => {
        setCity({
            ...city,
            [e.target.name]: e.target.value,
        });
    }

    const { data : province } = useQuery(['province'], async () => {
        const response = await axios.get(`https://api.binderbyte.com/wilayah/provinsi?api_key=${APIKey}`);
        return response.data.value;
    },{
        refetchOnWindowFocus: true
    })

    const { data : cityFilter } = useQuery(['city'], async () => {
        const response = await axios.get(`https://api.binderbyte.com/wilayah/kabupaten?api_key=${APIKey}&id_provinsi=${city.provinsi}`);
        return response.data.value;
    }, {
        refetchInterval: 5000,
    })
    
    const { data : house } = useQuery(['house'], async () => {
        const response = await API.get('/propertys');
        return response.data.data;
    }, {
        refetchInterval: 1000,
    })

    // Filter berdasarkan ready atau tidak
    const filterReady = house?.filter((item) => {
        return item?.ready === true
    })

    const [priceFilter, setPriceFilter] = useState({
        max: "",
    })

    // Filter berdasarkan harga
    const FilterPrice = filterReady?.filter((item) => {
        for (const key in priceFilter) {
            if (priceFilter[key] != '' && item.price > priceFilter[key]) {
                return false;
            }
        }
        return true;
    })

    const handleChangePrice = (e) => {
        setPriceFilter({
            ...priceFilter,
            [e.target.name]: e.target.value,
        });
    }

    // console.log(house);

    // Filter berdasarkan banyak parameter
    const [filters, setFilters] = useState({
        bedroom: "",
        city: "",
        bathroom: "",
        price: "",
        furnished: "",
        pet: "",
        shared_accomodation: "",
    });

    const handleFiltersChange = (event) => {
    //   const { name, value } = event.target;
      setFilters({ ...filters, [event.target.name]: event.target.value });
    };
  
    const filteredData = FilterPrice?.filter((item) => {
      for (const key in filters) {
        if (filters[key] != '' && item[key] != filters[key]) {
          return false;
        }
      }
      return true;
    });

    // console.log("Testttt", filters)
    // console.log("Testttt222222", handleFiltersChange)
    // console.log("Testttt333333", filteredData)

    function handleResetFilters() {
        setFilters({
            bedroom: "",
            city: "",
            bathroom: "",
            price: "",
            furnished: "",
            pet: "",
            shared_accomodation: "",
        })
        setPriceFilter({
            max: "",
        })
        setCity({
            provinsi: "",
        })
    }

    return (
        <div className="d-flex col justify-content-center m-1 p-0">
            <div className="d-flex justify-content-center left-filter border-end shadow-sm">
                <Container>
                <Form className="d-flex row align-items-center">
                    <Form.Group>
                        <h2 className="Text m-2"> Filter Property </h2>
                        <Form.Label className="Text TextFilter m-2"> Provinsi </Form.Label>
                        <select className="form-select" style={{width: '500px'}} onChange={handleChange} name="provinsi">
                            <option disabled selected></option>
                                {province?.map((data) => (
                                    <option value={data?.id} key={data.id}> {data?.name} </option>
                                ))}
                        </select>
                        <Form.Label className="Text TextFilter m-2"> Kota </Form.Label>
                        <select className="form-select" style={{width: '500px'}} onChange={handleFiltersChange} name="city">
                            <option disabled selected></option>
                                {cityFilter?.map((data) => (
                                    <option value={data?.name} key={data.id}> {data?.name} </option>
                                ))}
                        </select>
                        <Form.Label className="Text TextFilter m-2"> Property Room </Form.Label>
                            <div>
                                <Form.Text muted className="Text mx-2"> Bedroom </Form.Text>
                            </div>
                            <div className="d-flex justify-content-evenly mt-2">
                                <div>
                                    <input  value={1 || ''}
                                            onChange={handleFiltersChange}
                                            type="radio" 
                                            className="btn-check" 
                                            name="bedroom" 
                                            id="btn-check-1" 
                                            autoComplete="off"/>
                                    <label className="btn btn-outline-primary Text" htmlFor="btn-check-1">1</label>
                                </div>
                                <div>
                                    <input  value={2 || filters.bedroom}
                                            onChange={handleFiltersChange}
                                            type="radio" 
                                            className="btn-check" 
                                            name="bedroom" 
                                            id="btn-check-2" 
                                            autoComplete="off"/>
                                    <label className="btn btn-outline-primary Text" htmlFor="btn-check-2">2</label>
                                </div>
                                <div>
                                    <input  value={3 || filters.bedroom}
                                            onChange={handleFiltersChange}
                                            type="radio" 
                                            className="btn-check" 
                                            name="bedroom" id="btn-check-3" 
                                            autoComplete="off"/>
                                    <label className="btn btn-outline-primary Text" htmlFor="btn-check-3">3</label>
                                </div>
                                <div>
                                    <input  value={4 || filters.bedroom}
                                            onChange={handleFiltersChange}
                                            type="radio" 
                                            className="btn-check" 
                                            name="bedroom" 
                                            id="btn-check-4" 
                                            autoComplete="off"/>
                                    <label className="btn btn-outline-primary Text" htmlFor="btn-check-4">4</label>
                                </div>
                                <div>
                                    <input  value={5 || filters.bedroom}
                                            onChange={handleFiltersChange}
                                            type="radio" 
                                            className="btn-check" 
                                            name="bedroom" 
                                            id="btn-check-5" 
                                            autoComplete="off"/>
                                    <label className="btn btn-outline-primary Text" htmlFor="btn-check-5">5</label>
                                </div>
                            </div>
                            <div>
                                <Form.Text muted className="Text mx-2"> Bathroom </Form.Text>
                            </div>
                            <div className="d-flex justify-content-evenly mt-2">
                                <div>
                                    <input  value={1 || ''}
                                            onChange={handleFiltersChange}
                                            type="radio" 
                                            className="btn-check" 
                                            name="bathroom" 
                                            id="btn-check-6" 
                                            autoComplete="off"/>
                                    <label className="btn btn-outline-primary Text" htmlFor="btn-check-6">1</label>
                                </div>
                                <div>
                                    <input  value={2 || ''}
                                            onChange={handleFiltersChange}
                                            type="radio" 
                                            className="btn-check" 
                                            name="bathroom" 
                                            id="btn-check-7" 
                                            autoComplete="off"/>
                                    <label className="btn btn-outline-primary Text" htmlFor="btn-check-7">2</label>
                                </div>
                                <div>
                                    <input  value={3 || ''}
                                            onChange={handleFiltersChange}
                                            type="radio" 
                                            className="btn-check" 
                                            name="bathroom" 
                                            id="btn-check-8" 
                                            autoComplete="off"/>
                                    <label className="btn btn-outline-primary Text" htmlFor="btn-check-8">3</label>
                                </div>
                                <div>
                                    <input  value={4 || ''}
                                            onChange={handleFiltersChange}
                                            type="radio" 
                                            className="btn-check" 
                                            name="bathroom" 
                                            id="btn-check-9" 
                                            autoComplete="off"/>
                                    <label className="btn btn-outline-primary Text" htmlFor="btn-check-9">4</label>
                                </div>
                                <div>
                                    <input  value={5 || ''}
                                            onChange={handleFiltersChange}
                                            type="radio" 
                                            className="btn-check" 
                                            name="bathroom" 
                                            id="btn-check-10" 
                                            autoComplete="off"/>
                                    <label className="btn btn-outline-primary Text" htmlFor="btn-check-10">5</label>
                                </div>
                            </div>
                            <Form.Label className="Text TextFilter mt-3"> Amenities </Form.Label>
                            <div className="form-check m-3 d-flex justify-content-between mt-0">
                                <label className="form-check-label Text" htmlFor="reverseCheck1">
                                    Furnished
                                </label>
                                <input  value="Furnished"
                                        onChange={handleFiltersChange}
                                        className="form-check-input"
                                        name="furnished" 
                                        type="checkbox" 
                                        id="reverseCheck1"/>
                            </div>
                            <div className="form-check m-3 d-flex justify-content-between">
                                <label className="form-check-label Text" htmlFor="reverseCheck1">
                                    Pet Allowed
                                </label>
                                <input  value="PetAllowed"
                                        onChange={handleFiltersChange}
                                        className="form-check-input" 
                                        type="checkbox" 
                                        name="pet"
                                        id="reverseCheck1"/>
                            </div>
                            <div className="form-check m-3 d-flex justify-content-between">
                                <label className="form-check-label Text" htmlFor="reverseCheck1">
                                    Shared Accomodation
                                </label>
                                <input  value="SharedAccomodation"
                                        onChange={handleFiltersChange}
                                        className="form-check-input"
                                        name="shared_accomodation" 
                                        type="checkbox" 
                                        id="reverseCheck1"/>
                            </div>
                            <Form.Label className="Text TextFilter mt-2"> Budget </Form.Label>
                            <div className="row g-3 align-items-center d-flex justify-content-around">
                                <div className="col-auto">
                                    <label htmlFor="price" className="col-form-label Text"> Less than IDR </label>
                                </div>
                                <div className="col-auto">
                                    <input   
                                            onChange={handleChangePrice} 
                                            min={0} 
                                            type="number" 
                                            name="max" 
                                            className="form-control"
                                            pattern=""/>
                                </div>
                            </div>
                    </Form.Group>
                    <Container>
                        <Button onClick={handleResetFilters} className='btn btn-warning w-100 mt-3' variant="secondary" type='submit'>
                            Reset Filters
                        </Button>
                    </Container>
                </Form>
                </Container>
            </div>
            <div className="d-flex justify-content-center right-home">
                <div className='GridGroupTour'>
                    {filteredData?.map((variant) => (
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
                            <Link style={{textDecoration:'none', cursor:'pointer'}} to={`/detailProperty/${variant.id}`}>
                                <Card.Title className='pt-2 GroupCardTitle' style={{color: 'black'}}>{variant.name}</Card.Title>
                            </Link>
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
                            </div>
                            </Card.Body>
                        </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>    
    )
}