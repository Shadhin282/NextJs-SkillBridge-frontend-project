"use server"

import { updateTag } from "next/cache"
import { userService } from "../../services/user.service"

export const patchUser =async ( statusInfo:string)=>{

    const res = await userService.pathcUser(statusInfo)
    updateTag('userBan')
    return res
}

export const getSession = async ()=>{
    const res = await userService.getSession()
    updateTag('session')
    return res
}