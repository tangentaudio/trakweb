import { useState } from 'react';
import './App.css';
import { Link, Box, Grid, createTheme, ThemeProvider, Typography, Tabs, Tab } from '@mui/material';
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
    secondary: orange,
    action: {
      active: blue[200],
      hover: blue[100],
      hoverOpacity: 0.7,
      focus: blue[600],
      focusOpacity: 1,
      selected: blue[300],
      selectedOpacity: 1
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          fontWeight: '900',
          width: '70px',
          height: '70px',
          borderRadius: '10px',
          border: '4px solid #22222255',

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
            '&:hover': {
              background: "#555555",
            },
            color: 'white',
            paddingTop: '40px',
            border: '0px',
            clipPath: "polygon(50% 0%, 100% 30%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 30%);",
            width: '89px',
            height: '89px'
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
        <Tab label="MX3 Mill" value="mx3" />
        <Tab label="LX2 Lathe" value="lx2" />
      </Tabs>

      <Box sx={{
        border: '8px solid black', borderRadius: '30px', padding: '6px', mt: '15px', ml: '10px', backgroundColor: '#eeeeee', maxWidth: '1170px',
        filter: 'drop-shadow(20px 20px 8px #333333)'
      }}>
        <Grid container direction="row" spacing={2} sx={{ width: '100%', pl: '20px', pt: '20px' }}>
          <Grid item>
            <Grid container direction="column" spacing="1px">
              <Grid item>
                <Box sx={{ border: '4px solid black', borderRadius: '20px', padding: '12px', backgroundColor: '#cccccc' }}>
                  <div className="App" style={{ width: "732px", height: "360px", border: '6px solid black', borderRadius: '15px' }} >
                    <DosPlayer bundleUrl={tab + '.bundle'} setCommandInterface={sci} />
                  </div>
                  <div style={{ marginLeft: '6px' }}>
                    <KeypadFKeys sendKey={sendKey} />
                  </div>
                </Box>
              </Grid>
              <Grid item >
                <Grid container direction="row" sx={{ height: '100px' }} spacing={2}>
                  <Grid item>
                    <Box component="img" src="protohak.png" sx={{ height: '100px', ml: '10px' }} />
                  </Grid>
                  <Grid item sx={{ display: 'flex', alignItems: 'flex-end'}}>
                    <Typography variant="h2" sx={{fontWeight: 900, mb: '-4px' }}>{tab?.toUpperCase()}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Box sx={{ border: '4px solid black', borderRadius: '20px', padding: '12px', ml: '10px', mb: '20px', backgroundColor: '#cccccc' }}>
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

      <Grid container direction="column" sx={{ mt: '30px', ml: '10px' }}>
        <Grid item>
          <Typography variant="caption" sx={{fontWeight: '500', color: '#aaaaaa'}}>
            TRAK® is a registered trademark of Southwestern Industries.  Unmodified original machine software images are available on their web site.
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption" sx={{fontWeight: '600', color: '#999999' }}>
            30 year old DOS software in a web browser is made possible through the magic of <Link href="https://js-dos.com/">js-dos v7</Link>, built on a wasm/emscripten version of <Link href="https://www.dosbox.com/">DOSBox</Link>.
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption" sx={{fontWeight: '600', color: '#777777' }}>
          <Link href="https://github.com/tangentaudio/protohak">ProtoHAK</Link> is for educational and training purposes only - not for commercial use or resale.
          </Typography>
        </Grid>
      </Grid>

    </ThemeProvider>
  );
}

export default App;
