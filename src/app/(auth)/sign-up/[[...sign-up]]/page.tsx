import { SignUp } from "@clerk/nextjs";
import { CLERK_APPEARANCE } from "@/lib/constants/config";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp appearance={CLERK_APPEARANCE} />
    </div>
  );
} 