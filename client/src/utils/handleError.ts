import { toast } from "sonner";

export const handleError = (error: any) => {
  console.log(error.data);
  toast("Error: " + error.data);
};
