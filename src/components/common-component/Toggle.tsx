import { useState } from "react";


export default function ToggleButton() {
      const [isOn, setIsOn] = useState(false);
  return (
    <div>
      <div
        className={`relative ${isOn ? "bg-[#635BFF]" : "bg-[#E0E6EB]"} rounded-[8px] w-[36px] h-6 cursor-pointer transition-colors duration-300 self-end sm:self-auto`}
        onClick={() => setIsOn(!isOn)}
      >
        <div
          className={`${isOn ? "bg-[white]" : "bg-[white]"} rounded-[6px] w-4 h-4 absolute top-1 transition-all duration-300 ${
            isOn ? "right-0.5" : "left-0.5"
          }`}
        ></div>
      </div>
    </div>
  );
}
