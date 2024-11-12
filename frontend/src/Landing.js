// LandingPage.js
import React from "react";
import { Container, Typography, Button, Grid, Box } from "@mui/material";

const LandingPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          backgroundImage: "url(/logo1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            href="/myapp.apk" // Link to the APK file in the public folder
            download="roadTaxSolution.apk" // Provides the file name for download
          >
            Download Now
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" align="center" gutterBottom>
              Pay Border Tax
            </Typography>
            <Typography align="center">
              Conveniently pay your border taxes directly through the app,
              saving time and hassle.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" align="center" gutterBottom>
              Recharge Fastag
            </Typography>
            <Typography align="center">
              Quickly recharge your Fastag within seconds to ensure a seamless
              travel experience.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" align="center" gutterBottom>
              Pay Insurance Premiums
            </Typography>
            <Typography align="center">
              Manage and pay your insurance premiums on time, all in one place.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Download Section */}
      <Box
        id="download"
        sx={{ py: 6, textAlign: "center", backgroundColor: "#f9f9f9" }}
      >
        <Typography variant="h4" gutterBottom>
          Download App
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Available on all platforms
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mx: 2, my: 1 }}
            href="/myapp.apk" // Link to the APK file in the public folder
            download="roadTaxSolution.apk" // Provides the file name for download
          >
            Download for Android
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LandingPage;
