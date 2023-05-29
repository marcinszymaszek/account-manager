import { Box, Typography } from "@mui/material";

export default function ErrorPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1" style={{ fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h6" style={{ marginBottom: "3rem" }}>
        The page you’re looking for doesn’t exist.
      </Typography>
    </Box>
  );
}
