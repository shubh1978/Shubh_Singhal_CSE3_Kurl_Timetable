import React, { useState } from "react";
import "../assets/css/selectTagStyle.css";
import Accordion from "react-bootstrap/Accordion";
import "../assets/css/ShiftModal.css"

function SelectTag({ placeholder, children,formData }) {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div style={{margin: '13px 0', width: '100%'}}>
      <Accordion className="w-100">
        <Accordion.Item
          eventKey="0"
          className={`p-0  border-2  ${isFocused ? 'b' : ''}`}>
          <Accordion.Header
            className="position-relative "
            onClick={() => {
              setIsFocused(!isFocused);
            }}>
            <div
              className={`position-absolute px-1 bg-white start-20  ${
                isFocused ? ' translate-middle-y top-0 ' : ''
              }`}>
              {placeholder}
              {formData && 
              !isFocused ? (
                <div>
                  <ul className="flex daysList">
                    {formData.daysInWeek.map((selectedDay, idx) => (
                      <li>{selectedDay.slice(0,3)}</li>

                    ))}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          </Accordion.Header>
          <Accordion.Body>{children}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
export default SelectTag;