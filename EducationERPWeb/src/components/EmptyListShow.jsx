import React from "react";
import mask from "../assets/images/Vector.png";
import "../assets/css/ShiftModal.css";
import "../assets/css/EmptyListShow.css";

const EmptyListShow=({name})=>{
    return (
      <div className="EmptyListOuter">
        <div
          className="EmptyContainer EmptyColumnFlex"
          style={{ whiteSpace: "pre" }}
        >
          <div>
            <img src={mask} />
          </div>
          <p className="EmptyListText">
            No {name} Added, Please, Click<br/>
            above on <span className="EmptyListSpan" style={{ color: "red" }}>“Add {name}"</span> to
            proceed.
          </p>
        </div>
      </div>
    );
}
export default EmptyListShow;