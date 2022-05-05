import { Avatar, Box, Flex, Input } from "@chakra-ui/react"
import { useFormikContext } from "formik"
import { useEffect, useState } from "react"

export const AvatarField = ({ name, avatarFieldName, ...props }: any) => {
  const { setFieldValue } = useFormikContext()

  const [image, setImage] = useState()
  const [convertedImage, setConvertedImage] = useState<any>()

  useEffect(() => {
    if (image) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setConvertedImage(reader.result)
        setFieldValue("avatar", reader.result)
      }
      reader.readAsDataURL(image)
    }
  }, [image, setFieldValue])

  const handleChange = (e) => {
    const file = e.target.files[0]
    // setFieldValue("avatar", file)

    setImage(null)
    file && setImage(file)
  }

  const handleUploadImage = () => {
    const imageInput = document.getElementById("avatar")
    imageInput.click()
  }

  return (
    <Flex justify="center">
      <Input id={name} name={name} onChange={handleChange} hidden type="file" />
      <Box
        _hover={{ cursor: "pointer" }}
        width="auto"
        onClick={handleUploadImage}
      >
        <Avatar src={convertedImage} name={avatarFieldName} {...props} />
      </Box>
    </Flex>
  )
}
