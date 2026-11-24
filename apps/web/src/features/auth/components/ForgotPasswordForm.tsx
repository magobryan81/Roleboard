import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/features/auth";
import { sendPasswordResetEmail } from "@/lib/api";
import Button from "@/components/ui/Button";
import Alert from "@/components/Alert";


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
                <div>
                    <Alert variant="success">
                        Email sent! Check your inbox for further instructions.
                    </Alert>
                </div> 
                :
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="flex flex-col items-center justify-center gap-4 w-full">
                    {isError && (
                        <p className="text-error">{error instanceof Error ? error.message : "User not found"}</p>
                    )}
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder="example@gmail.com"
                            className={`w-full rounded-sm px-4 py-2 border ${
                                errors.email ? "border-error" : "border-border"
                            }`}
                        />
                        {errors.email && (
                            <p className="text-error">{errors.email.message}</p>
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