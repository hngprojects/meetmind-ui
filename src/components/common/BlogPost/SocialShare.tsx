import { FaFacebookF, FaTwitter, FaPinterest } from "react-icons/fa";
import Buttons from "@/components/reuseable-component/buttons";

export default function SocialShare() {
  return (
    <div className="flex items-center w-full my-10">
      {/* Facebook Share */}
      <Buttons
        type="button"
        text="Share 694"
        icon={<FaFacebookF className="size-5 mr-2" />}
        style2="flex-1"
        style="
          py-8 !rounded-none border-t border-b-2 border-t-gray-100 border-b-[#3b5998]
          bg-transparent text-[#3b5998] hover:bg-gray-50 shadow-none
          text-sm font-medium uppercase tracking-wider transition-colors
        "
      />

      {/* Twitter Tweet */}
      <Buttons
        type="button"
        text="Tweet"
        icon={<FaTwitter className="size-5 mr-2" />}
        style2="flex-1"
        style="
          py-8 !rounded-none border-t border-b-2 border-t-gray-100 border-b-sky-400
          bg-transparent text-sky-500 hover:bg-gray-50 shadow-none
          text-sm font-medium uppercase tracking-wider transition-colors
        "
      />

      {/* Pinterest Save */}
      <Buttons
        type="button"
        text="694"
        icon={<FaPinterest className="text-red-600 size-5 mr-2" />}
        style2="flex-1"
        style="
          py-8 !rounded-none border-t border-b-2 border-t-gray-100 border-b-red-600
          bg-transparent text-gray-500 hover:bg-gray-50 shadow-none
          text-sm font-medium uppercase tracking-wider transition-colors
        "
      />
    </div>
  );
}
