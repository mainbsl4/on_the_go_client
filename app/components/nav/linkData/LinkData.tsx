import { Icon } from "@iconify/react";

export const linkData = [
  {
    id: 1,
    text: "Bank Details",
    icon: <Icon className="text-3xl" icon="mdi:bank-outline" />,
    link: "/dashbord/bank-details",
  },
  {
    id: 2,
    text: "Deposit Request",
    icon: <Icon className="text-3xl" icon="ph:hand-deposit" />,
    link: "/dashbord/deposit-request",
  },
  {
    id: 3,
    text: "Top Up",
    icon: <Icon className="text-3xl" icon="solar:circle-top-up-broken" />,
    link: "/dashbord/top-up",
  },
  {
    id: 4,
    text: "Cancel Booking",
    icon: (
      <Icon
        className="text-3xl"
        icon="material-symbols-light:free-cancellation"
      />
    ),
    link: "/dashbord/cancle-booking",
  },
  {
    id: 5,
    text: "Lone Request",
    icon: <Icon className="text-3xl" icon="la:clone-solid" />,
    link: "/dashbord/lone-request",
  },
];
