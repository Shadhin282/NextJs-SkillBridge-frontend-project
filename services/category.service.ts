import { cookies } from "next/headers";

export const categoryService = {
    getCategory : async function () {
        const cookieStore = await cookies();
        try {
            const res = await fetch(`http://localhost:4000/api/categories`,{
          headers : {
            Cookie : cookieStore.toString(),
          }})
            const data = await res.json();

            return {data, error : null}
        } catch (error) {
            console.log(error)
            return { data : null , error : {message : "internal error, category not fetch"}}
        }
    },
    deleteCategory : async function (id:string){
        try {
                const cookieStore = await cookies();
                const res = await fetch(`http://localhost:4000/api/categories/${id}`,{
                    method: "DELETE",
          headers : {
            Cookie : cookieStore.toString(),
          },
          next: {
            tags : ['categoryDelete']
          }
        })

          const data = await res.json();
          if(data.error){
            return {data: null , error :{message : "Category not delete"}}
          }

          return {data: data, error : null}

            } catch (error) {
                console.log(error)
                return {data : null , error : {message: "Category Delete Error"}}
            }
    }
}