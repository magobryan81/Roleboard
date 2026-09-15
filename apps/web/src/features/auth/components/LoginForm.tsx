import { useNavigate } from "react-router-dom";
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
            <div className="w-full">
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Email"
                    className={`w-full rounded-sm px-4 py-2 border ${
                        errors.email ? "border-red-500" : "border-border"
                    }`}
                />
                {errors.email && (
                    <p>{errors.email.message}</p>
                )}
            </div>
            <div className="w-full">
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                    id="password"
                    type="password"
                    {...register("password")}
                    placeholder="Password"
                    className={`w-full rounded-sm px-4 py-2 border ${
                        errors.email ? "border-red-500" : "border-border"
                    }`}
                />
                {errors.password && (
                    <p>{errors.password.message}</p>
                )}
            </div>

            {isError && (
                <p>{error instanceof Error ? error.message : "Login Failed"}</p>
            )}

            <Button type="submit" isLoading={isPending} disabled={!isValid} className={isValid ? "cursor-pointer" : ""}>
                Log in
            </Button>

            <span className="text-gray-400">Forgot Password?</span>
        </form>
    )
};

export default LoginForm;