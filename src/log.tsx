import { useState, useEffect, useRef } from 'react';
import { IconButton, Button, Dialog, DialogActions, DialogTitle, DialogContent } from "@mui/material";
import Paper, { PaperProps } from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import LogIcon from '@mui/icons-material/LogoDevOutlined';
import Draggable from 'react-draggable';

interface LogProps {
    registerCallback: Function
}

function DraggablePaper(props: PaperProps) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}


export default function Log(props: LogProps) {

    const logEndRef = useRef<HTMLDivElement | null>(null);
    const log = useRef<string>('');

    const logBuffer = useRef('');

    const [unread, setUnread] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);

    const scrollToBottom = () => {
        logEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [log]);

    const clear = () => {
        log.current = '';
        setUnread(0);
    }

    const addLogLine = (line: string) => {
        line = line.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
        line = line.replace(/\n/g, '');
        if (line != '[LOG_MISC]') {
            console.log(line);
            log.current = log.current + line + '\n';
            setUnread(unread + 1);
        }
    }

    props.registerCallback(addLogLine);

    return (
        <>
            <IconButton onClick={() => { setOpen(true); setUnread(0); }}>
                <Badge badgeContent={unread} color="primary">
                    <LogIcon color="inherit"/>
                </Badge>
            </IconButton>
            <Dialog scroll='paper' fullWidth maxWidth='sm' open={open} PaperComponent={DraggablePaper}>
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    DOSBox Log
                </DialogTitle>
                <DialogContent sx={{ fontSize: '10pt', fontWeight: 100, fontFamily: 'monospace', minHeight: '400px', maxHeight: '400px' }}>
                    <div>
                        <pre>
                            {log.current}
                        </pre>
                        <div ref={logEndRef} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" sx={{ width: '100px', height: '40px', border: 'none', clipPath: 'none' }} color="secondary" onClick={clear}>Clear</Button>
                    <Button variant="contained" sx={{ width: '100px', height: '40px', border: 'none', clipPath: 'none' }} color="primary" onClick={() => { setOpen(false) }}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
