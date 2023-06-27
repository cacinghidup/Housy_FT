import { useContext, useEffect, useState } from "react";
import { Button, Container, Image, Navbar } from "react-bootstrap";
import { UserContext } from "../../context/userContext";
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";
import NavbarAdmin from "./NavbarAdmin";
import NavbarUser from "./NavbarUser";
import logo from "./logo.png";

export default function NavbarHome() {
    const [state] = useContext(UserContext)
    const [showLogin, setShowLogin] = useState(false);
    const handleClose = () => setShowLogin(false);
    const handleShow = () => setShowLogin(true);

    const [showRegister, setShowRegister] = useState(false);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    const [User, setUser] = useState(false);
    const showUser = () => setUser(true)

    const [Admin, setAdmin] = useState(false);
    const showAdmin = () => setAdmin(true);

    // console.log('INi di Navbar', state)
    // const user = jwtDecode(localStorage.token);

    // console.log(user)

    useEffect(() => {
        if ( state.role === 'buyer' ) {
            showUser()
        } else if ( state.role === 'admin' ) {
            showAdmin()
        }
    }, [state])

    return (
        <>
            <Navbar expand="md" variant="light" className='MainNav d-flex justify-content-between border-bottom border-3 shadow-sm'>
                <Navbar className='NavbarLeft'>
                    <Container>
                        <a href='/'>
                            <Image style={{marginLeft: '60px'}} className='Text' src={logo} alt='logo'/>
                        </a>
                    </Container>
                </Navbar>
                {User ? (<NavbarUser id={state.user.user_id}/>) : Admin ? (<NavbarAdmin id={state.user.user_id}/>) : (
                    <Navbar className='NavbarRight'>
                    <Container className='ContPadZ'>
                        <Button variant='outline-primary' className='Text Button' onClick={handleShow}>Login</Button>
                    </Container>
                    <Container className='ContPadZ'>
                        <Button variant='outline-primary' className='Text ButtonReg' onClick={handleShowRegister} >Register</Button>
                    </Container>
                    </Navbar>
                )}
            </Navbar>
            <ModalLogin show={showLogin} hidden={handleClose} showRegister={handleShowRegister}/>
            <ModalRegister show={showRegister} hidden={handleCloseRegister}/>
        </>
    )
}