import { useState } from 'react';
import './App.css';
import { Button, Box, Grid, createTheme, ThemeProvider, Typography, Tabs, Tab } from '@mui/material';
import { blue, orange } from '@mui/material/colors';
import DosPlayer from "./dos-player";
import { CommandInterface } from "emulators";
import KeypadFKeys from './keypad-fkeys';
import KeypadLX2 from './keypad-lx2';
import KeypadMX3 from './keypad-mx3';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    pointy: true;
  }
}

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: orange
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          fontWeight: '900',
          width: '70px',
          height: '70px',

          clipPath: "polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%);"
        },
      },
      variants: [
        {
          props: { variant: 'pointy' },
          style: {
            fontWeight: 500,
            borderRadius: 0,
            backgroundColor: '#333333',
            color: 'white',
            paddingTop: '40px',
            clipPath: "polygon(50% 0%, 100% 30%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 30%);",
            width: '89px',
            height: '89px',
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
  const [tab, setTab] = useState<string | null>('mx3');

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
      <Tabs value={tab} onChange={(e, v) => { setTab(v) }}>
        <Tab label="Mill" value="mx3" />
        <Tab label="Lathe" value="lx2" />
        <Button sx={{ width: '200px' }} onClick={() => { window.open(tab + '.pdf', '_blank') }}>{"Open " + tab + " Manual \u29c9 "}</Button>
      </Tabs>

      <Box sx={{ border: '8px solid black', borderRadius: '30px', padding: '6px', mt: '6px', ml: '10px', backgroundColor: '#eeeeee', maxWidth: '60%',
                 filter: 'drop-shadow(20px 20px 8px #333333)' }}>
        <Grid container direction="row" spacing={2} sx={{ width: '100%', pl: '20px', pt: '20px' }}>
          <Grid item>
            <Grid container direction="column" spacing="1px">
              <Grid item>
                <Box sx={{ border: '4px solid black', borderRadius: '20px', padding: '6px', backgroundColor: '#aaaaaa' }}>
                  <div className="App" style={{ width: "720px", height: "360px", border: '4px solid black', borderRadius: '12px' }} >
                    <DosPlayer bundleUrl={tab + '.bundle'} setCommandInterface={sci} />
                  </div>
                  <KeypadFKeys sendKey={sendKey} />
                </Box>
              </Grid>
              <Grid item >
                <Box component="img" src="trakweb.png" sx={{ width: '300px', ml: '20px' }} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Box sx={{ border: '4px solid black', borderRadius: '20px', padding: '6px', ml: '20px', mb: '20px', backgroundColor: '#eeeeee' }}>
              {tab === 'lx2' &&
                <KeypadLX2 sendKey={sendKey} />
              }
              {tab === 'mx3' &&
                <KeypadMX3 sendKey={sendKey} />
              }
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Grid container direction="column" sx={{ mt: '20px', ml: '10px'}}>
      <Grid item>
          <Typography color="#aaaaaa" variant="caption">TRAK® is a registered trademark of Southwestern Industries.</Typography>
        </Grid>
        <Grid item>
          <Typography color="#aaaaaa" variant="caption">Copyright 2024 Steve Richardson (steve.richardson@makeitlabs.com) - for educational and training purposes only.</Typography>
        </Grid>
      </Grid>

    </ThemeProvider>
  );
}

export default App;
