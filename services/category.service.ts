import { cookies } from "next/headers";
import { Category } from "../types";

export const categoryService = {
  getCategory: async function () {
    const cookieStore = await cookies();
    try {
      const res = await fetch(
        `https://nextjs-skill-bridge-backend-project.onrender.com/api/categories`,
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
        },
      );
      const data = await res.json();
      if (data.error) {
        return { data: null, error: { message: "category data not get" } };
      }
      return { data, error: null };
    } catch (error) {
      // console.log(error)
      return {
        data: null,
        error: { message: "internal error, category not fetch" },
      };
    }
  },
  deleteCategory: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `https://nextjs-skill-bridge-backend-project.onrender.com/api/categories/${id}`,
        {
          method: "DELETE",
          headers: {
            Cookie: cookieStore.toString(),
          },
          next: {
            tags: ["categoryDelete"],
          },
        },
      );

      const {data,error} = await res.json();

      if (error) {
        return { data: null, error: { message: "Category not delete",error} };
      }

      return {  data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Category Delete Error" } };
    }
  },
  createCategory : async function (catInfo : Category) {
      try {
          const cookieStore = await cookies();
          const res = await fetch('https://nextjs-skill-bridge-backend-project.onrender.com/api/categories',{
            method : 'POST',
            headers: {
              "Content-Type" : "application/json",
              Cookie : cookieStore.toString()
            },
            body : JSON.stringify(catInfo),
            next : {
              tags: ['createCat']
            }
          })
          const category = await res.json()

          if(category.error){
            return {data : null, error : {message: "Category data not delete, error occur"}}
          }

          return {data : category, error : null}
      } catch (error) {
        console.error(error)
        return {data: null, error: {message: "Internal error"}}
      }
  }
};
