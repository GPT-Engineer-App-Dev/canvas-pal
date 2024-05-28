import { Box, Container, Flex, Heading, HStack, Link, Spacer, Text, VStack } from "@chakra-ui/react";

const Index = () => {
  return (
    <Box>
      <Flex as="nav" bg="blue.500" color="white" padding={4}>
        <HStack spacing={8}>
          <Heading size="md">Brand</Heading>
          <Link href="#home" fontSize="lg">Home</Link>
          <Link href="#about" fontSize="lg">About</Link>
          <Link href="#contact" fontSize="lg">Contact</Link>
        </HStack>
        <Spacer />
      </Flex>
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Text fontSize="2xl">Your Blank Canvas</Text>
          <Text>Chat with the agent to start making edits.</Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;