import { useState } from "react";
import { Box, Container, Heading, VStack, Spinner, Alert, AlertIcon, Input, Button, Table, Tbody, Td, Th, Thead, Tr, IconButton } from "@chakra-ui/react";
import { useVenues, useAddVenue, useDeleteVenue, useUpdateVenue } from "../integrations/supabase/index.js";
import { FaEdit, FaTrash } from "react-icons/fa";

const VenuesPage = () => {
  const { data: venues, error, isLoading } = useVenues();
  const addVenueMutation = useAddVenue();
  const deleteVenueMutation = useDeleteVenue();
  const updateVenueMutation = useUpdateVenue();
  const [newVenue, setNewVenue] = useState({ name: "", location: "", description: "" });
  const [editingVenue, setEditingVenue] = useState(null);

  const handleAddVenue = () => {
    addVenueMutation.mutate(newVenue, {
      onError: (error) => {
        console.error("Error adding venue:", error);
      },
      onSuccess: () => {
        setNewVenue({ name: "", location: "", description: "" });
      },
    });
  };

  const handleDeleteVenue = (id) => {
    deleteVenueMutation.mutate(id, {
      onError: (error) => {
        console.error("Error deleting venue:", error);
      },
    });
  };

  const handleUpdateVenue = () => {
    if (editingVenue) {
      updateVenueMutation.mutate(editingVenue, {
        onError: (error) => {
          console.error("Error updating venue:", error);
        },
        onSuccess: () => {
          setEditingVenue(null);
        },
      });
    }
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <Heading mb={4}>Venues</Heading>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      ) : (
        <VStack spacing={4} align="start" w="100%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Location</Th>
                <Th>Description</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {venues.map((venue) => (
                <Tr key={venue.id}>
                  <Td>{venue.name}</Td>
                  <Td>{venue.location}</Td>
                  <Td>{venue.description}</Td>
                  <Td>
                    <IconButton
                      icon={<FaEdit />}
                      onClick={() => setEditingVenue(venue)}
                      mr={2}
                    />
                    <IconButton
                      icon={<FaTrash />}
                      onClick={() => handleDeleteVenue(venue.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {editingVenue && (
            <Box w="100%">
              <Heading size="md" mb={4}>Edit Venue</Heading>
              <Input
                placeholder="Name"
                value={editingVenue.name}
                onChange={(e) => setEditingVenue({ ...editingVenue, name: e.target.value })}
                mb={2}
              />
              <Input
                placeholder="Location"
                value={editingVenue.location}
                onChange={(e) => setEditingVenue({ ...editingVenue, location: e.target.value })}
                mb={2}
              />
              <Input
                placeholder="Description"
                value={editingVenue.description}
                onChange={(e) => setEditingVenue({ ...editingVenue, description: e.target.value })}
                mb={2}
              />
              <Button onClick={handleUpdateVenue}>Update Venue</Button>
            </Box>
          )}
          <Box w="100%">
            <Heading size="md" mb={4}>Add New Venue</Heading>
            <Input
              placeholder="Name"
              value={newVenue.name}
              onChange={(e) => setNewVenue({ ...newVenue, name: e.target.value })}
              mb={2}
            />
            <Input
              placeholder="Location"
              value={newVenue.location}
              onChange={(e) => setNewVenue({ ...newVenue, location: e.target.value })}
              mb={2}
            />
            <Input
              placeholder="Description"
              value={newVenue.description}
              onChange={(e) => setNewVenue({ ...newVenue, description: e.target.value })}
              mb={2}
            />
            <Button onClick={handleAddVenue}>Add Venue</Button>
          </Box>
        </VStack>
      )}
    </Container>
  );
};

export default VenuesPage;