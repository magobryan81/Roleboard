import { AuthLayout } from "@/components/layouts/AuthLayout";
import { LoginForm } from "@/features/auth";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <AuthLayout>
            {/* Application preview section */}
            <section className="hidden laptop:flex flex-1 items-center justify-center border-r">
                {/* content */}
                <div>
                    Preview
                </div>
            </section>
            {/* Login form section */}
            <section className="flex flex-1 flex-col laptop:flex-none items-center justify-center laptop:w-[30%]">
                {/* content */}
                <div className="flex flex-col gap-24 md:w-[80%] max-w-md mx-auto h-[70%] p-8">
                    <h2 className="text-4xl font-bold">Roleboard</h2>
                    <div className="flex flex-col justify-center gap-14">
                        <div className="flex flex-col items-center justify-center gap-8">
                            <div className="flex flex-col items-center justify-center">
                                <h2 className="text-2xl font-bold">Welcome Back!</h2>
                                <span className="text-sm text-muted">Please Login to your account</span>
                            </div>
                            <div className="w-full">
                                <LoginForm/>
                            </div>
                            <div>
                                <p className="text-sm text-muted text-center">
                                    Don't have an account?{" "}
                                    <Link
                                    to="/register"
                                    className="text-link text-right "
                                    >
                                        Create a new account now.
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>      
            </section>
        </AuthLayout>
    )
}

export default Login;