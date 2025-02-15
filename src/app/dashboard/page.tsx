"use client"
import  SidebarLayoutComponent  from "@/components/sidebar-layout";
import DashboardNewsfeed from "@/components/app-components-dashboard-newsfeed"
//import ProgressRadarChart from "@/components/app-components-radar-chart" 
import styles from "./dashboard.module.css"
import { useEffect, useState } from 'react';
import { useUserStore } from '@/app/store/useUserStore';
import { createClient } from '@utils/supabase/clients';
import ExerciseProgressDisplay  from "@/components/exercise-progress-display"
import useRanking from "../hook/useRanking";
export default function home() {
  // const userId = useUserStore((state) => state.userId);
  // const email = useUserStore((state) => state.email);
  // const setUser = useUserStore((state) => state.setUser);

  



  
  // useEffect(() => {
  //   // If Zustand store is empty, fetch user data and update the store
  //   if (!userId || !email) {
  //     const supabase = createClient();
  //     const fetchUser = async () => {
  //       const { data, error } = await supabase.auth.getSession();
  //       if (error) {
  //         console.error('Error fetching user session:', error.message);
  //         return;
  //       }

  //       if (data.session?.user) {
  //         const { id, email } = data.session.user;
  //         if (email) {
  //           setUser(id, email); // Only set user state if email is defined

  //           // Log the values to verify they are correctly set
  //           console.log("User ID set in Zustand:", id);
  //           console.log("User Email set in Zustand:", email);
  //         } else {
  //           console.warn('User email is undefined');
  //         }
  //       }
  //     };

  //     fetchUser();
  //   }
  // }, [userId, email, setUser]);
  //const timestamp = Date.now();
  
  return (
    
    
      <SidebarLayoutComponent >
        <div className={styles.container}>
        
          <div className="relative p-4">
            
            <div className="absolute top-4 right-4">
              <DashboardNewsfeed />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-100px)]">
              <div className="w-full lg:w-3/5 h-full -mt-2"> {/* Adjusted margin here */}
                
                
              </div>
              <div className="w-full lg:w-2/5 flex flex-col gap-4 mt-auto">
              <ExerciseProgressDisplay/>
              {/* Your other dashboard content goes here */}
            </div>
            </div>
            {/* Your other dashboard content goes here */}
          </div>
          </div>
        
      </SidebarLayoutComponent>
        
        

      
      
      
    );
  }