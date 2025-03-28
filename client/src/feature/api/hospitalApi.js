import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const HOSPITAL_API = "http://localhost:8000/api/v1/hospital";

export const hospitalApi = createApi({
  reducerPath: "hospitalApi",
  tagTypes: ["Refetch_Hospital_Details","Refetch_Hospital_Single_Details"],
  baseQuery: fetchBaseQuery({
    baseUrl: HOSPITAL_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createHospital: builder.mutation({
      query: (formData) => ({
        url: "create",
        body: formData,
        method:"POST",
       
      }),
      invalidatesTags: ["Refetch_Hospital_Details"]
    }),
    createBulkHospitals: builder.mutation({
        query: (formData) => ({
          url: "/bulk/create",
          body: formData,
          method:"POST",
         
        }),
        invalidatesTags: ["Refetch_Hospital_Details"]
      }),
    updateHospital: builder.mutation({
        query: ({formData,id}) => ({
          url: `/update/${id}`,
          body: formData,
          method:"PUT",
         
        }),
        invalidatesTags: ["Refetch_Hospital_Single_Details"]
      }),
    getAllHospitals: builder.query({
        query: () => ({
          url: "get",
          method:"GET"
        }),
        providesTags: ["Refetch_Hospital_Details"]
      }),
      getSingleApi: builder.query({
        query: (id) => ({
          url: `single/${id}`,
          method:"GET"
        }),
        providesTags: ["Refetch_Hospital_Single_Details"]
      }),
      deleteHospital: builder.mutation({
        query: (id) => ({
          url: `delete/${id}`,
          method:"DELETE"
        }),
      }),
  }),
  
  
});

export const { useCreateHospitalMutation,useGetAllHospitalsQuery  ,useDeleteHospitalMutation,useGetSingleApiQuery,useUpdateHospitalMutation,useCreateBulkHospitalsMutation} = hospitalApi;
