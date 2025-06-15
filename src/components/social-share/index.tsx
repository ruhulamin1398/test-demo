"use client";

import { Box } from "@mui/material";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

interface SocialShareProps {
  url: string;
  text?: string;
}

const SocialShare = ({ url, text }: SocialShareProps) => {
  return (
    <Box
      sx={{ display: "flex", gap: 0.5, alignItems: "center", pt: 0.5, pr: 0.5 }}
    >
      <FacebookShareButton url={url}>
        <FacebookIcon size={14} round />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={14} round />
      </TwitterShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={14} round />
      </WhatsappShareButton>
    </Box>
  );
};

export default SocialShare;
