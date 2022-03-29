import { State } from "./state";
import { Patient,Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type:"SET_PATIENT";
      payload:Patient | null;
    } 
  | {
      type:"SET_DIAGNOSIS_LIST";
      payload:Diagnosis[]
    }
  | {
      type:"ADD_MEDICAL_ENTRY";
      payload: Patient;
   };

  export const setPatientList = (patientListFromApi:Patient[]):Action => {
    return{
      type:'SET_PATIENT_LIST',
      payload: patientListFromApi
    };
  };

  export const setPatient = (patientFromApi:Patient|null):Action => {
    return{
      type:'SET_PATIENT',
      payload:patientFromApi
    };
  };

  export const addPatient = (newPatient:Patient):Action=>{
    return{
      type:'ADD_PATIENT',
      payload:newPatient
    };
  };

  export const setDiagnosisList = (diagnosisListFromApi:Diagnosis[]):Action=> {
    return {
      type:'SET_DIAGNOSIS_LIST',
      payload:diagnosisListFromApi
    };
  };

  export const addEntry = (newEntry:Patient):Action=>{
    return{
      type:'ADD_MEDICAL_ENTRY',
      payload:newEntry
    };
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient:action.payload
      };

    case "SET_DIAGNOSIS_LIST":
      return{
        ...state,
        diagnoses:{
          ...action.payload.reduce((memo,diagnosis)=>({...memo,[diagnosis.code]:diagnosis}),
          {}
        ),
        ...state.diagnoses
        }
      };
    case 'ADD_MEDICAL_ENTRY':
        return{
          ...state,
          patients: {
            ...state.patients,
            [action.payload.id]: action.payload
          }     
        };
    default:
      return state;
  }
};
