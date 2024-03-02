import { dbAppointment } from "@/lib/db-appointment";
import { FilledForm, Form } from "@/prisma/db-appointment/generated/client";
import Link from "next/link";

type TFilledForm = FilledForm & { form: Form };

interface IListFilledFormProps {
  bookedServiceId: string;
}
const ListFilledForm = async ({ bookedServiceId }: IListFilledFormProps) => {
  const filledForms = await dbAppointment.filledForm.findMany({
    where: {
      bookedServiceId,
    },
    include: {
      form: true,
    },
  });

  return (
    <div>
      <h1 className="font-semibold mb-2">daftar formulir</h1>
      <ul>
        {filledForms?.map((form) => (
          <li key={form.id} className="">
            <div className="flex flex-row gap-2">
              <div className="w-1/2">{form.form.description}</div>
              <div>{form.status}</div>
              <div>
                <Link
                  className="underline text-blue-500"
                  href={`/form/${form.bookedServiceId}/${form.formId}`}
                >
                  edit
                </Link>
              </div>
              <div>
                <Link
                  className="underline text-blue-500"
                  href={`/form/${form.bookedServiceId}/${form.formId}/download`}
                >
                  download {form.status}
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListFilledForm;
