import { Box, Button, Input } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import router from "next/router";
import React from "react";

const Home: NextPage = () => {
  const [value, setValue] = React.useState("");

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setValue(event.target.value);

  const handleClick = async () => {
    const response = await fetch(`/api/feed`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: value,
      }),
    }).then((res) => res.json());
    if (response.status === 200) {
      router.push("/");
    }
  };

  return (
    <div>
      <Head>
        <title>RSS feed reader</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box p={4}>
        <Box>
          <Input
            value={value}
            onChange={handleChange}
            size="sm"
            width={"50%"}
            ml={4}
          />
          <Button ml={4} size="sm" onClick={handleClick}>
            {" "}
            Add to Feed{" "}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Home;