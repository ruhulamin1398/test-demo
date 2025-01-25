import { Link, List, ListItem, ListItemText } from "@mui/material";

interface LinkListProps {
  links: { label: string; href: string }[];
}

const LinkList: React.FC<LinkListProps> = ({ links }) => {
  return (
    <List>
      {links.map((link, index) => (
        <ListItem key={index} disableGutters>
          <Link href={link.href} color="inherit" underline="hover">
            <ListItemText primary={link.label} />
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default LinkList;
