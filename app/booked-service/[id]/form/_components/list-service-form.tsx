import { FormStatus } from "@/prisma/db-appointment/generated/client";
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
    <div className=" w-full">
      <ul>
        {serviceForms?.map((form, i) => (
          <li key={i} className="">
            <div className="flex flex-row gap-2">
              <div className="grow">{form.description}</div>

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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListServiceForm;
