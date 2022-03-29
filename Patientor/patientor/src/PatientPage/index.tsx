import { Button, Container,Divider,List} from "@mui/material";
import axios from "axios";
import React  from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { addEntry, setDiagnosisList,setPatient, useStateValue } from "../state";
import { Diagnosis, EntryFormValues, Patient } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Entries from "./Entries";
import { Typography } from "@mui/material";
import AddMedicalModal from "../AddMedicalModal";


const PatientPage = () => {
  
  const [{patient,diagnoses},dispatch]=useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry =async (values:EntryFormValues) => {
    console.log('Entries',values);
    try{
      const { data: newEntry } = await axios.post<Patient>(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${apiBaseUrl}/patients/${id}/entries`,
        values
    );
    dispatch(addEntry(newEntry));
    closeModal();
    }catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };


  React.useEffect(()=>{

    const fetchPatient =async () => {
      try{
        if(patient?.id === id){
          dispatch(setPatient(patient)); 
        }else{
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          const {data:patientFromApi} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
          dispatch(setPatient(patientFromApi));
        }
      }catch (e){
          console.error(e);
        }
      };
      const fetchDiagnosesList = async () => {
        try {
            const {data: diagnosesListFromApi}= await axios.get<Diagnosis[]>(
            `${apiBaseUrl}/diagnoses`
            );
            dispatch(setDiagnosisList(diagnosesListFromApi));
        } catch (error) {
            console.log(error);
        }
        };
    if(diagnoses==={}){
       void fetchDiagnosesList();
    }
     void fetchPatient(); 
  },[]);

  

let iconName:React.ReactElement;

if (patient?.gender === 'male'){
    iconName = <MaleIcon/>;
}
else if(patient?.gender === 'female'){
  iconName = <FemaleIcon/>;
}
else{
  iconName = <TransgenderIcon/>;
}

  return (
    <Container>
      <h2>{patient ?.name}  {iconName} </h2>
      <div>
        ssn:{patient ?.ssn}
      </div>
      <div>
        occupation:{patient?.occupation}
      </div>
      <Typography variant="h6" align="center" sx={{ width: '100%', maxWidth: 720 }}>Entries</Typography>
      {patient?.entries.length!==0 && patient?.entries.map(e => (
        <List key={e.id} sx={{ width: '100%', maxWidth: 720, bgcolor: 'background.paper' }}>
          <Entries entry={e}/>
          <Divider />
        </List>
      ))}
      <AddMedicalModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </Container>
  );
};

export default PatientPage;