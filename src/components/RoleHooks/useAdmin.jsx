import { useQuery } from "@tanstack/react-query";
 // তোমার AuthContext থেকে ইউজার আনবে
import useAxiosSecure from "../Auth/useAxiosSecure";
import AuthContext from "../Auth/AuthContext";
import { useContext } from "react";


const useAdmin = () => {

  const {user, loading}=useContext(AuthContext)
  const [axiosSecure] = useAxiosSecure();

  const { data: isAdmin, isLoading: adminLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['isAdmin', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      return res.data.admin;
    }
  });

  return [isAdmin, adminLoading];
};

export default useAdmin;
