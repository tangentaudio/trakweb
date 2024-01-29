import { Grid, Button } from "@mui/material";
import { Keys } from "./keys";

interface KeypadProps {
    sendKey: any
}

export default function KeypadFKeys(props: KeypadProps) {

    return (
      <Grid container direction="row" spacing="1px" sx={{ pl: '1px', pt: '5px' }}>
      <Grid item><Button variant="pointy" onClick={() => { props.sendKey(Keys.KBD_f1) }}></Button></Grid>
      <Grid item><Button variant="pointy" onClick={() => { props.sendKey(Keys.KBD_f2) }}></Button></Grid>
      <Grid item><Button variant="pointy" onClick={() => { props.sendKey(Keys.KBD_f3) }}></Button></Grid>
      <Grid item><Button variant="pointy" onClick={() => { props.sendKey(Keys.KBD_f4) }}></Button></Grid>
      <Grid item><Button variant="pointy" onClick={() => { props.sendKey(Keys.KBD_f5) }}></Button></Grid>
      <Grid item><Button variant="pointy" onClick={() => { props.sendKey(Keys.KBD_f6) }}></Button></Grid>
      <Grid item><Button variant="pointy" onClick={() => { props.sendKey(Keys.KBD_f7) }}></Button></Grid>
      <Grid item><Button variant="pointy" onClick={() => { props.sendKey(Keys.KBD_f8) }}></Button></Grid>
    </Grid>

    );

}