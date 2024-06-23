import { Button } from "@/components/ui/button";
import { ServiceRequirement } from "@prisma-appointmendDb/client";
import ListOfRequirement from "./list-requirement";

interface FormUploadRequirementsProps {
  requirements: ServiceRequirement[];
}

export const FormUploadRequirements = ({
  requirements,
}: FormUploadRequirementsProps) => {
  return (
    <div>
      <form>
        <ListOfRequirement requirements={requirements} />
        <Button type="submit" className="w-full">
          Upload
        </Button>
      </form>
    </div>
  );
};

export default FormUploadRequirements;
