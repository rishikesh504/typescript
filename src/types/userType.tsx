import PersonalDetails from "./userPersonalDetail";
import BankDetails from "./userBankDetails";
import Education from "./userEducation";
import Experience from "./userExperience";

interface User {
  id: number;
  personalDetails: PersonalDetails;
  bankDetails: BankDetails;
  experienceList: Experience[];
  educationList: Education[];
}

export default User;