import Home from "@/components/Home";
import { Toaster } from "react-hot-toast";

const AppHomePage = () => {
  return (
    <div>
      <Home />
      <Toaster position='top-center' reverseOrder={false} />
    </div>
  );
};

export default AppHomePage;
