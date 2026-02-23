"use server"

import { updateTag } from "next/cache"
import { userService } from "../../services/user.service"
import { User } from "../../types"

export const patchUser =async ( statusInfo: User)=>{

    const res = await userService.pathcUser(statusInfo as string)
    updateTag('userBan')
    return res
}

export const getSession = async ()=>{
    const res = await userService.getSession()
    updateTag('session')
    return res
}