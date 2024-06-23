import { ServiceRequirement } from "@prisma-appointmendDb/client";
import Requirement from "./requirement";

interface ListOfRequirementProps {
  requirements: ServiceRequirement[];
}
const ListOfRequirement = ({ requirements }: ListOfRequirementProps) => {
  return (
    <div>
      {requirements.map((requirement) => (
        <Requirement requirement={requirement} key={requirement.id} />
      ))}
    </div>
  );
};

export default ListOfRequirement;
