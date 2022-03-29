
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { toNewMedicalEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAllPatientDetails());
});

router.get('/:id',(req,res)=> {
  try {
    const patient = patientService.getPatientById(req.params.id);
    res.json(patient);
} catch (error:unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  res.status(400).send(errorMessage);
}
});

router.post('/', (req, res) => {
  try{
  const newPatientEntry = toNewPatientEntry(req.body);
  const addedEntry = patientService.addPatient(newPatientEntry);
  res.json(addedEntry);
  } catch (error:unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries',(req,res) => {
  try{
    const newMedicalEntry = toNewMedicalEntry(req.body);
    const addedMedicalEntry = patientService.addMedicalEntry(req.params.id,newMedicalEntry);
    res.json(addedMedicalEntry);
  }catch(error:unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;