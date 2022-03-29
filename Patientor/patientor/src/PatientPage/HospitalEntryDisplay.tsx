
import { List, ListItem, ListItemIcon, ListItemText, SvgIcon, Typography} from "@mui/material";
import {ReactComponent as HospitalIcon} from "./Icons/Hospital.svg";
import { HospitalEntry } from "../types";
import React from "react";

const HospitalEntryDisplay = ({date,description,specialist,discharge}:HospitalEntry)=>{
  return (
    <ListItem >
      <ListItemIcon>
        <SvgIcon>
          <HospitalIcon width={24} height={24}/>
        </SvgIcon>
      </ListItemIcon>
      <List>
        <ListItem>
          <ListItemText 
            primary={description}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Discharge:
                </Typography>
                {discharge.criteria} :- {discharge.date}
                </React.Fragment>
            }
          />
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

export default HospitalEntryDisplay;
