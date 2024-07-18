import { ToastContainer } from "react-toastify";
import "./assets/css/style.css";
import { StoreProvider } from "./lib/store/storeProvider";
// import { StoreProvider } from "./store/storeProvider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          {children}
          <ToastContainer />
        </body>
      </html>
    </StoreProvider>
  );
}
