import { List, ListItem, ListItemIcon, ListItemText, SvgIcon, Typography } from "@mui/material";
import {ReactComponent as HealthCheckIcon} from "./Icons/HealthCheck.svg";
import { HealthCheckEntry } from "../types";
import HealthRatingBar from "../components/HealthRatingBar";

const HealthCheckEntryDisplay = ({date,description,healthCheckRating,specialist}:HealthCheckEntry)=>{
  return (
    <ListItem >
      <ListItemIcon>
        <SvgIcon>
          <HealthCheckIcon width={24} height={24}/>
        </SvgIcon>
      </ListItemIcon>
      <List>
        <ListItem>
          <ListItemText 
            primary={description}
          />
        </ListItem>
        <ListItem>
         <Typography variant="body2" color="text.primary">Rating:</Typography><HealthRatingBar showText={false} rating={healthCheckRating}  />
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

export default HealthCheckEntryDisplay;