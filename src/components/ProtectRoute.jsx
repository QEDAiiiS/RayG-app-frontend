import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader } from "lucide-react";
import { Navigate } from "react-router-dom";





const ProtectRoute = ({ children }) => {



  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();



  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  
  console.log(authUser);

  if (isCheckingAuth && !authUser)
    return (
      <div className=" flex items-center justify-center h-screen">
        <Loader className=" size-10 animate-spin" />
      </div>
    );

    if(!authUser)return (<Navigate to={"/login"}/>)
  
  
    return <>{children}</>;
};

export default ProtectRoute;

{/* <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />; */}
