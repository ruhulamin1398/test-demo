"use client";
import AuthForm from "@/components/organisms/AuthForm";
import RegistrationForm from "@/components/organisms/RegistrationForm";
import { Facebook, Google } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";

const Login: React.FC = () => (
  <Container maxWidth="xs">
    <Box py={4}>
      <Card>
        <CardContent>
          <Box py={2}>
            <Typography variant="h5">Create Account</Typography>
            <Typography>Please create your account to continue</Typography>
          </Box>
          <RegistrationForm />
          <Box py={2}>
            <Link href={"/auth/login"}>
              <Typography textAlign={"center"}>
                Already have an account ?{" "}
                <Typography variant="body1" component={"span"} color="primary">
                  Login
                </Typography>
              </Typography>
            </Link>
          </Box>
          <Box
            display={"flex"}
            flexDirection="column"
            gap={2}
            alignItems={"center"}
          >
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={() => {}}
              sx={{
                backgroundColor: "#DB4437", // Google Red
                "&:hover": {
                  backgroundColor: "#c1352e", // Darker Google Red on hover
                },
              }}
              startIcon={<Google sx={{ marginRight: 1 }} />}
            >
              Signup with Google
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {}}
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#1877F2", // Facebook Blue
                "&:hover": {
                  backgroundColor: "#145dbf", // Darker Facebook Blue on hover
                },
              }}
              startIcon={<Facebook sx={{ marginRight: 1 }} />}
            >
              Signup with Facebook
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Container>
);

export default Login;
