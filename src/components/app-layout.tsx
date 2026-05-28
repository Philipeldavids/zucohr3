import { Outlet, useLocation } from "react-router-dom";
import SidebarHr1 from "./sidebarhr1";
import SidebarHr2 from "./sidebarhr2";
import SideBarHr3 from "./sidebarhr3";
import SideBar2 from "./sidebar2";
import Sidebar1 from "./sidebar1";
import {useEffect, useState} from 'react';
import TopBar from "./top-bar";
import { type Subscriptions, subscriptionService } from "../lib/api";



const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/employees": "Employees",
  "/leave": "Leave Management",
  "/e-attendance": "Attendance",
  "/hr-attandance": "Attendance",
  "/payroll": "Payroll",
  "/performance": "Performance",
  "/expenses": "Expenses",
  "/recruitment": "Recruitment",
  "/onboarding": "Onboarding",
  "/users": "Users",
  "/roles": "Roles",
  "/settings": "Settings",
};

export default function AppLayout() {
  const location = useLocation();
  const[role, setRole] = useState("");
  const[sub, setSub] = useState<Subscriptions | null>(null);
  const title = Object.entries(pageTitles).find(
    ([path]) => location.pathname === path || location.pathname.startsWith(path + "/")
  )?.[1] ?? "ZucoHR";
   useEffect(() => {
        const foundUser = JSON.parse(localStorage.getItem("user") || "{}");
        if(foundUser){
          setRole(foundUser?.role);
        }
        GetSubscription();
      }, [])

      const GetSubscription= async()=>{

        var  response = await subscriptionService.getActive();
        if (response != null){
          setSub(response);
        }
      }
      if(role == "Employee" && sub?.planName == "Starter"){
return(
      <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar1 />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar title={title} />
        <main className="flex-1 overflow-y-auto p-6 pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>
      
    </div>
        );
      }
              
    //     else if(role == "Employee" && sub?.planName == "Growth"){
    //        return(
    //   <div className="flex h-screen overflow-hidden bg-background">
    //   <SideBar2 />
    //   <div className="flex flex-col flex-1 overflow-hidden">
    //     <TopBar title={title} />
    //     <main className="flex-1 overflow-y-auto p-6 pb-20 md:pb-6">
    //       <Outlet />
    //     </main>
    //   </div>
    //   <BottomNav />
    // </div>
    //     )
    //    }
       
        else if((role == "Admin" || role =="HR" || role == "HR Manager") && sub?.planName == "Starter"){
          return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SidebarHr1 />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar title={title} />
        <main className="flex-1 overflow-y-auto p-6 pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>
   
    </div>
  );
        }
         else if((role == "Admin" || role =="HR" || role == "HR Manager") && sub?.planName == "Growth"){
         return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SidebarHr2 />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar title={title} />
        <main className="flex-1 overflow-y-auto p-6 pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>
      
    </div>
  );
        } 
        else if((role == "Admin" || role =="HR" || role == "HR Manager") && sub?.planName == "Enterprise") {
          return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SideBarHr3 />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar title={title} />
        <main className="flex-1 overflow-y-auto p-6 pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>
     
    </div>
  );

        }
        else{
          return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SideBar2 />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar title={title} />
        <main className="flex-1 overflow-y-auto p-6 pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>
      
    </div>
  );
        }
}
