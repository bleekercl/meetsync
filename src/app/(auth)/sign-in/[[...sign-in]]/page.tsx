import { SignIn } from "@clerk/nextjs";
import { CLERK_APPEARANCE } from "@/lib/constants/config";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn appearance={CLERK_APPEARANCE} />
    </div>
  );
} 