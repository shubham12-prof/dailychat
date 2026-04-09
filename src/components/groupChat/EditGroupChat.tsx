"use client";
import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createChatSchema,
  createChatSchemaType,
} from "../../validation/groupChatValidation";
import { CustomUser } from "../../app/api/auth/[...nextauth]/options";
import axios, { AxiosError } from "axios";
import { CHAT_GROUP } from "../../lib/apiEndPoint";
import { toast } from "sonner";
import { clearCache } from "../../actions/common";
import { useRouter } from "next/navigation";
export default function EditGroupChat({
  user,
  group,
  open,
  setOpen,
}: {
  user: CustomUser;
  group: ChatGroupType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<createChatSchemaType>({
    resolver: zodResolver(createChatSchema),
  });

  useEffect(() => {
    setValue("title", group.title);
    setValue("passcode", group.passcode);
  }, [group]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const onSubmit = async (payload: createChatSchemaType) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`${CHAT_GROUP}/${group.id}`, payload, {
        headers: { Authorization: user.token },
      });
      if (data?.message) {
        setOpen(false);
        toast.success(data?.message);
        clearCache("dashboard");
        router.refresh();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={dialogRef}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
      >
        <h2 className="text-lg font-semibold leading-none tracking-tight">
          Update group chat
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <input
              placeholder="Enter chat title"
              {...register("title")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
            />
            <span className="text-sm text-red-400">
              {errors.title?.message}
            </span>
          </div>

          <div className="mt-4">
            <input
              placeholder="Enter passcode"
              {...register("passcode")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
            />
            <span className="text-sm text-red-400">
              {errors.passcode?.message}
            </span>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
