import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerSchema, type RegisterInput } from "../types/registerSchema";
import { register as registerUser } from "../../../lib/api";
import Button from "../../../components/ui/Button";


const RegisterForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
    });

    const {
        mutate: createAccount,
        isPending,
        isError,
        error
    } = useMutation({
        mutationFn: registerUser,
        onSuccess:() => {
            navigate('/home', {
                replace: true
            })
        }
    });

    const onSubmit = (data: RegisterInput) => {
        createAccount(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="flex flex-col items-center justify-center gap-8 w-full">
            {isError && (
                <p className="text-red-400">{error instanceof Error ? error.message : "An error occured"}</p>
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
                    placeholder="Must be 8 characters long"
                    className={`w-full rounded-sm px-4 py-2 border ${
                        errors.password ? "border-red-500" : "border-border"
                    }`}
                />
                {errors.password && (
                    <p className="text-red-400">{errors.password.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                    placeholder="••••••••"
                    className={`w-full rounded-sm px-4 py-2 border ${
                        errors.confirmPassword ? "border-red-500" : "border-border"
                    }`}
                />
                {errors.confirmPassword && (
                    <p className="text-red-400">{errors.confirmPassword.message}</p>
                )}
            </div>

            <Button type="submit" isLoading={isPending} disabled={!isValid} className={isValid ? "cursor-pointer" : ""}>
                Create Account
            </Button>

            
        </form>
    )
};

export default RegisterForm;