export interface SalaryMember {
    id: string
    name: string
    uploadedBy: string
    avatar: string
    role: string
    netAmount: string
    month: string
    date: string
    status: "Under Review" | "Approved" | "Paid"
    grossSalary: string
    netSalary: string
    trf: string
    cumulativeTrf: string
    iban: string
}