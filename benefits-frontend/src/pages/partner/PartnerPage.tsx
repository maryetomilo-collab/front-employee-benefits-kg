import { useGetPartner } from "../../api/endpoints/partners/partners";
import { useParams } from "react-router";

export const PartnerPage = () => {
  const { partnerId } = useParams();
  const {data} = useGetPartner(partnerId ?? "", {
    query: { enabled: Boolean(partnerId) },
  });
  return (<div>{data?.data?.name}</div>
    )
  }

  export default PartnerPage;
