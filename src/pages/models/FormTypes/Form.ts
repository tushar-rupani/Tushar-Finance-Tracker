export interface FormType {
  id: number;
  user: string;
  date: string;
  month: string;
  year: string;
  transaction_type: string;
  from_account: string;
  to_account: string;
  currency: string;
  amount: number;
  notes: string;
  fileBase64: string;
}

export type formValues = {
  date: string;
  month: string;
  year: string;
  transaction_type: string;
  from_account: string;
  to_account: string;
  currency: string;
  amount: number;
  notes: string;
  fileBase64: string;
};
