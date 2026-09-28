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
                        <div className="">
                            
                            {isSuccess ? (
                                <div className="flex items-center justify-center gap-2 px-3 py-2 bg-[#DFF2BF]">
                                    <BadgeCheck color="#4F8A10" />
                                    <span className="text-[#166534]">Email Verified</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2 px-3 py-2 bg-[#FFBABA]">
                                    <BadgeAlert color="#D8000C" />
                                    <span className="text-[#991B1B]">Invalid Link</span>
                                </div>
                            )}
                        </div>
                        {isError && (
                            <div className="flex gap-2">
                                <p className="text-gray-400">The link is either invalid or expired.</p>
                                <Link
                                    to="/password/reset"
                                    replace
                                    className="text-[#0066cc]"
                                >
                                    Get a new link
                                </Link>
                            </div>
                        )}
                        <Link
                            to="/"
                            replace
                            className="text-[#0066cc]"
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