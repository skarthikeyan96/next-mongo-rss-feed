import {
  Box,
  Center,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { format } from "date-fns";

export default function Card({ id, title, description, date }: any) {
  return (
    <Center py={6}>
      <Box
        maxW={"445px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            RSS
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"xl"}
            fontFamily={"body"}
          >
            {title}
          </Heading>
          <Text>{format(new Date(date), "PPP")}</Text>
        </Stack>
      </Box>
    </Center>
  );
}
