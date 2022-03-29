import diagnosesData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosesData;

const getEntries = ():Diagnosis[] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return diagnoses;
};

export default {
  getEntries
};