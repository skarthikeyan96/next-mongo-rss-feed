import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";

import Card from "../components/card";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Home = (properties: any) => {
  const { data, error } = useSWR("/api/feed", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Box p={4}>
      <Text>RSS feed reader</Text>
      <HStack spacing={12}>
        {data.map((item: any) => {
          return (
            <Box key={item._id}>
              <Card
                id={item._id}
                title={item.title}
                description={item.description}
                date={item.lastBuildDate}
              />
            </Box>
          );
        })}
      </HStack>
    </Box>
  );
};

export default Home;
