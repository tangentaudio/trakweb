import { useState } from 'react';
import { Box, Grid, Typography, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from "@mui/material";
import { CommandInterface, CommandInterfaceEvents, MessageType } from "emulators";

interface SaveProgramProps {
    tab: string,
    registerCallback: Function,
}


export default function SaveProgram(props: SaveProgramProps) {

    const [haveProgram, setHaveProgram] = useState<boolean>(false);
    const [program, setProgram] = useState<string>('');
    const [programNumber, setProgramNumber] = useState<string>('');
    const [filename, setFilename] = useState<string>('program.' + props.tab);

    const download = async () => {

        // CR+LF are swapped on serial output for some reason
        let prog = program.replace(/\n\r/g, '\r\n');

        const blob: Blob = new Blob([prog], { type: 'text/plain' });

        const a = document.createElement('a');
        a.download = filename;
        a.href = URL.createObjectURL(blob);
        a.addEventListener('click', (e) => {
            setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
        });
        a.click();
    }
    const clear = () => {
        setProgram('');
        setProgramNumber('');
        setFilename('');
        setHaveProgram(false);
    }

    const processSerialChar = (cv: number) => {
        let c: string = String.fromCharCode(cv);

        if (cv === 0x1a) { // ^Z is sent at the end of a program
            if (program.startsWith('PN')) {
                let w = program.split(' ');
                if (w.length >= 1) {
                    let pn: string = w[0].replace('PN', '');
                    setProgramNumber(pn);
                    setFilename(pn + '.' + props.tab);
                }
            }

            setHaveProgram(true);
        } else {
            setProgram(program + c);
        }
    }


    props.registerCallback(processSerialChar);

    return (
        <Dialog fullWidth maxWidth='xl' open={haveProgram}>
            <DialogTitle>
                Stored Program {programNumber}
            </DialogTitle>
            <DialogContent sx={{fontSize: '10pt', fontWeight: 100, fontFamily: 'monospace' }}>
                <pre>
                    {program}
                </pre>
            </DialogContent>
            <DialogActions>
                <TextField label="Program Filename" value={filename} onChange={(ev) => { setFilename(ev.target.value) }}></TextField>
                <Button variant="contained" sx={{ width: '200px', border: 'none', clipPath: 'none' }} autoFocus onClick={download}>Download</Button>
                <Button variant="contained" sx={{ width: '200px', border: 'none', clipPath: 'none' }} color="secondary" onClick={clear}>Clear</Button>

            </DialogActions>
        </Dialog>
    )
}
