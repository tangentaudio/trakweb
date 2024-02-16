import { Grid, Button, Box, Tooltip } from "@mui/material";
import { Keys } from "./keys";

interface KeypadProps {
    sendKey: Function
}


export default function KeypadLathe(props: KeypadProps) {

    return (
        <Grid item>
          <Grid container direction="column" spacing="1px">
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Tooltip enterDelay={2500} title="Initiates motion in Run" arrow><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_g) }}>GO</Button></Tooltip></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Halts motion during Run" arrow><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_s) }}>STOP</Button></Tooltip></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Feedrate override to increase feed rate" arrow><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_up) }}>FEED 🡅</Button></Tooltip></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Feedrate override to decrease feed rate" arrow><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_down) }}>FEED 🡇</Button></Tooltip></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Tooltip enterDelay={2500} title="Change from one mode of operation to another" arrow><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_m) }}>MODE</Button></Tooltip></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Switches both or one axis from incremental to absolute or vice versa" arrow><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_leftbracket) }}>INC/ABS</Button></Tooltip></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Switches between English and Metric display" arrow><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_rightbracket) }}>IN/MM</Button></Tooltip></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Not used" arrow><Button disabled variant="contained" onClick={() => { props.sendKey(Keys.KBD_kpmultiply) }}>LOOK</Button></Tooltip></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px" height="40px">
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Box sx={{width: '70px'}}/></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Loads incremental dimensions and general data" arrow><Button variant="contained" color="secondary"  onClick={() => { props.sendKey(Keys.KBD_i) }}>INC SET</Button></Tooltip></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Loads absolute dimensions and general data" arrow><Button variant="contained" color="secondary"  onClick={() => { props.sendKey(Keys.KBD_a) }}>ABS SET</Button></Tooltip></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Opens the PDF operator's manual in another window" arrow><Button sx={{border: 'none', color: '#000000'}}  onClick={() => { window.open('lx2.pdf', '_blank') }}>Help</Button></Tooltip></Grid>

              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Tooltip enterDelay={2500} title="Selects X axis for subsequent commands" arrow><Button variant="contained" color="secondary" onClick={() => { props.sendKey(Keys.KBD_x) }}>X</Button></Tooltip></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Numeric input" arrow><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_7) }}>7</Button></Tooltip></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Numeric input" arrow><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_8) }}>8</Button></Tooltip></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Numeric input" arrow><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_9) }}>9</Button></Tooltip></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Tooltip enterDelay={2500} title="Selects Z axis for subsequent commands" arrow><Button variant="contained" color="secondary" onClick={() => { props.sendKey(Keys.KBD_y) }}>Z</Button></Tooltip></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Numeric input" arrow><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_4) }}>4</Button></Tooltip></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Numeric input" arrow><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_5) }}>5</Button></Tooltip></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Numeric input" arrow><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_6) }}>6</Button></Tooltip></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Tooltip enterDelay={2500} title="Switches between fine and coarse modes for DRO and TRAKing" arrow><Button variant="contained" color="secondary" onClick={() => { props.sendKey(Keys.KBD_z) }}>F/C</Button></Tooltip></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Numeric input" arrow><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_1) }}>1</Button></Tooltip></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Numeric input" arrow><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_2) }}>2</Button></Tooltip></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Numeric input" arrow><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_3) }}>3</Button></Tooltip></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Tooltip enterDelay={2500} title="Restore; clears an entry and aborts keying procedure" arrow><Button variant="contained" color="secondary" onClick={() => { props.sendKey(Keys.KBD_esc) }}>RSTR</Button></Tooltip></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Data is automatically positive (+) unless this key is pressed" arrow><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_minus) }}>+/-</Button></Tooltip></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Numeric input" arrow><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_0) }}>0</Button></Tooltip></Grid>
                <Grid item><Tooltip enterDelay={2500} title="Numeric input, decimal point" arrow><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_period) }}>.</Button></Tooltip></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>


    );

}