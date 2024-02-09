//Imports
import {Person,Settings,Bookmark, Chat} from '@mui/icons-material/';
import axios from "axios";
import swal from "sweetalert2";
import {People,LibraryBooks} from '@mui/icons-material';
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
]


//Functions
