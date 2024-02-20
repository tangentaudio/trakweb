import { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Dialog, DialogActions, DialogTitle, DialogContent, Tooltip, Typography } from "@mui/material";
import Badge from '@mui/material/Badge';
import SaveIcon from '@mui/icons-material/Save';
import { CommandInterface } from "emulators";
import JSZip from "jszip";
import IconDownload from '@mui/icons-material/Download';
import IconUpload from '@mui/icons-material/UploadFile';
import IconDelete from '@mui/icons-material/DeleteForever';
import { makeCache } from "./cache";

const cacheName = "emulators-ui-saves";
const cachePromise = makeCache(cacheName, {
    onErr: console.error,
});

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface FileManagerProps {
    getCommandInterface: Function,
    bundleUrl: string,
    restartCallback: Function
}

export default function FileManager(props: FileManagerProps) {

    const [open, setOpen] = useState<boolean>(false);
    const [unsaved, setUnsaved] = useState<number>(0);
    const [messages, setMessages] = useState<string[]|null>(null);
    const [fileList, setFileList] = useState<JSZip.JSZipObject[]>([]);
    let ci: CommandInterface = props.getCommandInterface();

    const zipobj = useRef<JSZip | null>(null);

    const clearMessages = async () => {
        setMessages(null);
    }

    const addMessage = async (clear: boolean, m: string) => {
        
        let msgs = clear ? [] : messages || [];
        msgs.push(m);
        setMessages(msgs);
    }

    const uploadFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let clear:boolean = true;

        if (!zipobj.current || !e.target.files)
            return;


        for (let i = 0; i < e.target.files.length; i++) {
            let f = e.target.files.item(i);
            if (f) {
                let validFilenameRegexp = new RegExp(/^\d{1,8}.(LX2|MX2|MX3|CAM)/);

                let filename = f.name.toUpperCase();
                if (validFilenameRegexp.test(filename)) {
                    zipobj.current.file(filename, f);
                    setUnsaved(unsaved + 1);
                } else {
                    addMessage(clear, 'Filename "' + filename + '" is invalid.');
                    clear = false;
                }
            }
        }

        onOpen();
    }

    const saveToCache = async () => {
        if (!zipobj.current)
            return;
        const cache = await cachePromise;
        const newfs = await zipobj.current.generateAsync({ type: "uint8array" });
        cache.put(props.bundleUrl + ".changes", newfs.buffer);
    }


    const erase = async (filename: string) => {
        if (!zipobj.current)
            return;

        zipobj.current.remove(filename);
        setUnsaved(unsaved + 1);

        onOpen();
        saveToCache();
    }

    const downloadFile = async (filename: string) => {
        if (!zipobj.current)
            return;

        let f = zipobj.current.file(filename);
        if (f) {
            f.async("string").then((content: string) => {
                const blob: Blob = new Blob([content], { type: 'text/plain' });

                const a = document.createElement('a');
                a.download = filename;
                a.href = URL.createObjectURL(blob);
                a.addEventListener('click', (e) => {
                    setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
                });
                a.click();
            });
        }
    }

    function onClose() {
        setOpen(false);
        setUnsaved(0);
        clearMessages();
        zipobj.current = null;
    }

    function onOpen() {
        if (!ci)
            ci = props.getCommandInterface();

        setOpen(true);

        if (!zipobj.current) {
            ci.persist().then((fsArray: Uint8Array | null) => {
                if (fsArray) {
                    var fs_zip = new JSZip();
                    let onlyFiles: JSZip.JSZipObject[];
                    fs_zip.loadAsync(fsArray).then((z) => {
                        let filesAndDirs: JSZip.JSZipObject[] = z.file(/(\.LX2|\.MX2|.MX3|.CAM|.lx2|.mx2|.mx3|.cam)/);
                        setFileList(filesAndDirs);
                        zipobj.current = z;
                    })
                } else {
                    console.error('no fsArray');
                }
            });
        } else {
            let filesAndDirs: JSZip.JSZipObject[] = zipobj.current.file(/(\.LX2|\.MX2|.MX3|.CAM.lx2|.mx2|.mx3|.cam)/);
            setFileList(filesAndDirs);

        }
    }

    return (
        <>
            <IconButton onClick={onOpen} >
                <Badge badgeContent={unsaved} color="secondary">
                    <SaveIcon color="primary" />
                </Badge>
            </IconButton>
            <Dialog open={open} >
                <DialogTitle sx={{ fontFamily: "monospace", fontWeight: 900 }}>
                    Simulator C: Drive
                </DialogTitle>
                <DialogContent sx={{ minHeight: '400px', maxHeight: '600px' }}>
                {unsaved > 0 &&
                        <Box sx={{ backgroundColor: "#fff0f0", p: "10px", mt: "10px" }}>
                            <Typography variant="subtitle2">New files or deleted files will not appear in PROG IN/OUT until you restart the simulator with the button below.</Typography>
                            <Typography variant="subtitle1" color="error" sx={{fontWeight: 900}}>Only do this if you're sure you won't lose unsaved work!</Typography>
                        </Box>
                    }
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>File Name</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Operation</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {fileList.map((f) => (
                                    <TableRow key={f.name}>
                                        <TableCell sx={{ fontFamily: "monospace", fontWeight: 900 }}>{f.name}</TableCell>
                                        <TableCell>{f.date.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Download from the simulator C: drive to your computer." enterDelay={1500}>
                                                <IconButton color="primary" onClick={(e) => { downloadFile(f.name) }}>
                                                    <IconDownload />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete this file from the simulator C: drive." enterDelay={1500}>
                                                <IconButton color="inherit" onClick={(e) => { erase(f.name) }}>
                                                    <IconDelete />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {messages && messages.length > 0 &&
                        <Box sx={{ backgroundColor: "#ffe0e0", p: "10px", mt: "10px" }}>
                            {messages.map((m) => (
                                <Typography variant="caption">{m}<br/></Typography>
                            ))}
                        </Box>
                    }
                </DialogContent>
                <DialogActions>
                    {unsaved > 0 &&
                        <Tooltip title="File manager files have changed.  You must restart the simulator for the changes to show up there." enterDelay={1500}>
                            <Button sx={{ width: '150px', height: '40px', border: 'none', clipPath: 'none' }} color="error" onClick={() => { saveToCache(); setTimeout(() => { props.restartCallback(); onClose();}, 500); }} >Save & Restart</Button>
                        </Tooltip>
                    }
                    <Tooltip title="Upload from your computer to the simulator C: drive." enterDelay={1500}>
                        <Button
                            component="label"
                            role={undefined}
                            variant="outlined"
                            startIcon={<IconUpload />}
                            color="secondary"
                            sx={{ width: '150px', height: '40px', border: 'none', clipPath: 'none' }}
                        >
                            Add File(s)
                            <VisuallyHiddenInput type="file" onChange={uploadFiles} accept=".LX2,.MX2,.MX3,.CAM" multiple />
                        </Button>
                    </Tooltip>
                    <Button variant={unsaved > 0 ? "contained" : "outlined"} sx={{ width: '100px', height: '40px', border: 'none', clipPath: 'none' }} color={unsaved > 0 ? "secondary" : "primary"} onClick={() => { onClose() }}>{unsaved > 0 ? "Cancel" : "Close"}</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
