import { dbAppointment } from "@/lib/db-appointment";
import { Prisma } from "@/prisma/db-appointment/generated/client";

export interface IServiceForm {
  id: number;
  formId: number;
  name: string;
  description: string;
  status: string;
}

const queryCteX = (bookedServiceId: string) => {
  return Prisma.sql`
  select a."formId", a.name, a.description , b.id, b.status 
  from (
    select sf."formId" , f."name", f.description from "BookedService" bs
    inner join "Service" s on s.id = bs."serviceId" 
    inner join "ServiceForm" sf on sf."serviceId" = s.id 
    inner join "Form" f on sf."formId" = f.id 
    where
      bs.id = ${bookedServiceId}
  ) a 
  left outer join (
    select ff."formId", ff.id, ff.status  from "FilledForm" ff 
    inner join "BookedService" bs ON bs.id = ff."bookedServiceId" 
    where
      bs.id = ${bookedServiceId}
  ) b on a."formId" = b."formId"
  `;
};

export const serviceForms = async (bookedServiceId: string) => {
  const cte = queryCteX(bookedServiceId);
  const result = await dbAppointment.$queryRaw<IServiceForm[]>(cte);

  return result;
};

export interface IFilledForm {
  filled: number;
  final: number;
  totalForms: number;
}
export const filledForms = async (bookedServiceId: string) => {
  const result = await dbAppointment.$queryRaw<IFilledForm[]>`
    with 
      cte1 as (
      select a."formId", a.name, a.description , b.id, b.status 
        from (
          select sf."formId" , f."name", f.description from "BookedService" bs
          inner join "Service" s on s.id = bs."serviceId" 
          inner join "ServiceForm" sf on sf."serviceId" = s.id 
          inner join "Form" f on sf."formId" = f.id 
          where
            bs.id = ${bookedServiceId}
        ) a 
        left outer join (
          select ff."formId", ff.id, ff.status  from "FilledForm" ff 
          inner join "BookedService" bs ON bs.id = ff."bookedServiceId" 
          where
            bs.id = ${bookedServiceId}
        ) b on a."formId" = b."formId"
      ), 
      cte2 as (
      select
        count(*) as "totalForms"
      from
        cte1
      ),
      cte3 as (
        select
          0 as filled,
          0 as final,
          "totalForms"
        from
          cte2
        union
        select
          count(*) as filled,
          0 as final,
          0 as "totalForms"
        from
          cte1
        where
          cte1.id is not null
        union
        select
          0 as filled,
          count(*) as final,
          0 as "totalForms"
        from
          cte1
        where
          cte1.status = 'final'
      )
      select
        sum(filled) as filled,
        sum(final) as final,
        sum("totalForms") as "totalForms"
      from
      cte3   
    `;

  return result[0];
};
