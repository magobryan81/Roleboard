import { AuthLayout } from "@/components/layouts/AuthLayout";
import { ForgotPasswordForm } from "@/features/auth";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <AuthLayout>
        <section className="flex flex-1 flex-col laptop:flex-none items-center justify-center w-full">
            {/* content */}
            <div className="flex flex-col gap-24 h-[70%] w-[80%] max-w-md mx-auto p-8">
                <h2 className="text-4xl font-bold">Roleboard</h2>
                <div className="flex flex-col justify-center gap-14 w-full">
                    <div className="flex flex-col items-center justify-center gap-8">
                        <div className="flex flex-col gap-2 w-full items-center">
                            <h2 className="text-4xl font-bold">Reset your Password</h2>
                        </div>
                        <div className="w-full">
                            <ForgotPasswordForm/>
                        </div>
                        <div className="flex justify-center w-full gap-1">
                            <span className="text-gray-400">
                                Go back to
                            </span>
                            <Link
                                to="/"
                                className="text-[#0066cc] text-right"
                            >
                                Sign in
                            </Link>
                            <span className="text-gray-400">
                                or
                            </span>
                            <Link
                                to="/register"
                                className="text-[#0066cc] text-right"
                            >
                                Sign up.
                            </Link>
                        </div>
                    </div>
                </div>
            </div>      
        </section>
    </AuthLayout>
  )
};

export default ForgotPassword;