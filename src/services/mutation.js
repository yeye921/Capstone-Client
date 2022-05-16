import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "react-query";
import axios from "axios";

const queryClient = new QueryClient();

queryClient.setQueryDefaults("here", {
  queryFn: () => null,
  staleTime: Infinity,
});

export function useHere(key, url) {
  const { mutate, data, isSuccess, isLoading } = useMutation(
    (data) => axios.post(url, data),
    {
      onSuccess: async (response) => {
        queryClient.setQueryData(key, (old) => response.data);
      },
    }
  );
  return { mutate, data, isSuccess, isLoading };
}

export default queryClient;
