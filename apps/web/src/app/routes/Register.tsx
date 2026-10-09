import { AuthLayout } from "@/components/layouts/AuthLayout";
import { RegisterForm } from "@/features/auth";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <AuthLayout>
            <section className="flex flex-1 flex-col laptop:flex-none items-center justify-center w-full">
                {/* content */}
                <div className="flex flex-col gap-24 h-[70%] md:w-[80%] max-w-md mx-auto p-8">
                    <h2 className="text-4xl font-bold">Roleboard</h2>
                    <div className="flex flex-col justify-center gap-14 w-full">
                        <div className="flex flex-col items-center justify-center gap-8">
                            <div className="flex flex-col gap-2 w-full items-center">
                                <h2 className="text-2xl font-bold">Create your account</h2>
                            </div>
                            <div className="w-full">
                                <RegisterForm/>
                            </div>
                            <div>
                                <p className="text-sm text-muted text-center">
                                    Already have an account?{" "}
                                    <Link
                                    to="/"
                                    className="text-link text-right "
                                    >
                                        Log in.
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

export default Register;