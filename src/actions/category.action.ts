'use server'

import { updateTag } from "next/cache";
import { categoryService } from "../../services/category.service"


export const deleteCategory = async (id:string)=>{
    const res = await categoryService.deleteCategory(id)
    updateTag('categoryDelete')
    return res;
}