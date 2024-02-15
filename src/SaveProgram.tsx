import { useState, useEffect, useRef } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from "@mui/material";

interface SaveProgramProps {
    id: string,
    registerCallback: Function,
}

export default function SaveProgram(props: SaveProgramProps) {

    const progEndRef = useRef<HTMLDivElement | null>(null);

    const serialBuffer = useRef('');

    const [downloading, setDownloading] = useState<boolean>(false);
    const [program, setProgram] = useState<string>('');
    const [programNumber, setProgramNumber] = useState<string>('');
    const [filename, setFilename] = useState<string>('program.' + props.id);

    const scrollToBottom = () => {
        progEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [program]);


    const download = async () => {
        const blob: Blob = new Blob([program], { type: 'text/plain' });

        const a = document.createElement('a');
        a.download = filename;
        a.href = URL.createObjectURL(blob);
        a.addEventListener('click', (e) => {
            setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
        });
        a.click();
    }
    const clear = () => {
        serialBuffer.current = '';
        setProgram('');
        setProgramNumber('');
        setFilename('');
        setDownloading(false);
    }

    const processSerialChar = (cv: number) => {
        let c: string = String.fromCharCode(cv);
        let sbuf = serialBuffer.current;

        if (cv === 0x1a) { // ^Z is sent at the end of a program
            console.log(sbuf);

            // CR+LF are swapped on serial output for some reason
            setProgram(sbuf.replace(/\n\r/g, '\r\n'));

            setDownloading(false);
        } else {
            if (sbuf.length === 0)
                setDownloading(true);
            else if (sbuf.startsWith('PN') && filename === '') {
                let w = sbuf.split(' ');
                if (w.length >= 2) {
                    console.log(w);
                    let pn: string = w[0].replace('PN', '');
                    setProgramNumber(pn);
                    setFilename(pn + '.' + props.id);
                }
            }

            sbuf = sbuf + c;
            serialBuffer.current = sbuf;
            setProgram(sbuf);
        }
    }


    props.registerCallback(processSerialChar);

    return (
        <Dialog scroll='paper' fullWidth maxWidth='xl' open={program.length > 0 || downloading}>
            <DialogTitle>
                {downloading &&
                    'Receiving Program #' + programNumber + ' (' + program.length + ' bytes)'
                }
                {!downloading &&
                    'Received Program #' + programNumber + ' (' + program.length + ' bytes total)'
                }
            </DialogTitle>
            <DialogContent sx={{ fontSize: '10pt', fontWeight: 100, fontFamily: 'monospace', minHeight: '400px', maxHeight: '400px' }}>
                <div>
                    <pre>
                        {program}
                    </pre>
                    <div ref={progEndRef} />
                </div>
            </DialogContent>
            <DialogActions>
                <TextField disabled={downloading} label="Download Filename" value={filename} onChange={(ev) => { setFilename(ev.target.value) }}></TextField>
                <Button disabled={downloading} variant="contained" sx={{ width: '200px', border: 'none', clipPath: 'none' }} autoFocus onClick={download}>Download</Button>
                <Button disabled={downloading} variant="contained" sx={{ width: '200px', border: 'none', clipPath: 'none' }} color="secondary" onClick={clear}>Clear</Button>

            </DialogActions>
        </Dialog>
    )
}
