import { dbAppointment } from "@/lib/db-appointment";

export interface IServiceForm {
  id: number;
  formId: number;
  name: string;
  description: string;
  status: string;
}

export const serviceForms = async (bookedServiceId: string) => {
  const result = await dbAppointment.$queryRaw<IServiceForm[]>`
	select
		sf."formId",
    f.name,
		f.description,
		ff.id,
		ff.status
	from
		"ServiceForm" sf
  inner join "Form" f on
		sf."formId" = f.id 
	inner join "Service" s on
		sf."serviceId" = s.id
	inner join "BookedService" bs on
		bs."serviceId" = s.id
	left outer join "FilledForm" ff on
		ff."formId" = sf."formId"
	where
      bs.id = ${bookedServiceId}
  `;

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
      select
        sf."formId",
            ff.id,
        ff.status
      from
        "ServiceForm" sf
      inner join "Service" s on
        sf."serviceId" = s.id
      inner join "BookedService" bs on
        bs."serviceId" = s.id
      left outer join "FilledForm" ff on
        ff."formId" = sf."formId"
      where
        bs.id = ${bookedServiceId}
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
        cte1.status != 'final'
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
