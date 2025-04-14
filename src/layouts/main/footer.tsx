import type { Breakpoint } from "@mui/material/styles";

import {
  Box,
  Link,
  Divider,
  Container,
  IconButton,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { _socials } from "@/_mock";
import { Instagram, Twitter, Facebook } from "@mui/icons-material";

import { Logo } from "@/components/logo";

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: "Quick Links",
    children: [
      { name: "About us", href: paths.about },
      { name: "How It Works", href: paths.contact },
      { name: "FAQs", href: paths.faqs },
      { name: "Contact", href: paths.faqs },
    ],
  },
];

// ----------------------------------------------------------------------

const FooterRoot = styled("footer")(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.vars.palette.background.default,
}));

export type FooterProps = React.ComponentProps<typeof FooterRoot>;

export function Footer({
  sx,
  layoutQuery = "md",
  ...other
}: FooterProps & { layoutQuery?: Breakpoint }) {
  return (
    <FooterRoot sx={sx} {...other}>
      <Container
        sx={(theme) => ({
          pb: 5,
          pt: 10,
          textAlign: "center",
          [theme.breakpoints.up(layoutQuery)]: { textAlign: "unset" },
        })}
      >
        {/* <Logo /> */}

        <Grid
          container
          sx={[
            (theme) => ({
              mt: 3,
              justifyContent: "center",
              [theme.breakpoints.up(layoutQuery)]: {
                justifyContent: "space-between",
              },
            }),
          ]}
        >
          <Grid size={{ xs: 12, [layoutQuery]: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              BeeJoyi
            </Typography>
            <Typography variant="body2" color="textSecondary" mt={1}>
              Discover, compete, and win in the world most exciting creative
              contests.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, [layoutQuery]: 3 }}>
            <Box
              sx={(theme) => ({
                gap: 5,
                display: "flex",
                flexDirection: "column",
                [theme.breakpoints.up(layoutQuery)]: { flexDirection: "row" },
              })}
            >
              {LINKS.map((list) => (
                <Box
                  key={list.headline}
                  sx={(theme) => ({
                    gap: 2,
                    width: 1,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    [theme.breakpoints.up(layoutQuery)]: {
                      alignItems: "flex-start",
                    },
                  })}
                >
                  <Typography fontWeight="bold" variant="h6">
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => (
                    <Link
                      key={link.name}
                      component={RouterLink}
                      href={link.href}
                      color="inherit"
                      variant="body2"
                    >
                      {link.name}
                    </Link>
                  ))}
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, [layoutQuery]: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Follow Us
            </Typography>

            <Box
              sx={(theme) => ({
                mt: 3,
                mb: 5,
                display: "flex",
                justifyContent: "center",
                [theme.breakpoints.up(layoutQuery)]: {
                  mb: 0,
                  justifyContent: "flex-start",
                },
              })}
            >
              {_socials.map((social) => (
                <IconButton key={social.label}>
                  {social.value === "twitter" && (
                    <Twitter
                      sx={{
                        color: "white",
                        cursor: "pointer",
                        "&:hover": { color: "#6A5ACD" },
                      }}
                    />
                  )}
                  {social.value === "facebook" && (
                    <Facebook
                      sx={{
                        color: "white",
                        cursor: "pointer",
                        "&:hover": { color: "#6A5ACD" },
                      }}
                    />
                  )}
                  {social.value === "instagram" && (
                    <Instagram
                      sx={{
                        color: "white",
                        cursor: "pointer",
                        "&:hover": { color: "#6A5ACD" },
                      }}
                    />
                  )}
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, [layoutQuery]: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Contest Alert
            </Typography>
            <Box display="flex" mt={1}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Your email"
                size="small"
                sx={{
                  bgcolor: "#1C1F26",
                  borderRadius: 1,
                  input: { color: "#fff" },
                }}
              />
              <Button
                variant="contained"
                sx={{ bgcolor: "#6A5ACD", ml: 1, px: 3, borderRadius: 1 }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mt: 10, textAlign: "center" }}
        >
          © 2025 BeeJoyi. All rights reserved.
        </Typography>
      </Container>
    </FooterRoot>
  );
}

// ----------------------------------------------------------------------

export function HomeFooter({ sx, ...other }: FooterProps) {
  return (
    <FooterRoot
      sx={[
        {
          py: 5,
          textAlign: "center",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container>
        <Logo />
        <Box sx={{ mt: 1, typography: "caption" }}>
          © All rights reserved.
          <br /> made by
          <Link href="https://minimals.cc/"> minimals.cc </Link>
        </Box>
      </Container>
    </FooterRoot>
  );
}
