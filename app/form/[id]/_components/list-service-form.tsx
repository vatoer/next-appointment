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
    <div>
      <ul>
        {serviceForms?.map((form) => (
          <li key={form.id} className="">
            <div className="flex flex-row gap-2">
              <div className="w-1/2">{form.description}</div>

              <div>
                <Link
                  className="underline text-blue-500"
                  href={`/form/${bookedServiceId}/${form.formId}`}
                >
                  {!form.status && "Fill Form"}
                  {form.status && form.status !== "final"
                    ? "Perbarui formulir"
                    : ""}
                </Link>
              </div>
              <div>
                <Link
                  className="underline text-blue-500"
                  href={`/form/${bookedServiceId}/${form.formId}/download`}
                >
                  Download {form.status}
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListServiceForm;
