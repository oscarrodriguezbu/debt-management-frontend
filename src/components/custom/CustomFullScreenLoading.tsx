import { CustomLoading } from "./CustomLoading";

export const CustomFullScreenLoading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <CustomLoading />
    </div>
  );
};
