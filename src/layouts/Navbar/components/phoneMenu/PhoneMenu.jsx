import { memo } from "react";
import PhoneFeatures from "./components/PhoneFeatures";
import WebsitePages from "./components/WebsitePages";

const PhoneMenu = memo(({ showPhoneMenu, toggleShowPhoneMenu}) => {
  return (
    <div
      className={`trans flex overflow-auto flex-col gap-16 fixed top-[74px] py-10 px-6 z-40 bg-gray-200 ${
        showPhoneMenu ? "left-0" : "left-[200%]"
      } w-full flex flex-col items-center h-[calc(100vh-74px)] `}
    >
      {/* Horizontal Links */}
      <PhoneFeatures closeMenu={toggleShowPhoneMenu} />
      {/* Vertical Links */}
      <WebsitePages phoneMenu={showPhoneMenu} closeMenu={toggleShowPhoneMenu} />
    </div>
  );
});

export default PhoneMenu;