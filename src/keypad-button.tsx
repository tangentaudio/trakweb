import { Button, Tooltip } from "@mui/material";

interface KeypadButtonProps {
    sendKeyEvent: any,
    keyCode: number,
    label?: string,
    tooltip?: string,
    tipsEnabled?: boolean
    altColor?: boolean
}

export default function KeypadButton(props: KeypadButtonProps) {
    return (
      <Tooltip enterDelay={1500} title={props.tooltip} disableHoverListener={!props.tipsEnabled} disableTouchListener={!props.tipsEnabled} disableFocusListener={!props.tipsEnabled} arrow>
        <Button color={ props.altColor ? "secondary" : "primary" } variant="contained" onMouseDown={() => { props.sendKeyEvent(props.keyCode, true) }} onMouseUp={ () => { props.sendKeyEvent(props.keyCode, false)}}>
          { props.label }
        </Button>
      </Tooltip>
    );
}