import { Typography } from "@mui/material";

interface TextAtomProps {
  text: string;
  variant?: "body1" | "body2" | "h6" | "caption";
}

const TextAtom: React.FC<TextAtomProps> = ({ text, variant = "body2" }) => {
  return <Typography variant={variant}>{text}</Typography>;
};

export default TextAtom;
