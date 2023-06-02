import logoIcon from '../images/fridge-icon.png';
import { Nav, Navbar, Container } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { GiOpenBook, GiPadlock, GiPadlockOpen } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

function Navbars () {

  const navigate = useNavigate();
  const userId = localStorage.getItem('id');

  const handleLogout = () => {
    let result = window.confirm(`'${userId}'님 정말 로그아웃 하시겠습니까?`);
    if(result){
    localStorage.clear('id');
    navigate('/');
    }
  }

    return (
        <Navbar expand="lg" className="nav" style={{ marginBottom: "70px"}} >
          <Container fluid>
            <div className='logo_align'>
            <Navbar.Brand href="/">
              <img src={logoIcon} alt="logo_icon" className="logoIcon"/>
              <span className="logo"> 냉장고를 부탁해 </span>
            </Navbar.Brand>
            </div>
            <div className='nav_link_align'>
            <Navbar.Toggle aria-controls="navbarScroll"/>
            <Navbar.Collapse id="navbarScroll">
              <Nav className="justify-content-end flex-grow-1 pe-3" navbarScroll>
                <Nav.Link href="/recipes"> <p className="nav_link"> 레시피 <GiOpenBook size="29px"/> </p> </Nav.Link>
                <Nav.Link href="/board" > <p className="nav_link"> 게시판 <BsPeopleFill size="28px"/> </p></Nav.Link>
                {userId ? (
                  <Nav.Link>
                    <p className="nav_link" onClick={handleLogout}> 로그아웃 <GiPadlockOpen size="26px"/></p>
                  </Nav.Link>
                ) : (
                  <Nav.Link href="/login"><p className="nav_link"> 로그인 <GiPadlock size="26px"/></p></Nav.Link>
                )}
                {userId ? (
                  <Nav.Link href="/mypage"> <p className="nav_link"> 마이페이지 <FaUserCircle size="28px"/> </p></Nav.Link>
                ) : (
                  <Nav.Link onClick={() => alert('로그인을 해주세요.')}><p className="nav_link"> 마이페이지 <FaUserCircle size="28px"/> </p></Nav.Link>
                )}
                
             </Nav>
          </Navbar.Collapse>
          </div>
         </Container>
        </Navbar>
      )

}

export default Navbars;