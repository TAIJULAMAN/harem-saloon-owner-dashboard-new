
export type Severity = "Mild" | "Moderate" | "Severe";

export interface AllergyNote {
    id: number;
    title: string;
    body: string;
    severity: Severity | number;
}