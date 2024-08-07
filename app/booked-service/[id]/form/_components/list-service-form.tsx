import { BookedServiceForms } from "@/data/filledForm";
import { FormStatus } from "@prisma-appointmendDb/client";
import Link from "next/link";

interface IListServiceFormProps {
  bookedServiceId: string;
  serviceForms: BookedServiceForms[];
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
              {!form.status && `Fill Form ${form.form_id}`}
              {form.status && form.status !== FormStatus.CONFIRMED
                ? "Perbarui formulir"
                : ""}
            </Link>
          </div>
          <div>
            {form.status && (
              <Link
                className="underline text-blue-500"
                href={`form/${form.formId}/download`}
                target="_blank"
              >
                {form.status === FormStatus.CONFIRMED && "Download formulir"}
                {form.status === FormStatus.DRAFT && "Lihat draft formulir"}
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListServiceForm;
