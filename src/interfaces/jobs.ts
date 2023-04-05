export const statusValues = [
  "En cours",
  "Refusé",
  "Accepté",
  "Test technique",
  "Call RH",
];

export const contractType = ["CDI", "Freelance"];

export interface jobsDesc {
  title: string;
  status: string;
  site: string;
  note: string;
  link: string;
  date?: string;
  salary: number;
  type: string;
  id?: string;
}
