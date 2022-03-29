import { Button, Grid } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { EntryFormValues, EntryType } from "../types";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddOccupationalHealthcareForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description:"",
        date:"",
        specialist:"",
        diagnosisCodes :[],
        type:EntryType.OccupationalHealthcare,
        employerName:'',
        sickLeave:{
          startDate:'',
          endDate:''
        },
        } as EntryFormValues}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if(!values.description){
          errors.description = requiredError;
        }
        if(!values.date){
          errors.date = requiredError;
        }
        if(!values.specialist){
          errors.specialist = requiredError;
        }
        if(values.type===EntryType.OccupationalHealthcare && !values.employerName){
          errors.type = 'Occupational Health care requires employer name field';
          errors.employerName= requiredError;
      }
        return errors;
      }}
    >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
    return (
      <Form className="form ui">
        <Field
          label="Description"
          placeholder="Description"
          name="description"
          component={TextField}
        />
        <Field
          label="Date"
          placeholder="Date"
          name="date"
          component={TextField}
        />
        <Field
          label="Specialist"
          placeholder="Specialist"
          name="specialist"
          component={TextField}
        />
        <DiagnosisSelection
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          diagnoses={Object.values(diagnoses)}
        />
        <Field
          label='Sick leaves start date'
          placeholder="YYYY-MM-DD"
          name={`sickLeave.startDate`}
          component={TextField}
        />
        <Field
          label='Sick leaves end date'
          placeholder="YYYY-MM-DD"
          name='sickLeave.endDate'
          component={TextField}
        />
        <Field
          label='Employer Name'
          placeholder="Jane Doe"
          name='employerName'
          component={TextField}
        />
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              sx={{ float:'left'}}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
            <Grid item>
              <Button
                sx={{ float:'right'}}
                type="submit"
                variant="contained"
                disabled={!dirty || !isValid}
              >
                Add
              </Button>
            </Grid>
        </Grid>
        </Form>
      );
    }}
  </Formik>
  );
};

export default AddOccupationalHealthcareForm;