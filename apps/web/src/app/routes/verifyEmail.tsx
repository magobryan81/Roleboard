import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { verifyEmail } from "../../lib/api";
import { AuthLayout } from "../../components/layouts/AuthLayout";
import { Spinner } from "../../components/ui/Spinner";
import { BadgeCheck, BadgeAlert } from "lucide-react";

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
                        <div className="border flex items-center justify-center gap-2 px-3 py-2">
                            
                            {isSuccess ? (
                                <div className="flex gap-2">
                                    <BadgeCheck color="green" />
                                    <span>Email Verified</span>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <BadgeAlert color="red" />
                                    <span>Invalid Link</span>
                                </div>
                            )}
                        </div>
                        {isError && (
                            <div className="flex gap-2">
                                <p>The link is either invalid or expired.</p>
                                <Link
                                    to="/password/reset"
                                    replace
                                >
                                    Get a new link
                                </Link>
                            </div>
                        )}
                        <Link
                            to="/"
                            replace
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