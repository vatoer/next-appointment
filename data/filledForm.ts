import { dbAppointment } from "@/lib/db-appointment";
import { FormStatus, Prisma } from "@prisma-appointmendDb/client";

export interface BookedServiceForms {
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

export const getBookedServiceForms = async (bookedServiceId: string) => {
  const cte = queryCteX(bookedServiceId);
  const result = await dbAppointment.$queryRaw<BookedServiceForms[]>(cte);

  return result;
};

export interface FormsTotalResult {
  filled: number;
  confirmed: number;
  totalForms: number;
}

/**
 * Summary
 *
 * find sum of filled and confirmed forms for a bookedServiceId
 * 
 * @example
 * 
 * const { filled, confirmed, totalForms } = calculateTotalForms'your-booked-service-id');
 * 
 * console.log(Object.prototype.toString.call(filled)); //  [object Decimal]
* @remarks
The [object Decimal] output indicates that filled and totalForms are  instances of a Decimal type, not standard JavaScript numbers. This is common when dealing with databases or other systems that require more precision than JavaScript's standard Number type can provide.

* If you want to compare these Decimal instances, you'll need to convert them to standard JavaScript numbers or strings first. Most Decimal libraries provide methods to do this.

* @example 
* console.log(filled.toString() == totalForms.toString());
 */
export const calculateTotalForms = async (
  bookedServiceId: string
): Promise<FormsTotalResult> => {
  const result = await dbAppointment.$queryRaw<FormsTotalResult[]>`
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
          0 as confirmed,
          "totalForms"
        from
          cte2
        union
        select
          count(*) as filled,
          0 as confirmed,
          0 as "totalForms"
        from
          cte1
        where
          cte1.id is not null
        union
        select
          0 as filled,
          count(*) as confirmed,
          0 as "totalForms"
        from
          cte1
        where
          cte1.status = 'CONFIRMED'
      )
      select
        sum(filled) as filled,
        sum(confirmed) as confirmed,
        sum("totalForms") as "totalForms"
      from
      cte3   
    `;

  const ffs = result[0];

  // const { filled, confirmed, totalForms } = ffs;
  // console.log(typeof filled); // Outputs: object
  // console.log(Object.prototype.toString.call(filled)); //  [object Decimal]
  // console.log(typeof totalForms); /// Outputs: object
  // console.log(Object.prototype.toString.call(totalForms)); //  [object Decimal]
  // If you want to compare these Decimal instances, you'll need to convert them to standard JavaScript numbers or strings first. Most Decimal libraries provide methods to do this.
  return ffs;
};
