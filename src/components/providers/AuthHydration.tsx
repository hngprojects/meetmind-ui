// "use client";

// import { useAuthStore } from "@/store/authStore";
// import { useEffect } from "react";

// export default function AuthHydration({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const setHydrated = useAuthStore((s) => s.setHydrated);

//   useEffect(() => {
//     setHydrated(true);
//     const stored = localStorage.getItem("token");
//     if (stored && !useAuthStore.getState().token) {
//       useAuthStore.getState().setToken(stored);
//     }
//   }, [setHydrated]);

//   return <>{children}</>;
// }
