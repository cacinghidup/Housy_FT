import { useQuery } from "@tanstack/react-query"
import { Container, Dropdown, DropdownButton, Image, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import { API } from "../../config/api"

export default function NavbarAdmin({id}) {

    const { data : user } = useQuery(['user'], async () => {
        const response = await API.get('/user/' + id);
        return response.data.data
    })

    const imageNav = <div><Image roundedCircle height='50' width='50' src={user?.image} alt='user'/></div>

    return (
        <>
        <Navbar className='NavbarRightUser'>
            <Container className='ContPadZ'>
                    <DropdownButton title={imageNav}>
                        <Dropdown.Item>
                                <Link style={{textDecoration:'none', color:'black'}} to="/adminProfile">
                                <span className="fa-solid fa-map-pin" style={{color: '#88f231', marginRight:'20px'}}></span>
                                    My Profile
                                </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                                <Link style={{textDecoration:'none', color:'black'}} to="/addProperty">
                                <span className="fa-solid fa-map-pin" style={{color: '#88f231', marginRight:'20px'}}></span>
                                    Add Property
                                </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                                <Link style={{textDecoration:'none', color:'black'}} to="/listProperty">
                                <span className="fa-solid fa-map-pin" style={{color: '#88f231', marginRight:'20px'}}></span>
                                    List Property
                                </Link>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href='/' onClick={() => localStorage.clear()}>
                        <span className="fa-solid fa-right-from-bracket" style={{color: "#ff4000", marginRight:'10px'}}></span>Logout
                        </Dropdown.Item>
                    </DropdownButton>
            </Container>
        </Navbar>
        </>
    )
}