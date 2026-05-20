import Link from "next/link";

interface AuthFooterProps {
  text: string;
  linkText: string;
  href: string;
}

const AuthFooter = ({ text, linkText, href }: AuthFooterProps) => {
  return (
    <div className="mt-4 text-center text-[16px] text-text-body">
      <span>{text} </span>

      <Link
        href={href}
        className="text-button-primary-bg text-[16px] hover:opacity-80"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default AuthFooter;
