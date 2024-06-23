import FormRow from "@/components/form-row";
import { ServiceRequirement } from "@prisma-appointmendDb/client";

interface RequirementProps {
  requirement: ServiceRequirement;
}

const Requirement = ({ requirement }: RequirementProps) => {
  const required = requirement.required ? "(*)" : "";
  return (
    <div className="my-4">
      <FormRow title={requirement.description + required}>
        <input
          type="file"
          className="w-full p-2 border-2 border-gray-300"
          accept="image/*,.pdf"
          max={1 * 1024 * 1024}
          required={requirement.required}
        />
      </FormRow>
    </div>
  );
};

export default Requirement;
