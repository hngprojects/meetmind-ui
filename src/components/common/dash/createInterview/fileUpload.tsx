"use client";
import Buttons from "@/components/reuseable-component/buttons";
import api from "@/lib/api";
import { CandidateSchema, UploadCandidateValues } from "@/schemas/uploadSchema";
import {
  useCreateStep1,
  useCreateStep2,
  useCreateStore,
} from "@/store/createInterviewStore";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useAuthStore } from "@/store/authStore";
import { useResumeStore } from "@/store/ResumeStore";

const isFile = (file: unknown): file is File =>
  typeof File !== "undefined" && file instanceof File;

const FileUpload = () => {
  const { token } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { setOpen } = useCreateStore();
  const { setStep2 } = useCreateStep2();
  const { setStep1 } = useCreateStep1();

  const { setCandidateId, setExtractedDetails } = useResumeStore();

  // form setup
  const form = useForm<UploadCandidateValues>({
    resolver: zodResolver(CandidateSchema),
    mode: "onChange",
  });

  //form submission
  const {
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number | null>(null);

  // Handle drag and drop for pcn license
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setServerError(null);
      setFileName(file.name);
      setFileSize(file.size);
      setValue("CandidateUpload", file, { shouldValidate: true });
    }
  };

  //   click upload for pcn license
  const handleCandidateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setServerError(null);
      setFileName(file.name);
      setFileSize(file.size);
      setValue("CandidateUpload", file, { shouldValidate: true });
    }
  };

  //   drag function
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  // handle submit

  const onSubmit = async (data: UploadCandidateValues) => {
    // must be signed in to upload a file
    if (!token) {
      setServerError("You must be signed in to upload a file.");
      return;
    }

    const file = data.CandidateUpload;

    if (!isFile(file)) {
      setServerError("No valid file selected.");
      return;
    }

    try {
      setIsLoading(true);
      setServerError(null);

      const formData = new FormData();

      formData.append("file", file);
      const response = await api.post(
        `/api/v1/candidates/upload-resume`,
        formData,
        {
          headers: {
            "Content-Type": undefined,
          },
        },
      );
      if (response.status === 200 || response.status === 201) {
        // Save candidate_id and extracted_details to store
        setCandidateId(response.data.data.candidate_id);
        setExtractedDetails(response.data.data.extracted_details);
        setStep1(false);
        setStep2(true);
        reset();
        setFileName("");
        setFileSize(null);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error?.details?.[0]?.msg;
        setServerError(message);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // step 2
  const uploadError = serverError ?? errors.CandidateUpload?.message;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className="relative border  border-dotted border-[#0000001A] 
         bg-[#ffffff] p-6  rounded-2xl flex flex-col gap-4"
      >
        {/* text */}
        <div className="flex flex-col gap-1">
          <div
            className="flex flex-col gap-2 
             md:flex-row md:gap-0"
          ></div>
        </div>

        {/* upload */}
        <div>
          <input
            type="file"
            id="Candidate-id"
            accept=".pdf,.txt,.doc,.docx"
            className="hidden"
            onChange={handleCandidateChange}
          />

          <label
            htmlFor="Candidate-id"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`
                block border-2 border-dotted rounded-lg px-6 py-10 text-center
                 cursor-pointer
                transition-colors duration-200         
              `}
          >
            <div className="flex flex-col items-center  gap-2">
              <div
                className="flex flex-col  gap-4 
              items-center justify-center"
              >
                {/* download icon */}
                <div className=" w-14 h-14 rounded-full bg-[#E1E3E4] flex items-center justify-center">
                  <Image
                    src="/icons/download.svg"
                    width={25}
                    height={25}
                    alt="download-icon"
                  />
                </div>

                <p className="text-gray-700 mb-1">
                  <span>Drop file here </span> or click to upload
                </p>
              </div>
            </div>
          </label>
        </div>

        {/* file */}
        <div className="flex flex-col gap-3">
          {fileName && (
            <>
              <div className="flex flex-row justify-between">
                <p className="mt-2 text-sm font-medium">{fileName}</p>
              </div>
              <p className="text-sm text-gray-500">
                {(fileSize! / 1024 / 1024).toFixed(2)} MB
              </p>
            </>
          )}

          <div>
            {uploadError && (
              <p
                className="text-[#EF4444] border rounded-2xl text-sm bg-[#FDECEC]
                 flex items-center justify-center px-2 py-1 border-[#EF4444]"
              >
                {uploadError}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-row justify-end ">
          <Buttons
            style="bg-white text-[#3F4555] hover:bg-white/70"
            icon={<FaArrowLeft />}
            text="Back"
            type="button"
            onClick={() => setOpen(false)}
          />
          <Buttons
            icon2={<FaArrowRight />}
            text={isLoading ? "Uploading..." : "Continue"}
            style2="w-[50%]"
            type="submit"
            disabled={isLoading || !!errors.CandidateUpload}
          />
        </div>
      </div>
    </form>
  );
};

export default FileUpload;
