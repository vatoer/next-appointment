import { ServiceRequirement } from "@/prisma/db-appointment/generated/client";

interface IListSyaratProps {
  syarat: ServiceRequirement[];
}

const ListSyarat = ({ syarat }: IListSyaratProps) => {
  if (!syarat) return null;

  return (
    <>
      <div className="w-full px-4">
        <ul className="list-disc">
          {syarat.map((s, i) => (
            <li key={i}>{s.description}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ListSyarat;
