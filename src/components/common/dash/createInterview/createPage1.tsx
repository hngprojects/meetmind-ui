"use client";
import { useCreateStore } from "@/store/createInterviewStore";
import Buttons from "@/components/reuseable-component/buttons";
import FileUpload from "./fileUpload";
import { useInput, useUpload } from "@/store/uploadManual";

const CreatePage1 = () => {
  // open the page
  const { toggle, open } = useCreateStore();
  // open upload
  const { UploadOpen, setUploadOpen } = useUpload();
  // open input
  const { InputOpen, setInputOpen } = useInput();

  const handleUpload = () => {
    setUploadOpen(true);
    setInputOpen(false);
  };

  const handleInput = () => {
    setUploadOpen(false);
    setInputOpen(true);
  };

  return (
    <div className="w-full">
      {open && (
        <div
          className="fixed inset-0 bg-black/80 z-50
         flex items-center justify-center w-full"
        >
          <div
            className="bg-white rounded-2xl
          p-6 w-100 flex flex-col gap-4"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-lg">Create Interview</h2>
                <p className="text-sm text-gray-500">
                  Sign up an Autonomous AI in minutes
                </p>
              </div>
              <button
                onClick={toggle}
                className="text-red-300 border border-red-200 hover:cursor-pointer
             rounded-full w-4 h-4 p-3 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* import candidate  */}
            <h1>Import Candidates</h1>
            <p>
              Drop a file with Candiate information, paste email addresses
              directly.
            </p>

            {/* buttons */}
            <div className="flex flex-row gap-3">
              <Buttons
                text="Upload file"
                type="button"
                onClick={handleUpload}
              />
              <Buttons
                text="Manual input"
                type="button"
                onClick={handleInput}
              />
            </div>

            {UploadOpen && <FileUpload />}
            {InputOpen && <h1>hello</h1>}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePage1;
