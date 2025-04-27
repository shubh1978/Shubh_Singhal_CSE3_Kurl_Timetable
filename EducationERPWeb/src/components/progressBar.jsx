import React from 'react';
import {TiTick} from 'react-icons/ti';
import {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const ProgressBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    var updatedList = stepsList.map(step => ({
      ...step,
      isSelected: location.pathname === step.path,
    }));

    var selectedId = updatedList.filter(step => step.isSelected == true)[0]?.id;
    updatedList = updatedList.map(step => ({
      ...step,
      isSelected: selectedId > step?.id - 1 ? true : false,
    }));
    setStepList(updatedList);
  }, [location.pathname]);
  const [stepsList, setStepList] = useState([
    {
      id: 0,
      name: 'Shift',
      path: '/shift',
      isSelected: false,
    },
    {
      id: 1,
      name: 'Class',
      path: '/class',
      isSelected: false,
    },
    {
      id: 2,

      name: 'Group',
      path: '/group',
      isSelected: false,
    },
    {
      id: 3,

      name: 'Subject',
      path: '/subject',
      isSelected: false,
    },
    {
      id: 4,

      name: 'Staff',
      path: '/staff',
      isSelected: false,
    },
    {
      id: 5,

      name: 'Student',
      path: '/student',
      isSelected: false,
    },
  ]);

  const isMobile = window.innerWidth <= 512;
  return (
    <div className="left-navbar">
      <div className="flex flex-col pbspce">
        {stepsList?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${
              step.isSelected === true ? 'active' : 'no-active'
            } ${step.isSelected === true ? 'complete' : 'no-complete'} `}>
            <div className="headingTag cursor-default">
              <div style={isMobile ? {} : {}} className="step">
                {step.isSelected ? (
                  <TiTick style={{color: 'white'}} size={22} />
                ) : (
                  ''
                )}
              </div>
              <p
                style={isMobile ? {} : {}}
                className="text-gray-500"
                onClick={() => {
                  location.pathname != '/shift' ? navigate(`${step.path}`) : <></>;
                }}>
                {step.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
