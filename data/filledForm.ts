import { dbAppointment } from "@/lib/db-appointment";
import { Prisma } from "@prisma-appointmendDb/client";

export interface BookedServiceForms {
  id: number;
  formId: number;
  form_id: number;
  name: string;
  description: string;
  status: string;
}

const queryCteX = (bookedServiceId: string) => {
  return Prisma.sql`
  select a.form_id, a.form_id as "formId", a.name, a.description , b.id, b.status 
  from (
    select sf.form_id , f.name, f.description from booked_services bs
    inner join services s on s.id = bs.service_id 
    inner join service_forms sf on sf.service_id = s.id 
    inner join forms f on sf.form_id = f.id 
    where
      bs.id = ${bookedServiceId}
  ) a 
  left outer join (
    select ff.form_id, ff.id, ff.status  from filled_forms ff 
    inner join booked_services bs ON bs.id = ff.booked_service_id
    where
      bs.id = ${bookedServiceId}
  ) b on a.form_id = b.form_id
  `;
};

export const getBookedServiceForms = async (bookedServiceId: string) => {
  const cte = queryCteX(bookedServiceId);
  const result = await dbAppointment.$queryRaw<BookedServiceForms[]>(cte);
  //console.log(result);

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
      select a.form_id, a.name, a.description , b.id, b.status 
        from (
          select sf.form_id , f.name, f.description from booked_services bs
          inner join services s on s.id = bs.service_id 
          inner join service_forms sf on sf.service_id = s.id 
          inner join forms f on sf.form_id = f.id 
          where
            bs.id = ${bookedServiceId}
        ) a 
        left outer join (
          select ff.form_id, ff.id, ff.status  from filled_forms ff 
          inner join booked_services bs ON bs.id = ff.booked_service_id
          where
            bs.id = ${bookedServiceId}
        ) b on a.form_id = b.form_id
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
