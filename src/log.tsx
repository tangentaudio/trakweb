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

    const logBuffer = useRef('');

    const [unread, setUnread] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    const [log, setLog] = useState<string>('');

    const scrollToBottom = () => {
        logEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [log]);

    const clear = () => {
        setLog('');
    }

    const addLogLine = (line: string) => {
        if (line != '[LOG_MISC]') {
            const newlog = log + line + '\n';
            setLog(newlog);
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
                            {log}
                        </pre>
                        <div ref={logEndRef} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" sx={{ width: '100px', height: '40px', border: 'none', clipPath: 'none' }} color="primary" onClick={() => { setOpen(false) }}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
