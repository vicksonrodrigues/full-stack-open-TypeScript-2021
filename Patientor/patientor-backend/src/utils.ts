import { NewPatientEntry ,Gender, EntryWithoutId, EntryType, Diagnosis, Discharge, SickLeave, HealthCheckRating} from "./types";

const isString = (text:unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name:unknown): string =>{
  if (!name || !isString(name)){
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseSsn = (name:unknown): string =>{
  if (!name || !isString(name)){
    throw new Error('Incorrect or missing ssn');
  }
  return name;
};

const parseOccupation = (name:unknown): string =>{
  if (!name || !isString(name)){
    throw new Error('Incorrect or missing occupation');
  }
  return name;
};


const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date:unknown):string => {
  if (!date || !isString(date) || !isDate(date))
  {
    throw new Error ('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender:unknown):Gender => {
  if (!gender || !isGender(gender)){
    throw new Error('Incorrect or missing weather: ' + gender);
  }
  return gender;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object :any):NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name : parseName(object.name), 
    ssn : parseSsn(object.ssn), 
    dateOfBirth:parseDate(object.dateOfBirth) , 
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    entries:[]

  };

  return newEntry;
};

const parseField = (field:unknown): string =>{
  if (!field || !isString(field)){
    throw new Error('Incorrect or missing name');
  }
  return field;
};

const parseDiagnoisCode = (field:unknown):Array<Diagnosis['code']> => {
  const isDiagnosis = (object: unknown): object is Diagnosis => {
    return (object as Diagnosis).code !== undefined;
  };

  if (!field) throw new Error('Missing field');
  if (!(field instanceof Array)) throw new Error('Not an array');
  field.forEach(x => {
    if (!isDiagnosis(x)) throw new Error(`${x} is not a diagnose`);
  });
  return field as Array<Diagnosis['code']>;
};


const parseDischarge = (field:unknown):Discharge => {
  const isDischarge = (object: unknown): object is Discharge => {
    return (object as Discharge).criteria !== undefined || !isDate((object as Discharge).date) ;
  };
  if(!field || !isDischarge(field)) throw new Error('Incorrect field: ' + field);
  return field;
};

const parseSickleave = (field: unknown): SickLeave => {
  const leave = field as SickLeave;
  if( !isDate(leave.startDate) || !isDate(leave.endDate))
    throw new Error('Incorrect fields for SickLeave');
  return leave; 
};


// 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseHealthCheckRating = (field: any ): HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isHRating = (object: any): object is HealthCheckRating => {
    return (object in HealthCheckRating);
  };
  if(isHRating(field))
    return field;
  else throw new Error(`${field} is not a HealthCheckRating`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewMedicalEntry = (object:any):EntryWithoutId => {
    const description = parseField(object.description);
    const date =parseField(object.date);
    const specialist =parseField(object.specialist);
    const diagnosisCodes = object.diagnosisCodes ? parseDiagnoisCode(object.diagnosisCodes) : undefined;

    const baseEntry = {description,date,specialist,diagnosisCodes};

    switch(object.type as EntryType)
    {
      case "Hospital":
        const discharge = object.discharge
        ? parseDischarge(object.discharge) : undefined;
        return {
          ...baseEntry,discharge,type:"Hospital"
        } as EntryWithoutId;
      
      case "HealthCheck":
        const healthCheckRating =  parseHealthCheckRating(object.healthCheckRating);
        return {
          ...baseEntry,healthCheckRating,type:"HealthCheck"
        } as EntryWithoutId;
        
      case "OccupationalHealthcare":
        const employerName = parseField(object.employerName);
        const sickLeave= object.sickLeave ? parseSickleave(object.sickLeave) : undefined; 
        return {
          ...baseEntry,employerName,sickLeave,type:"OccupationalHealthcare"
        } as EntryWithoutId;
      default:
        throw new Error('Wrong type');
    }
};

export default toNewPatientEntry;
