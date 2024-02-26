import { dbAppointment } from "@/lib/db-appointment";

export const isAllrequiredFormFilled = async (bookedServiceId: string) => {
  const result = await dbAppointment.$queryRaw`
  with cte as (select sf."formId",
    ff.* 
    from "ServiceForm" sf
    inner join "Service" s ON sf."serviceId" = s.id 
    inner join "BookedService" bs on bs."serviceId" = s.id 
    left outer join "FilledForm" ff on ff."formId" = sf."formId"  
    where bs.id = ${bookedServiceId} 
  )
  select count(*) as "totalForms"
  from cte
  where cte."status" = 'final'
  `;
  return result;
};
