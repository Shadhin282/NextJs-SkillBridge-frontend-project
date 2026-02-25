'use server'

import { updateTag } from "next/cache";
import { categoryService } from "../../services/category.service"
import { Category } from "../../types";


export const deleteCategory = async (id:string)=>{
    const res = await categoryService.deleteCategory(id)
    updateTag('categoryDelete')
    return res;
}

export const createCategory = async (catInfo : Category)=>{
    const res = await categoryService.createCategory(catInfo)
    updateTag('createCat')
    return res
}