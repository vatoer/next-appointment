import { ServiceRequirement } from "@prisma-appointmendDb/client";

// interface ICardListSyaratProps {
//   syarat: string[];
// }

// const syarat = [
//   "Formulir Permohonan Paspor RI yang sudah diisi lengkap. Formulaire de demande de passeport dument rempli.",
//   "Surat Pernyataan Tidak Berkewarganegaraan Asing yang sudah diisi lengkap. Lettre de déclaration de statut de nationalité unique dument remplie.",
//   "Paspor RI lama. Ancien passeport.",
//   "Fotokopi Akta Kelahiran/Akta Kenal Lahir. Photocopie de l'acte de naissance.",
//   "Fotokopi bolak-balik kartu izin tinggal. Photocopie recto-verso du titre de séjour/carte de résident.",
//   "Fotokopi akta perkawinan/livret de famille atau akta perceraian (untuk yang menikah/cerai). Photocopie de l'acte de mariage/livret de famille ou l'acte de divorce.",
// ];

interface ICardListSyaratProps {
  syarat: ServiceRequirement[];
}

const CardListSyarat = ({ syarat }: ICardListSyaratProps) => {
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

export default CardListSyarat;
