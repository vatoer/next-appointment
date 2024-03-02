import { dbAppointment } from "@/lib/db-appointment";
import { redirect } from "next/navigation";
import ConfirmButton from "./_components/confirm-button";
import ListFilledForm from "./_components/list-filled-form";

const ConfirmationPage = async ({ params }: { params: { id: string } }) => {
  // TODO
  // 1. check user
  // 2. check if the form is available for the user

  const bookedService = await dbAppointment.bookedService.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!bookedService) {
    redirect("/service"); //todo make not hardcoded
  }

  return (
    <div>
      <h1>Confirmation</h1>
      <p>
        Periksa kembali draft anda, anda dapat melakukan perubahan pada draft
        data anda.
      </p>

      <div className="border shadow-sm p-2 ">
        <ListFilledForm bookedServiceId={bookedService.id} />
      </div>
      <p>
        Setelah yakin dengan data yang anda masukkan, silahkan klik tombol
        &quot;Confirm&quot;, data anda akan di kunci dan tidak dapat diubah lagi.
      </p>
      <div>
        <ConfirmButton bookedServiceId={bookedService.id} />
      </div>
    </div>
  );
};

export default ConfirmationPage;
