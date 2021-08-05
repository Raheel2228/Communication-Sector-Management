interface PersonalInfo {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  mobileNumber: string;
}

interface CompanyInfo {
  companyName: string;
  group: string;
  subgroup: string;
  category: string;
  manager: string;
}

interface ServiceProvider {
  rspName: string;
  rspEmail: string;
  rspAddress: string;
  rspContactNumber: string;
}

interface Response {
  success: boolean;
  invalid: boolean;
  error: boolean;
}
