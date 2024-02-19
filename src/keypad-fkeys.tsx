import { Grid } from "@mui/material";
import FunctionButton from "./function-button";
import { Keys } from "./keys";

interface KeypadProps {
    sendKeyEvent: any
}

export default function KeypadFKeys(props: KeypadProps) {


    return (
      <Grid container direction="row" spacing="1px" sx={{ pl: '1px', pt: '5px' }}>
      <Grid item><FunctionButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_f1} /></Grid>
      <Grid item><FunctionButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_f2} /></Grid>
      <Grid item><FunctionButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_f3} /></Grid>
      <Grid item><FunctionButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_f4} /></Grid>
      <Grid item><FunctionButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_f5} /></Grid>
      <Grid item><FunctionButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_f6} /></Grid>
      <Grid item><FunctionButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_f7} /></Grid>
      <Grid item><FunctionButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_f8} /></Grid>
    </Grid>

    );

}