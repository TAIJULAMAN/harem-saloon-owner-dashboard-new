"use client";
import { useState, useRef } from "react";
import PageHeader from "../../common-component/PageHeader";
import AddAppointTabs from "./AddAppointTabs";
import AddAppontClinetSection from "./AddAppontClinetSection";
import RescheduleAppointmentContent from "../reschedule/RescheduleAppointmentContent";
import BasicInformation from "../view-appointment/BasicInformation";
import RepeatingModal from "../view-appointment/Repeatingmodal";
import ReviewAppointmentTable from "./Reviewappointmenttable ";
import ApppointNote from "../view-appointment/ApppointNote";
import Frequency from "./Frequency";
import AddPayment from "./AddPayment";
type Step = "details" | "review" | "payment";
export default function AddAppointmentContent() {
  type AppStatus = "Booked" | "Confirmed" | "Arrived" | "Started" | "No-show";
  const [currentStep, setCurrentStep] = useState<Step>("details");
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [status, setStatus] = useState<AppStatus>("Booked");
  const [repeatingOpen, setRepeatingOpen] = useState<boolean>(false);
  const [noteEditing, setNoteEditing] = useState<boolean>(false);
  const [savedNote, setSavedNote] = useState<string>("");
  const [noteDraft, setNoteDraft] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const onSelectClient = (id: string) => {
    setSelectedClient(id);
  };
  const openNoteEditor = () => {
    setNoteEditing(true);
    setNoteDraft(savedNote);
  };
  const closeNoteEditor = () => {
    setNoteEditing(false);
    setNoteDraft("");
  };
  const saveNote = () => {
    setSavedNote(noteDraft);
    closeNoteEditor();
  };
  const openRepeatingModal = () => {
    setRepeatingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] font-manrope flex flex-col gap-5 pb-8">
      <PageHeader
        title="Add Appointment"
        onBack={() => console.log("Go Back")}
        breadcrumb={[{ label: "Appointments", active: true }]}
      />
      <AddAppointTabs currentStep={currentStep} onStepChange={setCurrentStep} />
      {currentStep === "details" && (
        <>
          <AddAppontClinetSection
            selectedClient={selectedClient}
            onSelectClient={onSelectClient}
          />
          <RescheduleAppointmentContent />
          <Frequency />
        </>
      )}
      {currentStep === "review" && (
        <>
          <BasicInformation
            status={status}
            setStatus={setStatus}
            onReschedule={() => setCurrentStep("details")}
            onSetRepeating={openRepeatingModal}
          />
          <RepeatingModal
            open={repeatingOpen}
            onClose={() => setRepeatingOpen(false)}
          />
          <ApppointNote
            openNoteEditor={openNoteEditor}
            closeNoteEditor={closeNoteEditor}
            savedNote={savedNote}
            noteEditing={noteEditing}
            textareaRef={textareaRef}
            saveNote={saveNote}
            setNoteDraft={setNoteDraft}
            noteDraft={noteDraft}
          />
          <ReviewAppointmentTable />
        </>
      )}

      {currentStep === "payment" && (
        <AddPayment onBack={() => setCurrentStep("review")} />
      )}
    </div>
  );
}
