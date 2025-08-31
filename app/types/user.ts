export type Address = {
  street: string;
  city: string;
  zipcode: string;
};

export type Company = { name: string };

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: Address;
  company: Company;
};
