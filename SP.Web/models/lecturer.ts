export class Lecturer {
  name: string;
  staffId: string;
  telephone: string;
  email: string;
  address: string;
  department: string;
  departmentId: string;
  status:boolean;
}


export class LecturerUpdate {
  name: string;
  staffId: string;
  telephone: string;
  email: string;
  address: string;
  department: string;
  departmentId: string;
  status:boolean;
  lecturerId:string;
}