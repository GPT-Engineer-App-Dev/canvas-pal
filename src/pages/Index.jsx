import { Box, Container, Flex, Heading, HStack, Link, Spacer, Text, VStack, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useEvents, useAddEvent } from "../integrations/supabase/index.js";
import { useState } from "react";

const Index = () => {
  const { data: events, error, isLoading } = useEvents();
  const addEventMutation = useAddEvent();
  const [newEvent, setNewEvent] = useState({ name: "", date: "", description: "", venue_id: 1 });

  const handleAddEvent = () => {
    addEventMutation.mutate(newEvent);
  };

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
          {isLoading && <Spinner />}
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error.message}
            </Alert>
          )}
          {events && events.map(event => (
            <Box key={event.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{event.name}</Heading>
              <Text mt={4}>{event.description}</Text>
            </Box>
          ))}
          <Box>
            <Heading size="md">Add New Event</Heading>
            <input
              type="text"
              placeholder="Name"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            />
            <input
              type="date"
              placeholder="Date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
            <button onClick={handleAddEvent}>Add Event</button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;