"use client";
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store/store";
import { getUser } from "../lib/features/users/userSlice";

const linkData = [
  {
    id: 1,
    text: "Users",
    icon: <Icon className="text-3xl" icon="ph:users" />,
    link: "/dashbord/users",
  },
  {
    id: 7,
    text: "Visa Apply",
    icon: <Icon className="text-3xl" icon="codicon:git-stash-apply" />,
    link: "/dashbord/visa-apply",
  },
  {
    id: 8,
    text: "Visa Application List",
    icon: <Icon className="text-3xl" icon="streamline:task-list" />,
    link: "/dashbord/visa-application-list",
  },
  // {
  //   id: 2,
  //   text: "Bank Details Admin",
  //   icon: <Icon className="text-3xl" icon="mdi:bank-outline" />,
  //   link: "/dashbord/bank-details-admin",
  // },
  {
    id: 3,
    text: "Deposit Request",
    icon: <Icon className="text-3xl" icon="ph:hand-deposit" />,
    link: "/dashbord/deposit-request",
  },
  {
    id: 4,
    text: "Top Up",
    icon: <Icon className="text-3xl" icon="solar:circle-top-up-broken" />,
    link: "/dashbord/top-up",
  },
  // {
  //   id: 5,
  //   text: "Cancel Booking",
  //   icon: (
  //     <Icon
  //       className="text-3xl"
  //       icon="material-symbols-light:free-cancellation"
  //     />
  //   ),
  //   link: "/dashbord/cancle-booking",
  // },

  {
    id: 6,
    text: "Lone Request",
    icon: <Icon className="text-3xl" icon="la:clone-solid" />,
    link: "/dashbord/lone-request",
  },
];
const userLinkData = [
  {
    id: 7,
    text: "Visa Apply",
    icon: <Icon className="text-3xl" icon="codicon:git-stash-apply" />,
    link: "/dashbord/visa-apply",
  },
  {
    id: 8,
    text: "Visa Application List",
    icon: <Icon className="text-3xl" icon="streamline:task-list" />,
    link: "/dashbord/visa-application-list",
  },
  {
    id: 8,
    text: "Bank Details Admin",
    icon: <Icon className="text-3xl" icon="mdi:bank-outline" />,
    link: "/dashbord/bank-details-admin",
  },
  // {
  //   id: 2,
  //   text: "Bank Details",
  //   icon: <Icon className="text-3xl" icon="mdi:bank-outline" />,
  //   link: "/dashbord/bank-details",
  // },
  {
    id: 3,
    text: "Deposit Request",
    icon: <Icon className="text-3xl" icon="ph:hand-deposit" />,
    link: "/dashbord/deposit-request",
  },
  {
    id: 4,
    text: "Top Up",
    icon: <Icon className="text-3xl" icon="solar:circle-top-up-broken" />,
    link: "/dashbord/top-up",
  },
  // {
  //   id: 5,
  //   text: "Cancel Booking",
  //   icon: (
  //     <Icon
  //       className="text-3xl"
  //       icon="material-symbols-light:free-cancellation"
  //     />
  //   ),
  //   link: "/dashbord/cancle-booking",
  // },

  {
    id: 6,
    text: "Lone Request",
    icon: <Icon className="text-3xl" icon="la:clone-solid" />,
    link: "/dashbord/lone-request",
  },
];

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state?.user?.user);
  const isRole = user?.data?.role ? user?.data?.role : user?.user?.role;

  const router = useRouter();
  React.useEffect(() => {
    const userId =
      typeof window !== "undefined"
        ? JSON.parse(localStorage?.getItem("userId"))
        : null;
    if (!user && userId) {
      dispatch(getUser(userId));
    }
  }, [user, dispatch]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const timeoutId = setTimeout(() => {
        const storedUserId = localStorage.getItem("userId");
        const parsedUserId = storedUserId ? JSON.parse(storedUserId) : null;
        const mainId = user?.data?.id ? user?.data?.id : user?.user?.id;
        if (parsedUserId !== mainId) {
          router.push("/signin");
        } else {
          console.log("User IDs match, staying on the current page.");
        }
      }, 3000); // 3 seconds delay

      // Clean up the timeout if the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [user, router]);

  return (
    <div>
      {/* <Icon icon="mdi-light:home" /> */}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <Icon icon="material-symbols-light:menu" />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              ON THE GO
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <Icon icon="ant-design:right-outlined" />
              ) : (
                <Icon icon="ant-design:left-outlined" />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />

          {isRole === "admin" ? (
            <List>
              {linkData?.map((linkData) => (
                <Link href={linkData?.link} key={linkData?.text}>
                  <ListItem>
                    <ListItemIcon>{linkData?.icon}</ListItemIcon>
                    <ListItemText primary={linkData?.text} />
                  </ListItem>
                </Link>
              ))}
            </List>
          ) : (
            <List>
              {userLinkData?.map((linkData) => (
                <Link href={linkData?.link} key={linkData?.text}>
                  <ListItem>
                    <ListItemIcon>{linkData?.icon}</ListItemIcon>
                    <ListItemText primary={linkData?.text} />
                  </ListItem>
                </Link>
              ))}
            </List>
          )}

          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <div>{children}</div>
        </Box>
      </Box>
    </div>
  );
}
