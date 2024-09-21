import Container from "../components/Container";
import BackgroundVideo from "../components/BackgroundVideo";
import Introduction from "../components/Introduction";
import React, { useEffect, useState } from "react";
function Home() {
  return (
    <>
      
      <BackgroundVideo />
      <Introduction />
      <Container />
    </>
  );
}

export default Home;
