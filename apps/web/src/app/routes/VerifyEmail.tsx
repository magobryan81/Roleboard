import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { verifyEmail } from "@/lib/api";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Spinner } from "@/components/ui/Spinner";
import Alert from "@/components/Alert";

const VerifyEmail = () => {
    const { code } = useParams();
    const {
        isPending,
        isSuccess,
        isError,
    } = useQuery({
        queryKey:["emailVerification", code],
        queryFn: () => verifyEmail(code as string)
    });

    return (
        <AuthLayout>
            <section className="flex items-center justify-center w-full">
                {isPending ? (
                        <div>
                            <Spinner/>
                        </div>
                    ) : (
                    <div className="flex flex-col items-center gap-3">
                        <div className="">
                            
                            {isSuccess ? (
                                <Alert variant="success">
                                    Email Verified
                                </Alert>
                            ) : (
                                <Alert variant="error">
                                    Invalid Link
                                </Alert>
                            )}
                        </div>
                        {isError && (
                            <div className="flex gap-2">
                                <p className="text-gray-400">The link is either invalid or expired.</p>
                                <Link
                                    to="/password/reset"
                                    replace
                                    className="text-link"
                                >
                                    Get a new link
                                </Link>
                            </div>
                        )}
                        <Link
                            to="/"
                            replace
                            className="text-link"
                        >
                            Back to Home
                        </Link>
                    </div>
                    )
                }
            </section>
        </AuthLayout>
    );
};

export default VerifyEmail;