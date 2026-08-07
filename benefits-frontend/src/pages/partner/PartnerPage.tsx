import { useGetPartner } from "../../api/endpoints/partners/partners";

export const PartnerPage = () => {
  const {data} = useGetPartner('122');
  console.log(data)  
  return (<div>{data?.data?.name}</div>
    )
  }

  export default PartnerPage;

