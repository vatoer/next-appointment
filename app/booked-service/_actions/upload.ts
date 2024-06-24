"use server";

import { ActionResponse } from "@/actions";

interface UploadData {
  message: string;
}
export const upload = async (
  formData: FormData
): Promise<ActionResponse<UploadData>> => {
  const entries = Array.from(formData.entries());
  for (let [name, value] of entries) {
    console.log(name, value);
    if (value instanceof File) {
      if (value.size > 1 * 1024 * 1024) {
        alert(
          `${name} File ${value.name} exceeds the maximum size of ${
            1 / 1024 / 1024
          } MB`
        );
        return { success: false, error: "File size exceeds the maximum size" };
      }
    }
  }
  return { success: true, data: { message: "File uploaded" } };

  console.log(formData);
};
