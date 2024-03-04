import { dbAppointment } from "@/lib/db-appointment";
import {
  FilledForm,
  Form,
  FormStatus,
  ServiceForm,
} from "@/prisma/db-appointment/generated/client";
import Link from "next/link";

// const serviceForms = await dbAppointment.serviceForm.findMany({
//   where: {
//     serviceId,
//   },
//   include: {
//     form: {
//       include: {
//         filledForms: { where: { bookedServiceId } },
//       },
//     },
//   },
// });

type TServiceForms = ServiceForm & {
  form: Form & { filledForms: FilledForm[] };
};

interface IListServiceFormProps<T> {
  bookedServiceId: string;
  serviceId: string;
  forms: T[];
}
const ListServiceForm = async ({
  forms,
  bookedServiceId,
  serviceId,
}: IListServiceFormProps<TServiceForms>) => {
  return (
    <div>
      <h1 className="font-semibold mb-2">daftar formulir</h1>
      <ul>
        {forms?.map((form) => (
          <li key={form.formId} className="m-2 p-2 hover:bg-slate-200/40">
            <div className="flex flex-row gap-2">
              <div className="w-1/2">{form.form.description}</div>

              {form.form.filledForms.length > 0 ? (
                form.form.filledForms[0].status !== FormStatus.FINAL ? (
                  <div className="gap-2 flex flex-auto">
                    <Link
                      className="underline text-blue-500"
                      href={`/form/${bookedServiceId}/${form.formId}`}
                    >
                      Perbarui Formulir
                    </Link>
                    <Link
                      className="underline text-blue-500"
                      href={`/form/${bookedServiceId}/${form.formId}/download`}
                      target="_blank"
                    >
                      Download Draft
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link
                      className="underline text-blue-500"
                      href={`/form/${bookedServiceId}/${form.formId}/download`}
                      target="_blank"
                    >
                      Download Formulir Final
                    </Link>
                  </div>
                )
              ) : (
                <div>
                  <Link
                    className="underline text-blue-500"
                    href={`/form/${bookedServiceId}/${form.formId}`}
                  >
                    Isi Formulir
                  </Link>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListServiceForm;
