import { Grid, Button, Box } from "@mui/material";
import { Keys } from "./keys";

interface KeypadProps {
    sendKey: any
}


export default function KeypadLX2(props: KeypadProps) {

    return (
        <Grid item>
          <Grid container direction="column" spacing="1px">
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_enter) }}>GO</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_esc) }}>STOP</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_up) }}>FEED ⬆</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_down) }}>FEED ⬇</Button></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_m) }}>MODE</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_leftbracket) }}>INC/ABS</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_rightbracket) }}>IN/MM</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_kpmultiply) }}>LOOK</Button></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px" height="40px">
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Box sx={{width: '70px'}}/></Grid>
                <Grid item><Button variant="contained" color="secondary"  onClick={() => { props.sendKey(Keys.KBD_i) }}>INC SET</Button></Grid>
                <Grid item><Button variant="contained" color="secondary"  onClick={() => { props.sendKey(Keys.KBD_a) }}>ABS SET</Button></Grid>
                <Grid item><Box sx={{width: '70px'}}/></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Button variant="contained" color="secondary" onClick={() => { props.sendKey(Keys.KBD_x) }}>X</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_7) }}>7</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_8) }}>8</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_9) }}>9</Button></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Button variant="contained" color="secondary" onClick={() => { props.sendKey(Keys.KBD_y) }}>Z</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_4) }}>4</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_5) }}>5</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_6) }}>6</Button></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Button variant="contained" color="secondary" onClick={() => { props.sendKey(Keys.KBD_z) }}>F/C</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_1) }}>1</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_2) }}>2</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_3) }}>3</Button></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Button variant="contained" color="secondary" onClick={() => { props.sendKey(Keys.KBD_NONE) }}>RSTR</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_minus) }}>+/-</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_0) }}>0</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { props.sendKey(Keys.KBD_period) }}>.</Button></Grid>
              </Grid>
            </Grid>
          </Grid>

        </Grid>


    );

}