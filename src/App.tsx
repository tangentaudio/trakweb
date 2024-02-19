import { useState } from 'react';
import './App.css';
import { Link, Box, Grid, createTheme, ThemeProvider, Typography, Tabs, Tab } from '@mui/material';
import { blue, orange } from '@mui/material/colors';
import DosPlayer from "./dos-player";
import { CommandInterface, CommandInterfaceEvents, MessageType } from "emulators";
import { } from "emulators-ui";
import KeypadFKeys from './keypad-fkeys';
import KeypadLathe from './keypad-lathe';
import KeypadMill from './keypad-mill';
import SaveProgram from './SaveProgram';
import Log from './log';
import { bundles } from './bundles';
import GitInfo from 'react-git-info/macro';

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
  const gitInfo = GitInfo();
  const buildVersion = 'git ' + gitInfo.commit.shortHash + ' ' + gitInfo.commit.date;

  let ci: CommandInterface;

  let serialCallback: Function | null = null;
  let logCallback: Function | null = null;

  const lastTabVal = localStorage.getItem('currentTab');

  let lastTab = 0;
  if (lastTabVal)
    lastTab = parseInt(lastTabVal)

  if (lastTab >= bundles.length)
    lastTab = 0;

  const [tab, setTab] = useState<number>(lastTab);

  function sci(p: Promise<CommandInterface>) {
    p.then((cmdifc) => {
      ci = cmdifc;

      let evts: CommandInterfaceEvents = ci.events();

      evts.onStdout((msg: string) => {
        if (logCallback)
          logCallback(msg);
      });

      evts.onMessage((mt: MessageType, ...args: any) => {
        if (args && args[0]) {
          let m: string = args[0];
          if (mt === 'error' && m.startsWith('[LOG_MSG]SerialDummyTransmitByte: 0x')) {
            m = m.replace('[LOG_MSG]SerialDummyTransmitByte: 0x', '');
            let charVal = parseInt(m, 16);
            if (serialCallback)
              serialCallback(charVal);
          } else {
            if (logCallback)
              logCallback(args[0]);
          }
        }
      });

    }, () => { console.log("failure to get js-dos command interface") });
  }

  function registerSerialCharCallback(f: Function) {
    serialCallback = f;
  }

  function registerLogCallback(f: Function) {
    logCallback = f;
  }


  function sendKeyEvent(kcode: number, pressed: boolean) {
    if (ci !== null) {
      ci.sendKeyEvent(kcode, pressed);
    }
  }

  function tabChanged(v: number) {
    localStorage.setItem('currentTab', v.toString());
    setTab(v);
  }

  return (
    <ThemeProvider theme={theme}>

      <div style={{ display: 'block', float: 'right', padding: '6px' }}>
        <Typography variant="caption" sx={{color: '#aaaaaa'}}>{buildVersion}</Typography>
        <Log registerCallback={registerLogCallback} />
      </div>

      <Tabs value={tab} onChange={(e, v) => { tabChanged(v) }}>
        {bundles.map((bo, idx) => {
          return <Tab label={bo.desc} value={idx} />
        })}

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
                    <DosPlayer bundleUrl={bundles[tab].bundle} setCommandInterface={sci} />
                  </div>
                  <div style={{ marginLeft: '6px' }}>
                    <KeypadFKeys sendKeyEvent={sendKeyEvent}/>
                  </div>
                </Box>
              </Grid>
              <Grid item >
                <Grid container direction="row" sx={{ height: '100px' }} spacing={2}>
                  <Grid item>
                    <Box component="img" src="protohak.png" sx={{ height: '100px', ml: '10px' }} />
                  </Grid>
                  <Grid item sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Typography variant="h3" sx={{ fontWeight: 900, mb: '0px' }}>{bundles[tab].desc.toUpperCase()}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Box sx={{ border: '4px solid black', borderRadius: '20px', padding: '12px', ml: '10px', mb: '20px', backgroundColor: '#cccccc' }}>
              {bundles[tab].keypad === 'lathe' &&
                <KeypadLathe sendKeyEvent={sendKeyEvent} />
              }
              {bundles[tab].keypad === 'mill' &&
                <KeypadMill sendKeyEvent={sendKeyEvent} />
              }
            </Box>
          </Grid>
        </Grid>
      </Box>

      <SaveProgram id={bundles[tab].id} registerCallback={registerSerialCharCallback} />

      <Grid container direction="column" sx={{ mt: '30px', ml: '10px' }}>
        <Grid item>
          <Typography variant="caption" sx={{ fontWeight: '500', color: '#aaaaaa' }}>
            TRAK® is a registered trademark of Southwestern Industries.  Original machine software images are available for download on their web site.
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption" sx={{ fontWeight: '600', color: '#999999' }}>
            Running 30 year old DOS software in a web browser is made possible through the magic of <Link href="https://js-dos.com/">js-dos v7</Link>, built on a wasm/emscripten version of <Link href="https://www.dosbox.com/">DOSBox</Link>.
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption" sx={{ fontWeight: '600', color: '#777777' }}>
            <Link href="https://github.com/tangentaudio/protohak">ProtoHAK</Link> by Steve Richardson (steve.richardson@makeitlabs.com).  For educational and training purposes only - not for commercial use or resale.
          </Typography>
        </Grid>
      </Grid>

    </ThemeProvider>
  );
}

export default App;
