import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginSchema, type LoginInput } from "../types/loginSchema";
import { login } from "../../../lib/api";
import Button from "../../../components/ui/Button";



const LoginForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    const {
        mutate: signIn,
        isPending,
        isError,
        error
    } = useMutation({
        mutationFn: login,
        onSuccess:() => {
            navigate('/home', {
                replace: true
            })
        }
    });

    const onSubmit = (data: LoginInput) => {
        signIn(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-8 w-full">
            {isError && (
                <p className="text-red-400">{error instanceof Error ? error.message : "Invalid username or password"}</p>
            )}
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="example@gmail.com"
                    className={`w-full rounded-sm px-4 py-2 border ${
                        errors.email ? "border-red-500" : "border-border"
                    }`}
                />
                {errors.email && (
                    <p className="text-red-400">{errors.email.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    {...register("password")}
                    placeholder="••••••••"
                    className={`w-full rounded-sm px-4 py-2 border ${
                        errors.email ? "border-red-500" : "border-border"
                    }`}
                />
                {errors.password && (
                    <p className="text-red-400">{errors.password.message}</p>
                )}
            </div>

            <div className="w-full flex justify-end">
                <Link
                    to="password/forgot"
                    className="text-[#0066cc] text-right"
                >
                    Forgot Password?
                </Link>
            </div>

            <Button type="submit" isLoading={isPending} disabled={!isValid} className={isValid ? "cursor-pointer" : ""}>
                Log in
            </Button>

            
        </form>
    )
};

export default LoginForm;