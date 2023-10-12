import React from "react";
import { Container, Typography, Paper, Grid } from "@mui/material";
import "./Public.css";

const Public = () => {
  return (
    <Paper className="public" elevation={3}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to the Library
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="body1" align="center" paragraph>
              Discover a world of knowledge at our library. Our trained staff is
              here to assist you with your literary journey.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <address>
              <Typography variant="body1" paragraph>
                Library Address:
                <br />
                123 Main Street
                <br />
                Cityville, CA 54321
                <br />
                <a href="tel:+1234567890">(123) 456-7890</a>
              </Typography>
            </address>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default Public;
