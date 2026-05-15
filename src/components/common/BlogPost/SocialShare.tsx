import { FaFacebookF, FaTwitter, FaPinterest } from "react-icons/fa";

export default function SocialShare() {
  return (
    <div className="flex items-center w-full my-10">

      {/* Facebook */}
      <button
        className="
          flex-1 flex items-center justify-center gap-2
          py-8
          border-t border-b-2 border-t-gray-100 border-b-[#3b5998]
          text-[#3b5998]
          hover:bg-gray-50
          transition-colors
          text-sm font-medium uppercase tracking-wider
          cursor-pointer
        "
      >
        <FaFacebookF className="size-5" />
        <span>Share 694</span>
      </button>

      {/* Twitter */}
      <button
        className="
          flex-1 flex items-center justify-center gap-2
          py-8
          border-t border-b-2 border-t-gray-100 border-b-sky-400
          text-sky-500
          hover:bg-gray-50
          transition-colors
          text-sm font-medium uppercase tracking-wider
          cursor-pointer
        "
      >
        <FaTwitter className="size-5" />
        <span>Tweet</span>
      </button>

      {/* Pinterest */}
      <button
        className="
          flex-1 flex items-center justify-center gap-2
          py-8
          border-t border-b-2 border-t-gray-100 border-b-red-600
          text-gray-500
          hover:bg-gray-50
          transition-colors
          text-sm font-medium uppercase tracking-wider
          cursor-pointer
        "
      >
        <FaPinterest className="text-red-600 size-5" />
        <span>694</span>
      </button>

    </div>
  );
}