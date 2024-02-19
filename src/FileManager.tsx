import { useState, useRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Dialog, DialogActions, DialogTitle, DialogContent } from "@mui/material";
import Badge from '@mui/material/Badge';
import SaveIcon from '@mui/icons-material/Save';
import { CommandInterface } from "emulators";
import JSZip from "jszip";
import IconDownload from '@mui/icons-material/Download';
import { makeCache } from "./cache";

const cacheName = "emulators-ui-saves";
const cachePromise = makeCache(cacheName, {
    onErr: console.error,
});

interface FileManagerProps {
    getCommandInterface: Function,
    bundleUrl: string
}

export default function FileManager(props: FileManagerProps) {

    const [open, setOpen] = useState<boolean>(false);
    const [unsaved, setUnsaved] = useState<number>(0);
    const [fileList, setFileList] = useState<JSZip.JSZipObject[]>([]);
    let ci: CommandInterface = props.getCommandInterface();

    const zipobj = useRef<JSZip | null>(null);


    function handleFileBrowse(e:React.ChangeEvent<HTMLInputElement>) {
    }


    const saveToCache = async (e:React.ChangeEvent<HTMLInputElement>) => {
        console.log('saveToCache bundle name=', props.bundleUrl);
        if (!zipobj.current || !e.target.files)
            return;

        const cache = await cachePromise;

        console.log(e.target.files);
        let f = e.target.files[0];

            zipobj.current.file(f.name, f);
            console.log(f);

        //zipobj.current.file("2112.LX2", "Hello World\n");

        onOpen();

        const newfs = await zipobj.current.generateAsync({type: "uint8array"});

        console.log('newfs=', newfs.buffer);

        cache.put(props.bundleUrl + ".changes", newfs.buffer);
    }

    const download = async (filename: string) => {
        console.log('download', filename);
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
                <Badge badgeContent={unsaved}>
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
                                        <TableCell>{f.name}</TableCell>
                                        <TableCell>{f.date.toLocaleString()}</TableCell>
                                        <TableCell><IconButton onClick={(e) => { download(f.name) }}><IconDownload /></IconButton></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <input type="file" onChange={saveToCache}/>
                    <Button variant="contained" sx={{ width: '100px', height: '40px', border: 'none', clipPath: 'none' }} color="primary" onClick={() => { onClose() }}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
