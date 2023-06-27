import { useQuery } from "@tanstack/react-query"
import { Container, Dropdown, DropdownButton, Image, Navbar } from "react-bootstrap"
import { Oval } from "react-loader-spinner"
import { Link } from "react-router-dom"
import { API } from "../../config/api"

export default function NavbarUser({id}) {
    // const [state] = useContext(UserContext)

    // const [id, setId] = useState(null)

    // useEffect(() => {
    //     if (state !== null) {
    //         setId(state.user.user_id)
    //     }
    // }, [state])

    const { data : user, isLoading } = useQuery(['user'], async () => {
        const response = await API.get('/user/' + id);
        return response.data.data
    })

    const imageNav = <div><Image roundedCircle height='50' width='50' src={user?.image} alt='user'/></div>

    return (
        <>
        <Navbar className='NavbarRightUser'>
            <Container className='ContPadZ'>
                    {isLoading  ?   (<Oval
                                        height={40}
                                        width={40}
                                        color="#6042f5"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                        ariaLabel='oval-loading'
                                        secondaryColor="#6042f5"
                                        strokeWidth={2}
                                        strokeWidthSecondary={2}
                                        />
                                    ) : (
                                            <DropdownButton title={imageNav}>
                                                <Dropdown.Item>
                                                    <Link style={{textDecoration:'none', color:'black'}} to='/userProfile'>
                                                    <span className="fa-regular fa-user" style={{color: '#ffd500', marginRight:'10px'}}></span>Profile
                                                    </Link>
                                                </Dropdown.Item>
                                                {/* <Dropdown.Item>
                                                    <Link style={{textDecoration:'none', color:'black'}} to='/userPayment'>
                                                    <span className="fa-solid fa-file-invoice-dollar" style={{color: '#38943a', marginRight:'10px'}}/> My Booking 
                                                    </Link>
                                                </Dropdown.Item> */}
                                                <Dropdown.Divider />
                                                <Dropdown.Item href='/' onClick={() => localStorage.clear()}>
                                                <span className="fa-solid fa-right-from-bracket" style={{color: "#ff4000", marginRight:'10px'}}></span>Logout
                                                </Dropdown.Item>
                                            </DropdownButton>
                                        )
                    }
            </Container>
        </Navbar>
        </>
    )
}