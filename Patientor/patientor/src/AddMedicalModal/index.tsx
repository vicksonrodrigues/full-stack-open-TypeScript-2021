import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { EntryFormValues } from "../types";
import AddHealthCheckForm from "./AddHealthCheckForm";
import AddOccupationalHealthcareForm from "./AddOccupationalHealthcareForm";
import AddHospitalForm from "./AddHospitalForm";
import { Button, ButtonGroup , Typography} from "@mui/material";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddMedicalModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [formToShow,setFormToShow] = useState<string>("Hospital");

  const showForm = () => {
    switch(formToShow){
      case "HealthCheck":
        return <AddHealthCheckForm onSubmit={onSubmit} onCancel={onClose}/>;
      case "OccupationalHealthcare":
        return <AddOccupationalHealthcareForm onSubmit={onSubmit} onCancel={onClose}/>;
      case "Hospital":
        return <AddHospitalForm onSubmit={onSubmit} onCancel={onClose}/>;
    }
  };
  return(
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a New Entry fot Patient</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <div>
        <Typography>Type of Entry:</Typography>
        <ButtonGroup>
          <Button onClick={() => setFormToShow("Hospital")}>Hospital</Button>
          <Button onClick={() => setFormToShow("OccupationalHealthcare")}>Occupational Healthcare</Button>
          <Button onClick={() => setFormToShow("HealthCheck")}>Health Check</Button>
        </ButtonGroup>
      </div>
      {showForm()}
    </DialogContent>
  </Dialog>
  );
};

export default AddMedicalModal;