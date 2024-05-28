import { useState } from "react";
import { Box, Container, Flex, Heading, HStack, Link, Spacer, Text, VStack, Spinner, Alert, AlertIcon, Button, Stack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useEvents, useAddEvent } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: events, error, isLoading } = useEvents();
  const addEventMutation = useAddEvent();
  const [newEvent, setNewEvent] = useState({ name: "", date: "", description: "", venue_id: 1 });
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events ? events.slice(indexOfFirstEvent, indexOfLastEvent) : [];

  const handleAddEvent = () => {
    addEventMutation.mutate(newEvent);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = events ? Math.ceil(events.length / eventsPerPage) : 1;

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
          {currentEvents.map(event => (
            <Box key={event.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">
                <Link as={RouterLink} to={`/event/${event.id}`}>
                  {event.name}
                </Link>
              </Heading>
              <Text mt={4}>{event.description}</Text>
            </Box>
          ))}
          <Stack direction="row" spacing={4} mt={4}>
            <Button onClick={() => handlePageChange(currentPage - 1)} isDisabled={currentPage === 1}>
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button key={index + 1} onClick={() => handlePageChange(index + 1)} isActive={currentPage === index + 1}>
                {index + 1}
              </Button>
            ))}
            <Button onClick={() => handlePageChange(currentPage + 1)} isDisabled={currentPage === totalPages}>
              Next
            </Button>
          </Stack>
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