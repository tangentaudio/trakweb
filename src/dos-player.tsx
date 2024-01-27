import React, { useEffect, useRef, useState } from "react";
import { DosPlayer as Instance, DosPlayerFactoryType, DosPlayerOptions } from "js-dos";

declare const Dos: DosPlayerFactoryType;

interface PlayerProps {
    bundleUrl: string;
    setCommandInterface: any;
}

export default function DosPlayer(props: PlayerProps) {
    const rootRef = useRef<HTMLDivElement | null>(null);

    const [dos, setDos] = useState<Instance | null>(null);

    useEffect(() => {
        if (dos !== null)
            return;
        if (rootRef === null || rootRef.current === null) {
            console.log('rootRef Null');
            return;
        }

        const o: DosPlayerOptions = { noSideBar: true, style: 'none', noFullscreen: true, preventUnload: true, noSocialLinks: true };

        const root = rootRef.current as HTMLDivElement;
        const instance = Dos(root, o);

        setDos(instance);

        return () => {
            instance.stop();
        };
    }, [dos]);
    
    useEffect(() => {
        if (dos !== null) {
            const ci = dos.run(props.bundleUrl); // ci is returned
            props.setCommandInterface(ci);
        }
    }, [dos, props]);

    return (<div ref={rootRef} style={{ width: "100%", height: "100%" }}/>);
}