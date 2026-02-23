import { cookies } from "next/headers";

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(
        `https://nextjs-skill-bridge-backend-project.onrender.com/api/auth/get-session`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Cookie: cookieStore.toString(),
          },
          cache: "no-store",
         
        },
      );

      const session = await res.json();

      // if (session.error) {
      //   return { data: null, error: { message: "Session is missing" } };
      // }

      return { data: session, error: null };
    } catch (err) {
      console.log(err);

      return {
        data: null,
        error: { message: "Something went wrong during get cookie" },
      };
    }
  },
  getStats: async function () {
    const cookieStore = await cookies();
    try {
      const res = await fetch(
        `https://nextjs-skill-bridge-backend-project.onrender.com/api/admin/stats`,
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
        },
      );

      const stats = await res.json();

      if (!stats.ok) {
        return {
          data: null,
          error: { message: "Stats data not get, error occur" },
        };
      }

      return { data: stats, error: null };
    } catch (error) {
      //  console.log(error);

      return {
        data: null,
        error: { message: "Something went wrong during get cookie" },
      };
    }
  },

  getUsers: async function () {
    const cookieStore = await cookies();
    try {
      const res = await fetch(
        `https://nextjs-skill-bridge-backend-project.onrender.com/api/admin/users`,
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
        },
      );
      const data = await res.json();
      if (!data.ok) {
        return {
          data: null,
          error: { message: "User data not get , error occur" },
        };
      }
      return { data, error: null };
    } catch (error) {
      // console.log(error);

      return {
        data: null,
        error: { message: "Something went wrong during get cookie" },
      };
    }
  },
  getUsersById: async function (id: string) {
    const cookieStore = await cookies();
    try {
      const res = await fetch(
        `https://nextjs-skill-bridge-backend-project.onrender.com/api/admin/users/${id}`,
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
        },
      );
      const data = await res.json();
      if (!data.ok) {
        return {
          data: null,
          error: { message: "User data not get , error occur" },
        };
      }
      return { data, error: null };
    } catch (error) {
      // console.log(error);

      return {
        data: null,
        error: { message: "Something went wrong during get cookie" },
      };
    }
  },
  pathcUser: async function (status: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `https://nextjs-skill-bridge-backend-project.onrender.com/api/admin/users`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify(status),
          next: {
            tags: ["userBan"],
          },
        },
      );
      const data = await res.json();
      if (!data.ok) {
        return {
          data: null,
          error: { message: "User status not update , error occur" },
        };
      }
      return { data: data, error: null };
    } catch (error) {
      // console.log(error)
      return { data: null, error: { message: "Something wrong happend" } };
    }
  },
};
