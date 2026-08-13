"use client";
import AppoinmentTableviewContent from "./AppoinmentTableviewContent";

export const AppointmentLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <AppoinmentTableviewContent />
    </div>
  );
};

export default AppointmentLayout;
