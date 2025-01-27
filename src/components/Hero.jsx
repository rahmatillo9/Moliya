"use client"
import GitHubIcon from '@mui/icons-material/GitHub';
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material"
import { CheckCircle} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"


const features = ["Fully Customize", "Responsive", "Organized Layers", "Free Font Used"]

export default function LandingPage() {
  const theme = useTheme()
  const router = useRouter()

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
        color: "white",
        pt: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header with Logo and Auth Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 8,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              component="span"
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              💧
            </Box>
            <Typography
              variant="h6"
              component="span"
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              uifry
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button
            onClick={() => router.push("/login")}
              variant="text"
              sx={{
                color: "white",
                "&:hover": {
                  background: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Login
            </Button>
            <Button
            onClick={() => router.push("/sign")}
              variant="contained"
              sx={{
                bgcolor: "white",
                color: "#4f46e5",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.9)",
                },
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            py: 8,
          }}
        >
          {/* Left Column */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: "bold",
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              SaaS Project Management Dashboard
            </Typography>

            <List sx={{ mb: 4 }}>
              {features.map((feature) => (
                <ListItem key={feature} sx={{ p: 0, mb: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CheckCircle size={24} color="white" />
                  </ListItemIcon>
                  <ListItemText
                    primary={feature}
                    sx={{
                      "& .MuiListItemText-primary": {
                        color: "white",
                        fontSize: "1.1rem",
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>

            {/* <Stack direction="row" spacing={2}>
              <Box
                component="img"
                src="/placeholder.svg?height=48&width=48"
                alt="Figma"
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  bgcolor: "white",
                  p: 1,
                }}
              />
              <Box
                component="img"
                src="/placeholder.svg?height=48&width=48"
                alt="Adobe XD"
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  bgcolor: "white",
                  p: 1,
                }}
              />
              <Box
                component="img"
                src={<GitHubIcon/>}
                alt="Sketch"
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  bgcolor: "white",
                  p: 1,
                }}
              />
            </Stack> */}
          </Box>

          {/* Right Column - Dashboard Preview */}
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", md: "block" },
            }}
          >
            <Box
              sx={{
                position: "relative",
                "& img": {
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: 2,
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                },
              }}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL || "/ss.png"}`}
                alt="Dashboard Preview"
                width={600}
                height={400}
                priority
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

