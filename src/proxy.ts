import { NextRequest, NextResponse } from "next/server"
import { userService } from "../services/user.service";
// import { tutorService } from "../services/tutor.service";
import { Roles } from "./constant/Role";



export const proxy = async (request : NextRequest)=>{
    // console.log("Hello from proxy ", request.url)

    const pathname = request.nextUrl.pathname;

    let isAuthenticated = false;
    let isAdmin   = false;
    let isStudent = false;
    let isTutor = false;

    const {data} = await userService.getSession();
    // const {data: tutorProfile} = await tutorService.getTutorDetailsById(data.user.id)

    // console.log(data)

    if(data){
        isAuthenticated = true;
        isAdmin = data.user.role === Roles.admin;
        isStudent = data.user.role === Roles.student;
        isTutor = data.user.role === Roles.tutor;
    }

    if(!isAuthenticated){
        return NextResponse.redirect(new URL('/login', request.url))
    }


    if(!isAdmin && pathname.startsWith('/admin')){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if(!isStudent && pathname.startsWith('/dashboard')){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if(!isTutor && pathname.startsWith('/tutor')){
        return NextResponse.redirect(new URL('/login', request.url))
    }
    // console.log("isAthenticated ", isAuthenticated, "is tutor", isTutor, "tutor profile", tutorProfile )
    // if(isAuthenticated && isTutor && !tutorProfile && pathname.startsWith('/')){
    //     return NextResponse.redirect(new URL('/tutor/create-profile', request.url))
    // }



        return NextResponse.next()
}

export const config = {
    matcher : ['/dashboard/:path*','/tutor/:path*','/admin/:path*']
}