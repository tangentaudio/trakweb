import React, { useState } from 'react';
import './App.css';
import { Box, Button } from '@mui/material';
import { Grid, createTheme, ThemeProvider, Typography, Tabs, Tab } from '@mui/material';
import { indigo, lightGreen } from '@mui/material/colors';

import DosPlayer from "./dos-player";

import { CommandInterface } from "emulators";
import { Keys } from "./keys";

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    pointy: true;
  }
}

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: lightGreen,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          fontWeight: '900',
          width: '89px',
          height: '89px',
            
          clipPath: "polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%);"
        },
      },
      variants: [
        {
          props: { variant: 'pointy' },
          style: {
            fontWeight: 500,
            borderRadius: 0,
            backgroundColor: 'gray',
            color: '#333333',
            paddingTop: '40px',
            clipPath: "polygon(50% 0%, 100% 30%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 30%);"

          },
        },
        {
          props: { variant: 'pointy', color: 'secondary' },
          style: {
            border: `4px pointy red`,
          },
        },
      ],
    },
  },
});


function App() {
  let ci: CommandInterface;
  const [bundle, setBundle] = useState<string | null>('mx3.bundle');

  function sci(p: Promise<CommandInterface>) {
    p.then((pci) => { console.log("success", pci); ci = pci }, () => { console.log("failure") });
  }

  function sendKey(kcode: number) {
    if (ci !== null) {
      ci.simulateKeyPress(kcode);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="row" spacing={2} sx={{width: '100%', pl: '20px', pt: '20px'}}>
        <Grid item>
          <Grid container direction="column" spacing="1px">
            <Grid item>
              <Typography variant="h4" sx={{fontWeight: 900}}>TrakWeb</Typography>
            </Grid>
            <Grid item>
              <Tabs value={bundle} onChange={ (e, v) => { setBundle(v) } }>
                <Tab label="Mill" value="mx3.bundle"/>
                <Tab label="Lathe" value="lx2.bundle"/>
              </Tabs>
            </Grid>
            <Grid item>
              { bundle !== null &&
                  <div className="App" style={{ width: "720px", height: "348px", marginTop: '4px'}} >
                    <DosPlayer bundleUrl={bundle} setCommandInterface={sci} />
                  </div>
              }
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px" sx={{ pl: '1px', pt: '5px' }}>
                <Grid item><Button variant="pointy" onClick={() => { sendKey(Keys.KBD_f1) }}>F1</Button></Grid>
                <Grid item><Button variant="pointy" onClick={() => { sendKey(Keys.KBD_f2) }}>F2</Button></Grid>
                <Grid item><Button variant="pointy" onClick={() => { sendKey(Keys.KBD_f3) }}>F3</Button></Grid>
                <Grid item><Button variant="pointy" onClick={() => { sendKey(Keys.KBD_f4) }}>F4</Button></Grid>
                <Grid item><Button variant="pointy" onClick={() => { sendKey(Keys.KBD_f5) }}>F5</Button></Grid>
                <Grid item><Button variant="pointy" onClick={() => { sendKey(Keys.KBD_f6) }}>F6</Button></Grid>
                <Grid item><Button variant="pointy" onClick={() => { sendKey(Keys.KBD_f7) }}>F7</Button></Grid>
                <Grid item><Button variant="pointy" onClick={() => { sendKey(Keys.KBD_f8) }}>F8</Button></Grid>
              </Grid>
            </Grid>
            <Grid item sx={{mt: '20px'}}>
              <Typography color="#aaaaaa" variant="caption">Copyright 2024 Steve Richardson (steve.richardson@makeitlabs.com) - for educational and training purposes only.</Typography>
            </Grid>
            <Grid item>
              <Typography color="#aaaaaa" variant="caption">TRAK® is a registered trademark of Southwestern Industries.</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing="1px">
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Button variant="contained" onClick={() => { sendKey(Keys.KBD_enter) }}>GO</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { sendKey(Keys.KBD_esc) }}>STOP</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { sendKey(Keys.KBD_up) }}>FEED ⬆</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { sendKey(Keys.KBD_down) }}>FEED ⬇</Button></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Button variant="contained" onClick={() => { sendKey(Keys.KBD_m) }}>MODE</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { sendKey(Keys.KBD_leftbracket) }}>INC/ABS</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { sendKey(Keys.KBD_rightbracket) }}>IN/MM</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { sendKey(Keys.KBD_NONE) }}>LOOK</Button></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px" height="40px">
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Box sx={{width: '89px'}}/></Grid>
                <Grid item><Button variant="contained" color="secondary"  onClick={() => { sendKey(Keys.KBD_NONE) }}>INC SET</Button></Grid>
                <Grid item><Button variant="contained" color="secondary"  onClick={() => { sendKey(Keys.KBD_NONE) }}>ABS SET</Button></Grid>
                <Grid item><Box sx={{width: '89px'}}/></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Button variant="contained" color="secondary" onClick={() => { sendKey(Keys.KBD_x) }}>X</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { sendKey(Keys.KBD_7) }}>7</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { sendKey(Keys.KBD_8) }}>8</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { sendKey(Keys.KBD_9) }}>9</Button></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Button variant="contained" color="secondary" onClick={() => { sendKey(Keys.KBD_y) }}>Z</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { sendKey(Keys.KBD_4) }}>4</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { sendKey(Keys.KBD_5) }}>5</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { sendKey(Keys.KBD_6) }}>6</Button></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Button variant="contained" color="secondary" onClick={() => { sendKey(Keys.KBD_z) }}>F/C</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { sendKey(Keys.KBD_1) }}>1</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { sendKey(Keys.KBD_2) }}>2</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { sendKey(Keys.KBD_3) }}>3</Button></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing="1px">
                <Grid item><Button variant="contained" color="secondary" onClick={() => { sendKey(Keys.KBD_NONE) }}>RSTR</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { sendKey(Keys.KBD_minus) }}>+/-</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { sendKey(Keys.KBD_0) }}>0</Button></Grid>
                <Grid item><Button variant="contained" onClick={() => { sendKey(Keys.KBD_period) }}>.</Button></Grid>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
