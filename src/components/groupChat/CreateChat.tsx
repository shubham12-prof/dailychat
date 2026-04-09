"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createChatSchema,
  createChatSchemaType,
} from "../../validation/groupChatValidation";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import axios, { AxiosError } from "axios";
import { CHAT_GROUP } from "../../lib/apiEndPoint";
import { toast } from "sonner";
import { clearCache } from "../../actions/common";
import { useRouter } from "next/navigation"; // 👈 import router

export default function CreateChat({ user }: { user: CustomUser }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // 👈 init router

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createChatSchemaType>({
    resolver: zodResolver(createChatSchema),
  });

  const onSubmit = async (payload: createChatSchemaType) => {
    try {
      setLoading(true);

      const { data } = await axios.post(CHAT_GROUP, payload, {
        headers: {
          Authorization: user.token,
        },
      });

      if (data?.message) {
        setOpen(false);
        toast.success(data.message);
        await clearCache("dashboard");
        router.refresh();
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.please try again!");
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Create Chat
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Create your new Chat</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Enter chat title"
                  {...register("title")}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <span className="text-red-400 text-sm">
                  {errors.title?.message}
                </span>
              </div>

              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Enter passcode"
                  {...register("passcode")}
                  className="w-full border border-gray-300 rounded-lg p-6 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <span className="text-red-400 text-sm">
                  {errors.passcode?.message}
                </span>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
