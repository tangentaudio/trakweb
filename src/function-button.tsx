import { Button } from "@mui/material";

interface FunctionButtonProps {
    sendKeyEvent: any,
    keyCode: number,
}

export default function FunctionButton(props: FunctionButtonProps) {
    return (
      <Button variant="pointy" onMouseDown={() => { props.sendKeyEvent(props.keyCode, true) }} onMouseUp={ () => { props.sendKeyEvent(props.keyCode, false)}} />
    );
}