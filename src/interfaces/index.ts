export type UserPayloadObject = {
  id: number;
  name: string;
  email: string;
  photo: string;
  role: string;
  departmentId: number | null;
  department: Record<string, any>;
  phone: number | string;
  address: string;
  createdAt: string;
  status: string;
};
