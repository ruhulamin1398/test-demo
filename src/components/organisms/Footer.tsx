import React from "react";
import { Box, Container, Divider } from "@mui/material";
import TextAtom from "@/components/atoms/TextAtom"; // Atom for text
import LinkList from "@/components/molecules/LinkList"; // Molecule for the link list
import SocialMediaLinks from "@/components/molecules/SocialMediaLinks"; // Molecule for social media icons
import Grid from "@mui/material/Grid2";

const Footer = () => {
  const footerLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const additionalInfo = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  return (
    <Box sx={{ backgroundColor: "#333", color: "#fff", py: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Links Section */}
          <Grid size={4}>
            <TextAtom text="Quick Links" variant="h6" />
            <LinkList links={footerLinks} />
          </Grid>

          {/* Additional Section (Could be Contact Info or other important info) */}
          <Grid size={4}>
            <TextAtom text="Company Info" variant="h6" />
            <LinkList links={additionalInfo} />
          </Grid>

          {/* Empty space to balance the layout */}
          <Grid size={3}>
            <TextAtom text="Contact Us" variant="h6" />
            <TextAtom text="Email: support@company.com" variant="body2" />
            <TextAtom text="Phone: +1234567890" variant="body2" />
            <Box py={2}>
              <TextAtom text="Follow Us" variant="h6" />
              <SocialMediaLinks />
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section with Separator */}
        <Divider sx={{ my: 2, borderColor: "rgba(255, 255, 255, 0.3)" }} />
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <TextAtom
            text="© 2024 Company Name. All rights reserved."
            variant="body2"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
