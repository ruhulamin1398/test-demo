"use client";
import AuthForm from "@/components/organisms/AuthForm";
import { AuthSplitLayout } from "@/layouts/auth-split";
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


export default function Layout({ children }: Props) {
  return ( 
      <AuthSplitLayout
        slotProps={{
          section: { title: 'Hi, Welcome back ' },
        }}
      >
        {children}
      </AuthSplitLayout> 
  );
}


// const Login: React.FC = () => (
//   <Container maxWidth="xs">
//     <Box py={4}>
//       <Card>
//         <CardContent>
//           <Box py={2}>
//             <Typography variant="h5">Login</Typography>
//             <Typography>Please login to continue</Typography>
//           </Box>
//           <AuthForm type="login" />
//           <Box py={2} display="flex" justifyContent={"space-between"}>
//             <Link href={"/auth/register"}>
//               <Typography variant="body1" component={"span"} color="primary">
//                 Forgot password ?
//               </Typography>
//             </Link>
//             <Link href={"/auth/register"}>
//               <Typography>
//                 No account ?{" "}
//                 <Typography variant="body1" component={"span"} color="primary">
//                   Create One
//                 </Typography>
//               </Typography>
//             </Link>
//           </Box>
//           <Box
//             display={"flex"}
//             flexDirection="column"
//             gap={2}
//             alignItems={"center"}
//           >
//             <Button
//               fullWidth
//               variant="contained"
//               color="error"
//               onClick={() => {}}
//               sx={{
//                 backgroundColor: "#DB4437", // Google Red
//                 "&:hover": {
//                   backgroundColor: "#c1352e", // Darker Google Red on hover
//                 },
//               }}
//               startIcon={<Google sx={{ marginRight: 1 }} />}
//             >
//               Sign in with Google
//             </Button>
//             <Button
//               fullWidth
//               variant="contained"
//               onClick={() => {}}
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 backgroundColor: "#1877F2", // Facebook Blue
//                 "&:hover": {
//                   backgroundColor: "#145dbf", // Darker Facebook Blue on hover
//                 },
//               }}
//               startIcon={<Facebook sx={{ marginRight: 1 }} />}
//             >
//               Sign in with Facebook
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   </Container>
// );

// export default Login;


