import useAuth from "@/hooks/useAuth";

const Footer = () => {
    const { user } = useAuth();
  return (
    <div>
        <span>{user?.email}</span>
    </div>
  )
}

export default Footer