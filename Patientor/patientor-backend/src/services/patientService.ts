import {v1 as uuid} from 'uuid';
import patientsData from '../../data/patient';
import { NewPatientEntry, PublicPatient, Patient, EntryWithoutId } from '../types';


const getAllPatientDetails = ():PublicPatient[]=> {
  return patientsData.map( ({id,name,dateOfBirth,gender ,occupation ,entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getPatientById = (id:string):PublicPatient => {
  const patient = patientsData.find(p => p.id === id);

  if (!patient) {
    throw new Error('Patient not found');
  }
  return patient;
};

const addPatient = (entry:NewPatientEntry):Patient => {
  
  const newPatientEntry ={
    id:uuid(),
    ...entry,
    entries: []
  };
  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

const addMedicalEntry = (pId:string,entry:EntryWithoutId):Patient =>{
  const patient = patientsData.find(p => p.id === pId );
  if(!patient){
    throw new Error('Patient cannot be found');
}
if(!entry.type){
    throw new Error('Missing type field');
}
if(entry.type!=='Hospital' && entry.type!=='OccupationalHealthcare' && entry.type!=='HealthCheck'){
    throw new Error('Wrong kind of type field');
}
if(entry.type==='Hospital' && !entry.discharge){
    throw new Error('Missing discharge field');
}
if(entry.type==='OccupationalHealthcare' && !entry.employerName){
    throw new Error('Missing employerName field');
}
if(entry.type==='HealthCheck' && !entry.healthCheckRating){
    throw new Error('Missing healthCheckRating field');
}
  patient.entries.push({...entry,id:uuid()});
  return patient;
};

export default {
  getAllPatientDetails,
  addPatient,
  getPatientById,
  addMedicalEntry
};