const fetcher = (url: string) => fetch(url).then((r) => r.json());
import useSWR from "swr";

export const useDaysOff = () => {
  const { data, error, isLoading } = useSWR("/api/days-off", fetcher);
  return {
    daysOff: data,
    isLoading: isLoading,
    isError: error,
  };
};
