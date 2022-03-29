import { List, ListItem, ListItemIcon, ListItemText,SvgIcon,Typography} from "@mui/material";
import {ReactComponent as OccupationalHealthcareIcon} from "./Icons/OccupationalHealthcare.svg";
import { OccupationalHealthcareEntry, SickLeave } from "../types";
import React from "react";


const displaySickLeave =(sickLeave:SickLeave | undefined)=>{
  if(sickLeave)
  {
    return(
          <ListItemText
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Sick Leave :
                </Typography>
                {sickLeave?.startDate}-{sickLeave?.endDate}
                </React.Fragment>
            }
          />
    );
  }
};

const OccupationalHealthcareEntryDisplay = ({date,description,employerName,sickLeave,specialist}:OccupationalHealthcareEntry)=>{

  return (
    <ListItem >
      <ListItemIcon >
        <SvgIcon >
          <OccupationalHealthcareIcon/>
          </SvgIcon>
      </ListItemIcon>
      <List>
        <ListItem>
          <ListItemText 
            primary={description}
          />
        </ListItem>
        <ListItem >
          <ListItemText
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Employee:
                </Typography>
                {employerName}
                </React.Fragment>
            }
          />
        </ListItem>
        <ListItem>
          {displaySickLeave(sickLeave)}
        </ListItem> 
      </List>
      <ListItemText sx={{position:'absolute',bottom:0 ,left:88}}
        secondary={`Diagnose by ${specialist}`}
      />
      <ListItemText sx={{position:'absolute',bottom:0 ,right:0}}
        secondary={date}
      />
    </ListItem>
  ) ;
};

export default OccupationalHealthcareEntryDisplay;