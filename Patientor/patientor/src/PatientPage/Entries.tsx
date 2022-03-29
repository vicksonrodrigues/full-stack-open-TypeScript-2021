import { Entry} from "../types";
import HealthCheckEntryDisplay from "./HealthCheckEntryDisplay";
import HospitalEntryDisplay from "./HospitalEntryDisplay";
import OccupationalHealthcareEntryDisplay from "./OccupationalHealthcareEntryDisplay";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails:React.FC<{entry:Entry}> = ({entry}) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDisplay {...entry}/>;
    
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDisplay {...entry}/>;
    
    case "HealthCheck":
      return <HealthCheckEntryDisplay {...entry}/>;
    
    default:
      return assertNever(entry);
    
  }

};

export default EntryDetails;