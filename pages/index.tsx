import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";

import Card from "../components/card";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Home = (properties: any) => {
  const { data, error } = useSWR("/api/feed", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <Box p={4} textAlign={"center"}>
        {" "}
        <Text> Loading... </Text>
      </Box>
    );

  return (
    <Box p={4}>
      <Stack spacing={12}>
        {data.map((item: any) => {
          return (
            <Box key={item._id}>
              <a href={item.link} target={"_blank"} rel="noreferrer">
                <Card
                  id={item._id}
                  title={item.title}
                  description={item.description}
                  date={item.lastBuildDate}
                />
              </a>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Home;
