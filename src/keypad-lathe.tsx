import { useState } from 'react';

import { Grid, Box, Button, Switch, Typography } from "@mui/material";
import { Keys } from "./keys";
import KeypadButton from "./keypad-button";

interface KeypadProps {
  sendKeyEvent: Function
}


export default function KeypadLathe(props: KeypadProps) {
  const [tipsEnabled, setTipsEnabled] = useState<boolean>(false);

  return (
    <Grid item>
      <Grid container direction="column" spacing="1px">
        <Grid item>
          <Grid container direction="row" spacing="1px">
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_g} label="GO" tooltip="Initiates motion in RUN" tipsEnabled={tipsEnabled} /></Grid>
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_s} label="STOP" tooltip="Halts motion during RUN" tipsEnabled={tipsEnabled} /></Grid>
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_up} label="FEED 🡅" tooltip="Feedrate override to increase feed rate" tipsEnabled={tipsEnabled} /></Grid>
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_down} label="FEED 🡇" tooltip="Feedrate override to decrease feed rate" tipsEnabled={tipsEnabled} /></Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing="1px">
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_m} label="MODE" tooltip="Change from one mode of operation to another" tipsEnabled={tipsEnabled} /></Grid>
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_leftbracket} label="INC/ABS" tooltip="Switches both or one axis from incremental to absolute or vice versa" tipsEnabled={tipsEnabled} /></Grid>
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_rightbracket} label="IN/MM" tooltip="Switches between English and Metric display" tipsEnabled={tipsEnabled} /></Grid>
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_kpmultiply} label="LOOK" tooltip="Not used on lathe." tipsEnabled={tipsEnabled} /></Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing="1px" height="40px">
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing="1px">
            <Grid item><Box sx={{ width: '70px', height: '70px', display: 'table-cell', verticalAlign: 'middle', textAlign: 'center' }}><Switch size="small" checked={tipsEnabled} onChange={() => { setTipsEnabled(!tipsEnabled) }} /><Typography variant="subtitle2" sx={{width:'70px'}} textAlign="center">TIPS</Typography></Box></Grid>
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_i} label="INC SET" altColor tooltip="Loads incremental dimensions and general data" tipsEnabled={tipsEnabled} /></Grid>
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_a} label="ABS SET" altColor tooltip="Loads absolute dimensions and general data" tipsEnabled={tipsEnabled} /></Grid>
            <Grid item><Button sx={{ border: 'none', color: '#000000' }} onClick={() => { window.open('lx2.pdf', '_blank') }}>Help</Button></Grid>

          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing="1px">
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_x} label="X" altColor tooltip="Selects X axis for subsequent commands" tipsEnabled={tipsEnabled} /></Grid>
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_7} label="7" tooltip="Numeric input (SEVEN)" tipsEnabled={tipsEnabled} /></Grid>
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_8} label="8" tooltip="Numeric input (EIGHT)" tipsEnabled={tipsEnabled} /></Grid>
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_9} label="9" tooltip="Numeric input (NINE)" tipsEnabled={tipsEnabled} /></Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing="1px">
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_y} label="Z" altColor tooltip="Selects Z axis for subsequent commands" tipsEnabled={tipsEnabled} /></Grid>
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_4} label="4" tooltip="Numeric input (FOUR)" tipsEnabled={tipsEnabled} /></Grid>
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_5} label="5" tooltip="Numeric input (FIVE)" tipsEnabled={tipsEnabled} /></Grid>
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_6} label="6" tooltip="Numeric input (SIX)" tipsEnabled={tipsEnabled} /></Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing="1px">
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_NONE} label="F/C" altColor tooltip="Switches between fine and coarse modes for DRO and TRAKing (no function in offline mode)" tipsEnabled={tipsEnabled} /></Grid>
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_1} label="1" tooltip="Numeric input (ONE)" tipsEnabled={tipsEnabled} /></Grid>
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_2} label="2" tooltip="Numeric input (TWO)" tipsEnabled={tipsEnabled} /></Grid>
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_3} label="3" tooltip="Numeric input (THREE)" tipsEnabled={tipsEnabled} /></Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing="1px">
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_esc} label="RSTR" altColor tooltip="Restore; clears an entry and aborts keying procedure" tipsEnabled={tipsEnabled} /></Grid>
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_minus} label="+/-" tooltip="Data is automatically positive (+) unless this key is pressed" tipsEnabled={tipsEnabled} /></Grid>
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_0} label="0" tooltip="Numeric input (ZERO)" tipsEnabled={tipsEnabled} /></Grid>
            <Grid item><KeypadButton sendKeyEvent={props.sendKeyEvent} keyCode={Keys.KBD_period} label="." tooltip="Numeric input (DECIMAL POINT)" tipsEnabled={tipsEnabled} /></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>


  );

}