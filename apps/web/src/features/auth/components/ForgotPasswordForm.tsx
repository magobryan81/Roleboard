import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/features/auth";
import { sendPasswordResetEmail } from "@/lib/api";
import Button from "@/components/ui/Button";
import { BadgeCheck } from "lucide-react";


const ForgotPasswordForm = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<ForgotPasswordInput>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onChange",
    });

    const {
        mutate: sendPasswordReset,
        isPending,
        isSuccess,
        isError,
        error
    } = useMutation({
        mutationFn: sendPasswordResetEmail,
        
    });

    const onSubmit = (email: ForgotPasswordInput) => {
        sendPasswordReset(email);
    };

    return (
        <>
            { isSuccess ? 
                <div className=" px-3 py-2 bg-[#DFF2BF]">
                    
                    <div className="flex text-[#166534] text-center">
                        <BadgeCheck color="#4F8A10" /> 
                        <span>Email sent! Check your inbox for further instructions.</span>
                    </div>
                </div> 
                :
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="flex flex-col items-center justify-center gap-4 w-full">
                    {isError && (
                        <p className="text-red-400">{error instanceof Error ? error.message : "User not found"}</p>
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
                    
                    <Button type="submit" isLoading={isPending} disabled={!isValid} className={isValid ? "cursor-pointer" : ""}>
                        Reset Password
                    </Button>
                </form>
            }
        </>
    )
};

export default ForgotPasswordForm;