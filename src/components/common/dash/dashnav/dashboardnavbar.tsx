import Image from "next/image";
import Link from "next/link";
import Dashnavlist from "./dashnavlist";
import { MdKeyboardArrowDown } from "react-icons/md";

const Dashboardnavbar = () => {
  return (
    <section>
      <div
        className="flex flex-row justify-between
       py-8 px-16 items-center"
      >
        {/* Logo + Brand Name */}
        <div className="flex gap-3 w-[40%]">
          <Link href="/" className="flex items-center">
            <Image
              src="/icons/meetmind-logo.svg"
              alt="MeetMind Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
          <p className="font-bold text-[24px]">
            Meet<span className="text-[#4F46E5]">Mind</span>
          </p>
        </div>

        <div className="flex items-center justify-center h-10 w-[70%]">
          {/* navlist */}
          <div
            className=" h-10  bg-card flex rounded-lg
           items-center justify-center w-[60%]"
          >
            <Dashnavlist />
          </div>

          {/* icons */}
          <div className="flex flex-row justify-around w-[30%]">
            <Image
              src="/icons/magnifying-lens.svg"
              alt="search-icon"
              width={25}
              height={25}
            />
            <Image
              src="/icons/bell-notification.svg"
              alt="bell-notification"
              width={25}
              height={25}
            />

            <div>
              <Image
                src="/images/profile-icon.png"
                alt="profile-icon"
                width={35}
                height={35}
              />

              <MdKeyboardArrowDown />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboardnavbar;
