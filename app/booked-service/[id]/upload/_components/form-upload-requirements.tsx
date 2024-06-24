"use client";
import { upload } from "@/app/booked-service/_actions/upload";
import { Button } from "@/components/ui/button";
import { ServiceRequirement } from "@prisma-appointmendDb/client";
import { FormEvent } from "react";
import ListOfRequirement from "./list-requirement";

interface FormUploadRequirementsProps {
  requirements: ServiceRequirement[];
  maxFileSize: number; // in bytes
}

export const FormUploadRequirements = ({
  requirements,
  maxFileSize,
}: FormUploadRequirementsProps) => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const entries = Array.from(formData.entries());

    for (let [name, value] of entries) {
      if (value instanceof File) {
        if (value.size > maxFileSize) {
          alert(
            `${name} File ${value.name} exceeds the maximum size of ${
              maxFileSize / 1024 / 1024
            } MB`
          );
          return;
        }
      }
    }

    const uploadFile = await upload(formData);
    if (!uploadFile.success) {
      alert(uploadFile.error);
      return;
    }

    alert(uploadFile.data.message);

    console.log(uploadFile);

    console.log(formData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ListOfRequirement requirements={requirements} />
        <Button type="submit" className="w-full">
          Upload
        </Button>
      </form>
    </div>
  );
};

export default FormUploadRequirements;
