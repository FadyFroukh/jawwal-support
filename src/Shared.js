//Imports
import {Person,Settings,Bookmark, Chat, ChatBubbleSharp} from '@mui/icons-material/';
import axios from "axios";
import swal from "sweetalert2";
import {People,LibraryBooks,Add,Approval,Login} from '@mui/icons-material';
//Links


export default axios.create({
    baseURL:"http://127.0.0.1:5001",
});

//Dialogs

export const operationSuccess = (text)=>{
    swal.fire({
        icon:'success',
        title:'Done',
        text
    });
};


export const operationFailure = (text)=>{
    swal.fire({
        icon:'error',
        title:'Error',
        text
    });
};

export const operationInfo = (text)=>{
    swal.fire({
        icon:'info',
        title:'Watch Out',
        text
    });
};


//Variables

export const userSideOptions = [
    {
        name:"Saved Problems",
        icon:Bookmark
    },
    {
        name:"Chat",
        icon:Chat
    },
];

export const superSideOption = [
    {
        name:"Saved Problems",
        icon:Bookmark
    },
];

export const adminMainOptions = [
    {
        name:"Users Management",
        link:"users",
        icon:People
    },
    {
        name:"Posts Management",
        link:"posts",
        icon:LibraryBooks
    },
    {
        name:"Chats",
        link:"chats",
        icon:ChatBubbleSharp
    }
]


export const howOptions = [
    {
        name:"Request an Account",
        data:"Requesting an account is done by sumbitting your data to us, by email or by a form that is designed to collect data related to this site",
        icon:Add
    },
    {
        name:"Wait for Approval",
        data:"Once you submit your data, we will do research about you and make sure that your data is related to Jawwal and then give the proper response later",
        icon:Approval
    },
    {
        name:"Login to The System",
        data:"After getting approved, please head to the login page so you can proceed to the dashboard after logging in with the credentials provided from our side",
        icon:Login
    }
];

//Functions
