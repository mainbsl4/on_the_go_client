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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../lib/store/store";
import { getUser } from "../lib/features/users/userSlice";
import { useRouter } from "next/navigation";
import { manageToken } from "../utils/config";
import { Avatar, Button } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
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
    id: 88,
    text: "Visa Application List Admin",
    icon: <Icon className="text-3xl" icon="streamline:task-list" />,
    link: "/dashbord/visa-application-list-admin",
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
    id: 33,
    text: "Deposit Request Admin",
    icon: <Icon className="text-3xl" icon="ph:hand-deposit" />,
    link: "/dashbord/deposit-request-admin",
  },
  {
    id: 3,
    text: "Deposit Request",
    icon: <Icon className="text-3xl" icon="ph:hand-deposit" />,
    link: "/dashbord/deposit-request",
  },
  {
    id: 33,
    text: "Deposit Request List",
    icon: <Icon className="text-3xl" icon="ph:hand-deposit" />,
    link: "/dashbord/deposit-request-list",
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
    id: 9,
    text: "Lone Request Admin",
    icon: <Icon className="text-3xl" icon="la:clone-solid" />,
    link: "/dashbord/lone-request-admin",
  },
  {
    id: 6,
    text: "Lone Request",
    icon: <Icon className="text-3xl" icon="la:clone-solid" />,
    link: "/dashbord/lone-request",
  },
  {
    id: 66,
    text: "Lone Request List",
    icon: <Icon className="text-3xl" icon="la:clone-solid" />,
    link: "/dashbord/lone-request-list",
  },
];

const drawerWidth = 280;

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

  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state?.user?.user);
  const isRole = user?.data?.role ? user?.data?.role : user?.user?.role;

  const router = useRouter();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = JSON.parse(localStorage?.getItem("userId"));
      if (!user && userId) {
        dispatch(getUser(userId));
      }
    }
  }, [user, dispatch]);

  const [totalBalance, setTotalBalance] = React.useState(0)

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

        const totalDepo = user?.data?.deposit_request ? user?.data?.deposit_request : user?.user?.deposit_request;
        console.log(totalDepo);
        const totalDepoAmount = totalDepo?.reduce((sum, depo) => sum + depo?.amount, 0);
        console.log('Total Deposit Amount:', totalDepoAmount);
        const totalLoan = user?.data?.loan_request ? user?.data?.loan_request : user?.user?.loan_request;
        console.log(totalLoan);
        const totalLoanAmount = totalLoan?.reduce((sum, loan) => sum + loan?.amount, 0);
        console.log('Total Loan Amount:', totalLoanAmount);
        const totalAddedBalance = totalDepoAmount + totalLoanAmount
        setTotalBalance(totalAddedBalance)



      }, 3000); // 3 seconds delay

      // Clean up the timeout if the component unmounts
      return () => clearTimeout(timeoutId);


      

    }
  }, [user, router]);

  const handleRoute = (params) => {
    router.push(params);
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      manageToken(storedToken);
    }
  }, []);



  // for profile button 
  const [showDetails, setShowDetails] = React.useState(false);

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <div>
      {/* <Icon icon="mdi-light:home" /> */}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} >
          <Toolbar sx={{display:"flex",justifyContent:"space-between"}}>
            {/* <IconButton
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
            </IconButton> */}
            <Typography variant="h6" noWrap component="div">
              ON THE GO
            </Typography>
            <Box sx={{display:"flex", alignItems:"center"}}>
      <Avatar
        sx={{ bgcolor: deepOrange[500] }}
        alt="Remy Sharp"
        src="/broken-image.jpg"
        onClick={toggleDetails}
      />
      {showDetails && (
        <div className="p-2" style={{ marginTop: 2, position:"absolute", top:"65px", right:"0px", color:"black", backgroundColor:"gray" }}>
          <p>Name: Main</p>
          <p>Balance: {totalBalance}</p>
          <Button variant="outlined">Settings</Button>
        </div>
      )}
    </Box>
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
                <div
                  className="cursor-pointer"
                  onClick={() => handleRoute(linkData?.link)}
                  key={linkData?.text}
                >
                  <ListItem>
                    <ListItemIcon>{linkData?.icon}</ListItemIcon>
                    <ListItemText primary={linkData?.text} />
                  </ListItem>
                </div>
              ))}
            </List>
          ) : (
            <List>
              {userLinkData?.map((linkData) => (
                <div
                  className="cursor-pointer"
                  onClick={() => handleRoute(linkData?.link)}
                  key={linkData?.text}
                >
                  <ListItem>
                    <ListItemIcon>{linkData?.icon}</ListItemIcon>
                    <ListItemText primary={linkData?.text} />
                  </ListItem>
                </div>
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
