import React from "react";
import Style from "./SettingsTabWrapper.module.css";

const SettingsTabWrapper = ({
  children,
  UserProfileBox,
  hasProfileBox = true,
}) => {
  return (
    <div
      className={`${Style.container} ${
        hasProfileBox && Style.container_grid
      } relative gap-10 items-start pb-8`}
    >
      {hasProfileBox && (
        <div className={`top-4 w-full flex flex-col`}>{UserProfileBox}</div>
      )}
      <div className={`${Style.scroller} flex flex-col gap-10 flex-1`}>
        {children}
      </div>
    </div>
  );
};

export default SettingsTabWrapper;
