import React from "react";
import Popups from "../../components/ui/popup";

function layout({ children }) {
  return (
    <div>
      <Popups/>
      {children}
    </div>
  );
}

export default layout;
