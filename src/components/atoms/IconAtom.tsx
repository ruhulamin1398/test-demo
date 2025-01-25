import { SvgIconProps } from "@mui/material";
import { SvgIcon } from "@mui/material";

interface IconAtomProps {
  icon: React.ElementType<SvgIconProps>;
  href: string;
}

const IconAtom: React.FC<IconAtomProps> = ({ icon: Icon, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ marginRight: "16px" }}
    >
      <Icon fontSize="large" style={{ color: "#fff" }} />
    </a>
  );
};

export default IconAtom;
