import { dbAppointment } from "@/lib/db-appointment";
import Link from "next/link";

interface IListFormsForServiceProps {
  bookedServiceId: string;
  serviceId: string;
}
const ListFormsForService = async ({
  bookedServiceId,
  serviceId,
}: IListFormsForServiceProps) => {
  const formsForService = await dbAppointment.formsForService.findMany({
    where: {
      serviceId,
    },
    include: {
      form: {
        include: {
          FilledForm: { where: { bookedServiceId } },
        },
      },
    },
  });

  return (
    <div>
      <h1 className="font-semibold mb-2">daftar formulir</h1>
      <ul>
        {formsForService?.map((form) => (
          <li key={form.formId} className="m-2 p-2 hover:bg-slate-200/40">
            <div className="flex flex-row gap-2">
              <div className="w-1/2">{form.form.description}</div>

              {form.form.FilledForm.length > 0 ? (
                form.form.FilledForm[0].status !== "final" ? (
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
                    >
                      Download Draft
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link
                      className="underline text-blue-500"
                      href={`/form/${bookedServiceId}/${form.formId}/download`}
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

export default ListFormsForService;
