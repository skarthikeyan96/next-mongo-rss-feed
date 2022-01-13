import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import Card from "../../components/card";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Feed = () => {
  const router = useRouter();

  const { data, error } = useSWR(
    `/api/getOneFeed?id=${router.query.id}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Box p={4}>
      <Text>RSS feed reader</Text>
      {data[0].items.map((item: any) => {
        return (
          <a href={item.link} key={item.id}>
            <Card
              title={item.title}
              description={item.content}
              date={item.isoDate}
            />
          </a>
        );
      })}
    </Box>
  );
};

export default Feed;
