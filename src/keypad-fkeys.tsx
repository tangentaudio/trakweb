import { Grid, Button, Tooltip } from "@mui/material";
import { Keys } from "./keys";

interface KeypadProps {
    sendKey: any
}

export default function KeypadFKeys(props: KeypadProps) {

    return (
      <Grid container direction="row" spacing="1px" sx={{ pl: '1px', pt: '5px' }}>
      <Grid item><Tooltip enterDelay={1500} title="Soft key 1; performs the action shown on the display above the key." arrow><Button variant="pointy" onClick={() => { props.sendKey(Keys.KBD_f1) }}></Button></Tooltip></Grid>
      <Grid item><Tooltip enterDelay={1500} title="Soft key 2; performs the action shown on the display above the key." arrow><Button variant="pointy" onClick={() => { props.sendKey(Keys.KBD_f2) }}></Button></Tooltip></Grid>
      <Grid item><Tooltip enterDelay={1500} title="Soft key 3; performs the action shown on the display above the key." arrow><Button variant="pointy" onClick={() => { props.sendKey(Keys.KBD_f3) }}></Button></Tooltip></Grid>
      <Grid item><Tooltip enterDelay={1500} title="Soft key 4; performs the action shown on the display above the key." arrow><Button variant="pointy" onClick={() => { props.sendKey(Keys.KBD_f4) }}></Button></Tooltip></Grid>
      <Grid item><Tooltip enterDelay={1500} title="Soft key 5; performs the action shown on the display above the key." arrow><Button variant="pointy" onClick={() => { props.sendKey(Keys.KBD_f5) }}></Button></Tooltip></Grid>
      <Grid item><Tooltip enterDelay={1500} title="Soft key 6; performs the action shown on the display above the key." arrow><Button variant="pointy" onClick={() => { props.sendKey(Keys.KBD_f6) }}></Button></Tooltip></Grid>
      <Grid item><Tooltip enterDelay={1500} title="Soft key 7; performs the action shown on the display above the key." arrow><Button variant="pointy" onClick={() => { props.sendKey(Keys.KBD_f7) }}></Button></Tooltip></Grid>
      <Grid item><Tooltip enterDelay={1500} title="Soft key 8; performs the action shown on the display above the key." arrow><Button variant="pointy" onClick={() => { props.sendKey(Keys.KBD_f8) }}></Button></Tooltip></Grid>
    </Grid>

    );

}