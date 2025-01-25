import { Facebook, Twitter, GitHub } from "@mui/icons-material";
import IconAtom from "@/components/atoms/IconAtom";

const SocialMediaLinks = () => {
  return (
    <div>
      <IconAtom icon={Facebook} href="https://facebook.com" />
      <IconAtom icon={Twitter} href="https://twitter.com" />
      <IconAtom icon={GitHub} href="https://github.com" />
    </div>
  );
};

export default SocialMediaLinks;
