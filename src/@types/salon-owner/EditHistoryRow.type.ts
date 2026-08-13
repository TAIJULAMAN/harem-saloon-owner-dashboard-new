type ActionType = "Update" | "Creation" | "Deletion" | string;

export interface EditHistoryRow {
  // Client fields
  id: string;
  name?: string;
  email?: string;
  avatar?: string;
  telephone?: string;
  lastAppointment?: string;
  allergy?: string;
  allergyColor?: "yellow" | "purple" | "pink";
  createdAt?: string;

  // Edit history fields
  dateTime: string;
  fieldChanged: string;
  previousValue: string;
  newValue: string;
  editedBy: string;
  action: ActionType;
}
