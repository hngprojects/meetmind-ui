"use client";
import {
  resetAllStores,
  useCreateStep1,
  useCreateStep2,
  useCreateStep3,
  useCreateStep4,
  useCreateStep5,
  useCreateStep6,
  useCreateStore,
  useUpload,
} from "@/store/createInterviewStore";
import FileUpload from "./fileUpload";

// import { useAuthStore } from "@/store/authStore";
import Analyzer from "./analyze";
import Context from "./context";
import Input from "./input";
import ConfigureAI from "./configureAi";
import ReviewLaunch from "./reviewLaunch";
import StepIndicator from "./stepIndicator";

const CreatePage1 = () => {
  // open the page
  const { toggle, open } = useCreateStore();
  // open upload
  const { UploadOpen } = useUpload();
  // step 2
  const { step1 } = useCreateStep1();
  const { step2 } = useCreateStep2();
  const { step3 } = useCreateStep3();
  const { step4 } = useCreateStep4();
  const { step5 } = useCreateStep5();
  const { step6 } = useCreateStep6();
  // const { step7 } = useCreateStep7();

  const handleClose = () => {
    toggle();
    resetAllStores();
  };
  // toggle step 2

  return (
    <div className="w-full  scrollbar-none ">
      {open && (
        <div
          className="fixed inset-0 bg-black/80 z-50
         flex items-center justify-center w-full scrollbar-none"
        >
          <div
            className=" rounded-2xl max-h-[90vh] overflow-y-auto
          p-6 md:w-[57%] lg:w-[37%] scrollbar-none flex flex-col gap-7 bg-background"
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
                onClick={handleClose}
                type="button"
                aria-label="Close create interview modal"
                className="text-red-300 border border-red-200 hover:cursor-pointer
             rounded-full w-4 h-4 p-3 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            {/* step 1 */}
            {step1 && (
              <div className="flex flex-col gap-5">
                <StepIndicator currentStep={1} />
                {/* import candidate  */}
                <h1 className="text-xl font-bold">Import Candidates</h1>
                <p className="text-base text-text-subtext">
                  Drop a file with Candidate information, paste email addresses
                  directly.
                </p>

                {/* badge */}
                <p
                  className="bg-text-primary w-[50%] md:w-[25%] p-2 
                   text-center rounded-lg text-white"
                >
                  File upload
                </p>

                {UploadOpen && <FileUpload />}
              </div>
            )}

            {/* step 2 */}
            {step2 && <Analyzer />}
            {/* step 3 */}
            {step3 && <Input />}
            {/* step 4 */}
            {step4 && <Context />}

            {step5 && <ConfigureAI />}

            {step6 && <ReviewLaunch />}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePage1;
