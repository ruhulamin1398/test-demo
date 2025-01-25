import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

interface ButtonProps extends MuiButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled,
  ...props
}) => (
  <MuiButton
    variant="contained"
    color="primary"
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {text}
  </MuiButton>
);

export default Button;
