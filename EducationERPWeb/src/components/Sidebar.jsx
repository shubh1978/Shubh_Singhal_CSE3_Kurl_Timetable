import React, {useEffect, useState} from 'react';

import {ChevronsLeft, ChevronsRight} from 'lucide-react';
import {MdOutlineFreeBreakfast} from 'react-icons/md';
import {NavLink, useNavigate} from 'react-router-dom';
import logo from '../assets/images/Kurl.png';
import Dash from '../assets/images/Dash.svg';
import Timetable from '../assets/images/Frame.svg';
import vector from '../assets/images/Vector.svg';
import Campus from '../assets/images/Vector.svg';
import Staff from '../assets/images/Staff.svg';
import Subject from '../assets/images/Subject.svg';
import Class from '../assets/images/Class.svg';
import Reports from '../assets/images/Reports.svg';
import Periods from '../assets/images/Periods.svg';
import Setting from '../assets/images/Setting.svg';
import Logout from '../assets/images/Logout.svg';

import {MdGroups} from 'react-icons/md';

import '../assets/css/Sidebar.css';
import Dashboard from '../pages/Dashboard/Dashboard';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/slices/userSlice';
import {gotoDashboard} from '../redux/slices/dashBoardSlice';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const [filteredData, setFilteredData] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout);
    navigate('/login', {replace: true});
  };

  const udata = localStorage.getItem('userData');
  const userData = JSON.parse(udata);
  const role = userData.authentication.principal.role;
  useEffect(() => {
    if (role === 'CAMPUS_ADMIN') {
      const arr = menuItem.filter(it => it.path !== '/main/campuses')
      setFilteredData(arr);
    } else {
      setFilteredData(menuItem);
    }
  }, []);

  const menuItem = [
    {
      path: '/main/dashboard',
      name: 'Dashboard',
      icon: <img src={Dash} className="icondesign" />,
      class: 'abc',
    },

    {
      path: '/main/campuses',
      name: 'Campus',
      icon: <img src={Campus} className="icondesign" />,
    },
    {
      path: '/main/shift',
      name: 'Shift/Periods',
      icon: <img src={Campus} className="icondesign" />,
    },
    {
      path: '/main/students',
      name: 'Students',
      icon: <img src={vector} className="icondesign" />,
      class: 'line-break',
    },
    {
      path: '/main/teachers',
      name: 'Staff',
      icon: <img src={Staff} className="icondesign" />,
    },
    {
      path: '/main/group',
      name: 'Groups',
      icon: <MdGroups className="icondesign" />,
    },
    {
      path: '/main/classes',
      name: 'Classes',
      icon: <img src={Class} className="icondesign" />,
    },
    {
      path: '/main/subjects',
      name: 'Subjects',
      icon: <img src={Subject} className="icondesign" />,
    },

    {
      path: '/main/combinedClasses',
      name: 'Combined Classes',
      icon: <img src={Subject} className="icondesign" />,
    },
    {
      path: '/main/classesStatus',
      name: 'Classes Status',
      icon: <img src={Subject} className="icondesign" />,
    },
    {
      path: '/main/Substitutionsheet',
      name: 'Manage Substitution',
      icon: <img src={Periods} className="icondesign" />,
    },
    {
      path: '/main/manageLeave',
      name: 'Manage Leave',
      icon: <img src={Periods} className="icondesign" />,
    },
    {
      path: '/main/classTimetables',
      name: 'Class TimeTables',
      icon: <img src={Timetable} className="icondesign" />,
    },
    {
      path: '/main/teacherTimetables',
      name: 'Teacher TimeTables',
      icon: <img src={Timetable} className="icondesign" />,
    },
    {
      path: '/main/subjectTimetables',
      name: 'Subject TimeTables',
      icon: <img src={Timetable} className="icondesign" />,
    },
    {
      path: '/main/substitutionList',
      name: 'Print Substitution List',
      icon: <img src={Timetable} className="icondesign" />,
    },
    {
      path: '/main/report',
      name: 'Need more reports here',
      icon: <img src={Reports} className="icondesign" />,
    },
    // {
    //   path: '/main/periods',
    //   name: 'Periods',
    //   icon: <img src={Periods} className="icondesign" />,
    // },

    // {
    //   path: "/main/classwise",
    //   name: "ClassWise",
    //   icon: "",
    // },
    {
      path: '/main/settings',
      name: 'Users',
      icon: <img src={Setting} className="icondesign" />,
    },

    {
      path: '/main/UserRoles',
      name: 'User Roles & Permissions(Admin, Sub Admin, Users)',
      icon: <img src={Setting} className="icondesign" />,
    },
    {
      path: '/login',
      name: 'LogOut',
      icon: <img src={Logout} className="icondesign" />,
    },
  ];

  return (
    <div className="contaiiner">
      <div
        style={{
          width: isOpen ? '240px' : '50px',
          overflow: isOpen ? 'scroll' : 'hidden',
          scrollbarcolor: isOpen ? 'pinkLightblue' : ' ',
        }}
        className="sidebar">
        <div className="top_section">
          <h1 style={{display: isOpen ? 'block' : 'none'}} className="logo">
            <img src={logo} alt="logo" />
            {/* KURL */}
          </h1>
          <div style={{marginLeft: isOpen ? '40px' : '0px'}} className="bars">
            {/* <FaBars onClick={toggle}/> */}
            {/* <FaBars onClick={toggle} /> */}

            {isOpen ? (
              <ChevronsLeft size={40} strokeWidth={1} onClick={toggle} />
            ) : (
              <ChevronsRight
                size={40}
                strokeWidth={1}
                style={{marginTop: '-10px'}}
                onClick={toggle}
              />
            )}
          </div>
        </div>
        {filteredData.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="activate"
            onClick={() => {
              (item.name === 'LogOut') ? handleLogout() : navigate(item.path)
              if(item.name === 'Dashboard'){
                 dispatch(gotoDashboard(true))
              }
            }
            }>
            <div
              style={{display: 'flex'}}
              // className="activate"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{
                  display: isOpen ? 'block' : 'none',
                  fontSize: '16px',
                  margin: 'auto',
                  textAlign: 'center',
                }}
                className="link_text">
                {item.name}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
      {/* // <main style={{width:"500px"}}>{children}</main> */}
    </div>
  );
};

export default Sidebar;
