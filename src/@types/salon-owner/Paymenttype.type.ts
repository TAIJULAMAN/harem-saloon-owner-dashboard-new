export interface PaymentTab {
  id: string;
  label: string;
  settings: NotificationSetting[];
}

export interface NotificationSetting {
  id: string;
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  isEnabled: boolean;
  buttonText: string;
}