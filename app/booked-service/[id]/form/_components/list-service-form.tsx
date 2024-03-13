import { FormStatus } from "@/prisma/db-appointment/generated/client";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { IServiceForm } from "../_actions/queries/filledForm";

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
        <div
          key={i}
          className="w-full flex flex-row gap-2 hover:bg-blue-200/50 "
        >
          <div className="w-1/2">{form.description}</div>
          <div>
            <Link
              className="underline text-blue-500"
              href={`form/${form.formId}`}
            >
              {!form.status && (
                <div className="flex items-center gap-2">
                  <PencilIcon className="w-4 h-4" />
                  <span>Isi formulir</span>
                </div>
              )}
              {form.status && form.status !== FormStatus.FINAL ? (
                <div className="flex items-center gap-2">
                  <PencilIcon className="w-4 h-4" />
                  <span>Perbarui formulir</span>
                </div>
              ) : (
                ""
              )}
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
