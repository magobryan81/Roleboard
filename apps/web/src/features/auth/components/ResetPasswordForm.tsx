import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordSchema, type ResetPasswordInput } from "../types/resetPasswordSchema";
import { resetPassword } from "../../../lib/api";
import Button from "../../../components/ui/Button";
import { BadgeCheck } from "lucide-react";


interface ResetPasswordFormProps {
    code: string
}

const ResetPasswordForm = ({code}: ResetPasswordFormProps) => {
    

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<ResetPasswordInput>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onChange",
    });

    const {
        mutate: resetUserPassword,
        isPending,
        isSuccess,
        isError,
        error
    } = useMutation({
        mutationFn: resetPassword,
        
    });

    const onSubmit = (data: ResetPasswordInput) => {
        resetUserPassword({verificationCode: code, password: data.password});
    };

    return (
   
 
            
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="flex flex-col items-center justify-center gap-4 w-full">
            {isError && (
                <p className="text-red-400">{error instanceof Error ? error.message : "User not found"}</p>
            )}
            { isSuccess ? 
            <div>
                <div className="flex items-center justify-center gap-2 text-[#166534] text-center">
                    <BadgeCheck color="#4F8A10" /> 
                    <span>Password reset successfully.</span>
                </div>
            </div>
            :
            <>
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
                Reset Password
            </Button>
            </>
            }
            
        </form>
    
    )
};

export default ResetPasswordForm;