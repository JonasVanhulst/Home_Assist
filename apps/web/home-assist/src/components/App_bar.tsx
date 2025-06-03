import * as React from "react";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"; // for Logging
import HistoryIcon from "@mui/icons-material/History"; // for History
import EventNoteIcon from "@mui/icons-material/EventNote"; // for Agenda
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"; // for Notifications
import type { Navigation, Router } from "@toolpad/core/AppProvider";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import PageContainerBasic from "./Main_Grid";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import Agenda from "./agenda";
import BiaxialBarChart from "./barChart";
import HLSPlayer from "./cameraFeed";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "overview",
    title: "Overview",
    icon: <DashboardIcon />,
  },
  {
    segment: "logging",
    title: "Logging",
    icon: <ReceiptLongIcon />,
  },
  {
    segment: "history",
    title: "History",
    icon: <HistoryIcon />,
  },
  {
    segment: "agenda",
    title: "Agenda",
    icon: <EventNoteIcon />,
  },
  {
    segment: "camera",
    title: "Camera",
    icon: <VideoCameraFrontIcon />,
  },
  {
    segment: "notifications",
    title: "Notifications",
    icon: <NotificationsActiveIcon />,
  },
];

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
});

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

export default function DashboardLayoutBasic(props: any) {
  const { window } = props;

  const router = useDemoRouter("/overview");

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer className="page-container">
          {router.pathname === "/overview" && <PageContainerBasic />}
          {router.pathname === "/logging" && <div>Notifications</div>}
          {router.pathname === "/history" && <BiaxialBarChart />}
          {router.pathname === "/agenda" && <Agenda />}
          {router.pathname === "/camera" && (
            <HLSPlayer url="http://localhost:8080/hls/streamkey.m3u8" />
          )}
          {router.pathname === "/notifications" && <div>Notifications</div>}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
