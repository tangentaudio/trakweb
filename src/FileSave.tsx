import { useState, useRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Dialog, DialogActions, DialogTitle, DialogContent } from "@mui/material";
import Badge from '@mui/material/Badge';
import SaveIcon from '@mui/icons-material/Save';
import { CommandInterface, CommandInterfaceEvents, MessageType } from "emulators";
import JSZip from "jszip";
import IconDownload from '@mui/icons-material/Download';

interface FileSaveProps {
    getCommandInterface: Function
}

export default function FileSave(props: FileSaveProps) {

    const [open, setOpen] = useState<boolean>(false);
    const [unsaved, setUnsaved] = useState<number>(0);
    const [fileList, setFileList] = useState<JSZip.JSZipObject[]>([]);
    let ci:CommandInterface = props.getCommandInterface();

    const zipobj = useRef<JSZip | null>(null);

    const download = async (filename: string) => {
        console.log('download', filename);
        if (!zipobj.current)
            return;

        let f = zipobj.current.file(filename);
        if (f) {
            f.async("string").then( (content:string) => {
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

    function onOpen() {
        if (!ci)
            ci = props.getCommandInterface();
        
        setOpen(true);
        ci.persist(true).then((fsArray: Uint8Array | null) => {
            if (fsArray) {
                var fs_zip = new JSZip();
                let onlyFiles: JSZip.JSZipObject[];
                fs_zip.loadAsync(fsArray).then((z) => {
                    let filesAndDirs: JSZip.JSZipObject[] = z.file(/(\.LX2|\.MX2|.MX3|.CAM)/);
                    setFileList(filesAndDirs);
                    zipobj.current = z;
                })
            }
        });

    }

    return (
        <>
            <IconButton onClick={onOpen} >
                <Badge badgeContent={unsaved} color="primary">
                    <SaveIcon color="inherit" />
                </Badge>
            </IconButton>
            <Dialog fullWidth maxWidth='sm' open={open} >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Save File
                </DialogTitle>
                <DialogContent sx={{ fontSize: '10pt', fontWeight: 100, fontFamily: 'monospace', minHeight: '400px', maxHeight: '400px' }}>
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
                                { fileList.map((f, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{f.name}</TableCell>
                                        <TableCell>{f.date.toLocaleString()}</TableCell>
                                        <TableCell><IconButton onClick={(e) => { download(f.name)}}><IconDownload/></IconButton></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" sx={{ width: '100px', height: '40px', border: 'none', clipPath: 'none' }} color="primary" onClick={() => { setOpen(false) }}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
