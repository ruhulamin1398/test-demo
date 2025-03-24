import type { BoxProps } from '@mui/material/Box';
import { signIn } from "next-auth/react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { GithubIcon, GoogleIcon, TwitterIcon } from '@/assets/icons';

// ----------------------------------------------------------------------

type FormSocialsProps = BoxProps & {
  signInWithGoogle?: () => void;
  singInWithGithub?: () => void;
  signInWithTwitter?: () => void;
};

export function FormSocials({
  sx,
  ...other
}: FormSocialsProps) {
  return (
    <Box
      sx={[
        () => ({
          gap: 1.5,
          display: 'flex',
          justifyContent: 'center',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <IconButton color="inherit" onClick={() => signIn("google")}>
        <GoogleIcon width={22} />
      </IconButton>
      <IconButton color="inherit" onClick={() => signIn("github")}>
        <GithubIcon width={22} />
      </IconButton>
      <IconButton color="inherit" onClick={() => signIn("twitter")}>
        <TwitterIcon width={22} />
      </IconButton>
    </Box>
  );
}
