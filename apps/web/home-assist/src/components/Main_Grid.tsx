import * as React from "react";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  AppProvider,
  type Navigation,
  type Router,
} from "@toolpad/core/AppProvider";
import {
  PageContainer,
  PageHeader,
  PageHeaderToolbar,
} from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import GaugeDesign from "./Gauge";
import BasicCard from "./time";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BasicLineChart from "./lineChart";

const NAVIGATION: Navigation = [
  { segment: "inbox", title: "Inbox" },
  {
    segment: "inbox/all",
    title: "All",
    icon: <DashboardIcon />,
  },
];

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

function CustomPageToolbar() {
  return (
    <PageHeaderToolbar>
      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          variant="outlined"
          size="small"
          color="primary"
          startIcon={<DownloadIcon fontSize="inherit" />}
        >
          Download
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          startIcon={<PrintIcon fontSize="inherit" />}
        >
          Print
        </Button>
      </Stack>
    </PageHeaderToolbar>
  );
}

function CustomPageHeader() {
  return <PageHeader slots={{ toolbar: CustomPageToolbar }} />;
}

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: true },
});

export default function PageContainerBasic(props: any) {
  const { window } = props;
  const router = useDemoRouter("/");
  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        title: "ACME Inc.",
      }}
    >
      <Paper sx={{ p: 2, width: "100%" }}>
        <PageContainer
          slots={{
            header: CustomPageHeader,
          }}
        >
          <Grid container spacing={2}>
            <Grid size={8}>
              <BasicCard />
            </Grid>
            <Grid size={4}>
              <Paper sx={{ p: 2, height: 300 }}>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box>
                    <Typography variant="h6" align="center">
                      Temperature °C
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <GaugeDesign />
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid size={12}>
              <Paper sx={{ p: 2, height: 400 }}>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box>
                    <Typography variant="h6" align="center">
                      Humidity %rH
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <BasicLineChart />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </PageContainer>
      </Paper>
    </AppProvider>
  );
}
