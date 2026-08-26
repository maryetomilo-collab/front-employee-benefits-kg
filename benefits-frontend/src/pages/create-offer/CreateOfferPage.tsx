import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'
import { useNavigate } from 'react-router'

function CreateOfferPage() {
  const navigate = useNavigate()

  const handleBack = () => {
    void navigate(-1)
  }

  return (
    <Flex vertical align="flex-start">
      <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack}>
        Назад
      </Button>
    </Flex>
  )
}

export default CreateOfferPage
