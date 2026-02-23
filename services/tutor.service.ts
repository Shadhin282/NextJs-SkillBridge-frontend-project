import { cookies } from "next/headers";
import {
  Availability,
  ServiceOptions,
  TutorProfile,
  TutorSearchParams,
} from "../types";

export const tutorService = {
  getTutorsPost: async function (
    params?: TutorSearchParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(
        `https://nextjs-skill-bridge-backend-project.onrender.com/api/tutors`,
      );

      // url.searchParams.append("key","value");
      // console.log(Object.entries(params))
      //    console.log(url.toString())
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }
      // console.log(url.toString())
      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(url.toString(), {
        next: { revalidate: 10 },
        cache: "no-cache",
      });
      const data = await res.json();
      if (data.error) {
        return {
          data: null,
          error: { message: "Tutor Post not get, error occur" },
        };
      }
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Tutors Data not fetch" } };
    }
  },

  getCategory: async function () {
    try {
      const res = await fetch(
        `https://nextjs-skill-bridge-backend-project.onrender.com/api/categories`,
        {
          cache: "no-cache",
        },
      );
      const category = await res.json();
      if (category.error) {
        return {
          data: null,
          error: { message: "Category data not get, error occur" },
        };
      }
      return { data: category, error: null };
    } catch (error) {
      return { data: null, error: { message: " Categories data are not get" } };
    }
  },
  getTutorById: async function (id: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(
        `https://nextjs-skill-bridge-backend-project.onrender.com/api/tutors/${id}`,
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
        },
      );
      const tutor = await res.json();
      if (tutor.error) {
        return {
          data: null,
          error: { message: "Tutor data not get, error occur" },
        };
      }
      return { data: tutor, error: null };
    } catch (error) {
      return { data: null, error: { message: " Somthing went wrong" } };
    }
  },
  getTutorDetailsById: async function (id: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(
        `https://nextjs-skill-bridge-backend-project.onrender.com/api/tutors/details/${id}`,
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
        },
      );
      const tutor = await res.json();
      if (tutor.error) {
        return {
          data: null,
          error: { message: "Tutor data not get, error occur" },
        };
      }
      return { data: tutor, error: null };
    } catch (error) {
      return { data: null, error: { message: " Somthing went wrong" } };
    }
  },
  updateProfile: async function (proInfo: TutorProfile) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(
        "https://nextjs-skill-bridge-backend-project.onrender.com/api/tutor/profile",
        {
          method: "PUT",
          headers: {
            Cookie: cookieStore.toString(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(proInfo),
        },
      );

      const data = await res.json();
      if (data.error) {
        return {
          data: data.error,
          error: { message: "tutor Profile not update" },
        };
      }
      return { data: data, error: null };
    } catch (error) {
      // console.error(error)
      return {
        data: null,
        error: { message: "tutor Profile not update due to internal issue" },
      };
    }
  },
  postAvailability: async function (availInfo: Availability) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `https://nextjs-skill-bridge-backend-project.onrender.com/api/availability`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify(availInfo),
        },
      );
      const data = await res.json();

      if (data.error) {
        return { data: data.error, error: { message: "data not update" } };
      }
      return { data: data, error: null };
    } catch (error) {
      // console.log(error)
      return { data: null, error: { message: "Internal Error." } };
    }
  },
  putAvailability: async function (availInfo: Availability) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `https://nextjs-skill-bridge-backend-project.onrender.com/api/availability`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify(availInfo),
        },
      );
      const data = await res.json();

      if (data.error) {
        return { data: data.error, error: { message: "data not update" } };
      }
      return { data: data, error: null };
    } catch (error) {
      // console.log(error)
      return { data: null, error: { message: "Internal Error." } };
    }
  },
  CreateTutorProfileAction: async function (tutorInfo: TutorProfile) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `https://nextjs-skill-bridge-backend-project.onrender.com/api/tutor/profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify(tutorInfo),
        },
      );

      const data = await res.json();

      if (data.error) {
        return {
          data: data.error,
          error: { message: "tutor Profile data not update" },
        };
      }
      return { data: data, error: null };
    } catch (error) {
      // console.log(error)
      return {
        data: null,
        error: { message: "Internal Issue , Tutor Data not update" },
      };
    }
  },
};
