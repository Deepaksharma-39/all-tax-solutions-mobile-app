import { ThemeProvider } from "@emotion/react";
import { createTheme } from "../../../theme";
import Layout from "../layout/Layout";
import { AccountProfile } from "../sections/Account/AccountProfile";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { AccountProfileDetails } from "../sections/Account/AccountProfileDetails";

function Home() {
  const theme = createTheme();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          <>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                py: 8,
              }}
            >
              <Container maxWidth="lg">
                <Stack spacing={3}>
                  <div>
                    <Typography variant="h4">Account</Typography>
                  </div>
                  <div>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6} lg={4}>
                        <AccountProfile />
                      </Grid>
                      <Grid item xs={12} md={6} lg={8}>
                        <AccountProfileDetails />
                      </Grid>
                    </Grid>
                  </div>
                </Stack>
              </Container>
            </Box>
          </>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default Home;
