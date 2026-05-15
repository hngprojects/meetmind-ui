import { useSignupStore } from "@/store/signupStore";

const UploadSuccess = () => {
  const { formData } = useSignupStore();

  if (!formData) return null;

  return (
    <div>
      <h1>hi</h1>
      {/* success image */}
      <div>
        <img
          src="/icons/success-icon.svg"
          alt="Success"
          className="w-10 h-10"
        />
      </div>
      <p>Name: {formData.name}</p>
      <p>Email: {formData.email}</p>
    </div>
  );
};

export default UploadSuccess;
