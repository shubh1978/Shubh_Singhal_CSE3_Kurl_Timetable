import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {changePasswordOp} from '../services/operations/authOperations';
import ChangePassModal from './ChangePassModal';
import {logout} from '../redux/slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {IoIosHome} from 'react-icons/io';
import '../assets/css/Navbar.css';

function NavBar() {
  const [showChangePaaForm, setShowChangePassForm] = useState(false);
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 512);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 512);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function callBack(data) {
    changePasswordOp(data, setShowChangePassForm, navigate);
  }

  const handleLogout = () => {
    navigate('/login', {replace: true});
    localStorage.clear();
    dispatch(logout());
  };

  const HomeButton = () => {
    navigate('/school');
  };

  const {selectedSchool, selectedCampus, userData, selectedShift} = useSelector(
    state => state.userInfo,
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const isMobile = window.innerWidth <=512;

  return (
    <>
      <Navbar
        // style={
        //   isMobile
        //     ? {display: 'flex', justifyContent: 'space-between'}
        //     : {width: '83%'}
        // }
        className="bg-body-tertiary justify-content-between container px-4 bg-opacity-10 bar-maintop ">
        {location.pathname !== '/school' && location.pathname !== '/campus' ? (
          <>
            {isMobile ? (
              <div className="d-flex gap-3">
                <Button variant="danger h-25" onClick={handleShow}>
                  ☰
                </Button>
                <Offcanvas
                  show={show}
                  onHide={handleClose}
                  placement="start"
                  className="custom-offcanvas">
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <div className="d-flex flex-wrap w-25">
                      <Button
                        // style={{fontSize: '0.75rem'}}
                        variant="primary"
                        onClick={() => setShowChangePassForm(true)}>
                        Change Password
                      </Button>
                      <Button
                        style={{padding: '4px 20px'}}
                        variant="danger"
                        onClick={handleLogout}>
                        Logout
                      </Button>
                    </div>
                  </Offcanvas.Body>
                </Offcanvas>
                <div
                  className="d-flex align-items-center"
                  style={{fontSize: '0.72rem'}}
                  // style={
                  //   !isMobile
                  //     ? {
                  //         justifyContent: 'flex-start',
                  //       }
                  //     : {marginLeft: '10px'}
                  // }
                >
                  <strong className="roboto-regular">
                    {selectedSchool?.name}
                  </strong>
                  <p>|</p>
                  <strong className="roboto-regular">
                    {selectedCampus?.name}
                  </strong>
                  <p>|</p>

                  {location.pathname !== '/shift' ? (
                    <>
                      |
                      <strong className="roboto-regular">
                        {selectedShift?.name}
                      </strong>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <Button variant="danger" onClick={HomeButton}>
                  <IoIosHome />
                </Button>
              </div>
            ) : (
              <>
                <div
                  className="d-flex"
                  // style={
                  //   !isMobile
                  //     ? {
                  //         justifyContent: 'flex-start',
                  //       }
                  //     : {marginLeft: '10px'}
                  // }
                >
                  <Button variant="danger" onClick={HomeButton}>
                    <IoIosHome />
                  </Button>
                  <h4>{selectedSchool?.name}</h4> |
                  <h4>{selectedCampus?.name}</h4>
                  {location.pathname !== '/shift' ? (
                    <>
                      |<h4> {selectedShift?.name}</h4>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <Form>
                  <Row className="navbarDesign">
                    <Col xs={8}>
                      <Button
                        type="button"
                        onClick={() => setShowChangePassForm(true)}>
                        Change Password
                      </Button>
                    </Col>
                    <Col xs={4}>
                      <Button
                        type="button"
                        className="mt-2 mt-lg-0"
                        variant="danger"
                        onClick={handleLogout}>
                        Logout
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </>
            )}
          </>
        ) : (
          <>
            <div></div>
            <div>
              <Form>
                <Row className="navbarDesign">
                  <Col xs={8}>
                    <Button
                      type="button"
                      onClick={() => setShowChangePassForm(true)}>
                      Change Password
                    </Button>
                  </Col>
                  <Col xs={4}>
                    <Button
                      type="button"
                      className="mt-0 mt-lg-0  "
                      variant="danger"
                      onClick={handleLogout}>
                      Logout
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </>
        )}
        {/* <div
          className="d-flex"
          // style={
          //   !isMobile
          //     ? {
          //         justifyContent: 'flex-start',
          //       }
          //     : {marginLeft: '10px'}
          // }
        >
          <h4>{selectedSchool?.name}</h4> |<h4>{selectedCampus?.name}</h4>|
          <h4>{selectedShift?.name}</h4>
        </div> */}
        {/* <div className="mb-2">
          <strong>{selectedSchool?.name}</strong> |{' '}
          <strong>{selectedCampus?.name}</strong> |{' '}
          <strong>{selectedShift?.name}</strong>
        </div> */}
        {/* <InputGroup.Text id="basic-addon1">KURL</InputGroup.Text> */}
        {/* <Form inline>
          <InputGroup></InputGroup>
        </Form> */}
      </Navbar>
      <ChangePassModal
        showModal={showChangePaaForm}
        setShowModal={setShowChangePassForm}
        cb={callBack}
      />
    </>
  );
}

export default NavBar;
