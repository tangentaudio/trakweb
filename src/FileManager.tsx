import { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Dialog, DialogActions, DialogTitle, DialogContent, Tooltip } from "@mui/material";
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
    const [fileList, setFileList] = useState<JSZip.JSZipObject[]>([]);
    let ci: CommandInterface = props.getCommandInterface();

    const zipobj = useRef<JSZip | null>(null);

    const uploadFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('saveToCache bundle name=', props.bundleUrl);
        if (!zipobj.current || !e.target.files)
            return;


        console.log(e.target.files);
        for (let i = 0; i < e.target.files.length; i++) {
            let f = e.target.files.item(i);
            if (f) {
                zipobj.current.file(f.name, f);
                setUnsaved(unsaved + 1);
            }
        }

        onOpen();
        saveToCache();
    }

    const saveToCache = async () => {
        if (!zipobj.current)
            return;
        const cache = await cachePromise;
        const newfs = await zipobj.current.generateAsync({ type: "uint8array" });
        console.log('newfs=', newfs.buffer);
        cache.put(props.bundleUrl + ".changes", newfs.buffer);
    }


    const erase = async (filename: string) => {
        if (!zipobj.current)
            return;
        console.log('erase', filename);

        zipobj.current.remove(filename);
        setUnsaved(unsaved + 1);

        onOpen();
        saveToCache();
    }

    const download = async (filename: string) => {
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
                        let filesAndDirs: JSZip.JSZipObject[] = z.file(/(\.LX2|\.MX2|.MX3|.CAM)/);
                        setFileList(filesAndDirs);
                        zipobj.current = z;
                    })
                } else {
                    console.error('no fsArray');
                }
            });
        } else {
            let filesAndDirs: JSZip.JSZipObject[] = zipobj.current.file(/(\.LX2|\.MX2|.MX3|.CAM)/);
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
                <DialogTitle>
                    File Manager
                </DialogTitle>
                <DialogContent sx={{ minHeight: '400px', maxHeight: '600px' }}>
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
                                        <TableCell sx={{fontFamily: "monospace", fontWeight: 900}}>{f.name}</TableCell>
                                        <TableCell>{f.date.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Download to your Downloads folder." enterDelay={1500}>
                                                <IconButton color="primary" onClick={(e) => { download(f.name) }}>
                                                    <IconDownload />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete this file from the simulator C: drive." enterDelay={1500}>
                                                <IconButton color="error" onClick={(e) => { erase(f.name) }}>
                                                    <IconDelete />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    { unsaved > 0 &&
                        <Button sx={{ width: '100px', height: '40px', border: 'none', clipPath: 'none' }} color="error" onClick={ () => { props.restartCallback(); setUnsaved(0); onClose(); }} >Restart</Button>
                    }
                    <Tooltip title="Upload from your Downloads folder to the simulator C: drive." enterDelay={1500}>
                        <Button
                            component="label"
                            role={undefined}
                            variant="outlined"
                            tabIndex={-1}
                            startIcon={<IconUpload/>}
                            sx={{ width: '150px', height: '40px', border: 'none', clipPath: 'none' }} 
                        >
                            Add File
                            <VisuallyHiddenInput type="file" onChange={uploadFiles}/>
                        </Button>
                    </Tooltip>
                    <Button variant="contained" sx={{ width: '100px', height: '40px', border: 'none', clipPath: 'none' }} color="primary" onClick={() => { onClose() }}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
