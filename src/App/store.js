import { configureStore } from "@reduxjs/toolkit";
import loginPageReducer from "../Features/LoginPageFeature/slice/loginPageSlice";
import dashboradPageReducer from "../Features/DashboardPageFeature/slice/dashboradPageSlice";
import adminPageReducer from "../Features/AdminPageFeature/slice/adminPageSlice";

const store = configureStore({
    reducer:{
       loginPage:loginPageReducer,
       dashboardPage:dashboradPageReducer,
       adminPage:adminPageReducer
    }
});

export default store;