import { FormStatus } from "@/prisma/db-appointment/generated/client";
import Link from "next/link";
import { IServiceForm } from "../../../../../data/filledForm";

interface IListServiceFormProps {
  bookedServiceId: string;
  serviceForms: IServiceForm[];
}
export const ListServiceForm = ({
  bookedServiceId,
  serviceForms,
}: IListServiceFormProps) => {
  return (
    <div className=" w-full flex-col flex">
      {serviceForms?.map((form, i) => (
        <div key={i} className="w-full flex flex-row gap-2 hover:bg-slate-200 ">
          <div className="w-1/2">{form.description}</div>
          <div>
            <Link
              className="underline text-blue-500"
              href={`form/${form.formId}`}
            >
              {!form.status && "Fill Form"}
              {form.status && form.status !== FormStatus.FINAL
                ? "Perbarui formulir"
                : ""}
            </Link>
          </div>
          <div>
            {form.status && (
              <Link
                className="underline text-blue-500"
                href={`form/${form.formId}/download`}
              >
                Download {form.status?.toLowerCase()}
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListServiceForm;
