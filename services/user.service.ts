import { cookies } from "next/headers";


export const userService = {

   getSession: async function () {

    try {

      const cookieStore = await cookies();

      const res = await fetch(`http://localhost:4000/api/auth/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        next : {
          tags : ['session']
        }
      });

      const session = await res.json();

      if (!session) {
        return { data: null, error: { message: "Session is missing" } };
      }

      return { data: session, error: null };


    } catch (err) {

      console.log(err);

      return {
        data: null,
        error: { message: "Something went wrong during get cookie" },
      };
    }
  },
  getStats : async function (){
    const cookieStore = await cookies();
          try {
            const res = await fetch(`http://localhost:4000/api/admin/stats`,{
              headers: {
                Cookie : cookieStore.toString(),
              },
            })

            const stats = await res.json();

            return { data: stats, error: null };
          } catch (error) {
             console.log(error);

      return {
        data: null,
        error: { message: "Something went wrong during get cookie" },
      };
          }
  },

  getUsers : async function (){
   const cookieStore = await cookies();
      try {
        const res = await fetch(`http://localhost:4000/api/admin/users`,{
          headers : {
            Cookie : cookieStore.toString(),
          }
        })
        const data = await res.json();

        return { data, error: null };
      } catch (error) {
            console.log(error);

      return {
        data: null,
        error: { message: "Something went wrong during get cookie" },
      };
      }
  },
  getUsersById : async function (id: string){
    const cookieStore = await cookies();
        try {
          const res = await fetch(`http://localhost:4000/api/admin/users/${id}`,{
          headers : {
            Cookie : cookieStore.toString(),
          }
        })
         const data = await res.json();

        return { data, error: null };
        } catch (error) {
          console.log(error);

      return {
        data: null,
        error: { message: "Something went wrong during get cookie" },
      };
        }
  },
  pathcUser : async function (status : string){
    try {
      const cookieStore = await cookies();
      const res = await fetch(`http://localhost:4000/api/admin/users`,{
          method : 'PATCH', 
        headers : {
           "Content-Type" : "application/json", 
            Cookie : cookieStore.toString(),
          },
          body: JSON.stringify(status) ,
          next : {
            tags : ['userBan']
          }
        })
         const data = await res.json();

        return {data : data , error : null}
    } catch (error) {
      console.log(error)
    }
  }
}