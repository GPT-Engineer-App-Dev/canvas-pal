import { useParams } from "react-router-dom";
import { Box, Container, Heading, Text, VStack, Spinner, Alert, AlertIcon, Input, Button } from "@chakra-ui/react";
import { useEvent, useComments, useAddComment } from "../integrations/supabase/index.js";
import { useState } from "react";

const EventPage = () => {
  const { eventId } = useParams();
  const { data: event, error: eventError, isLoading: eventLoading } = useEvent(eventId);
  const { data: comments, error: commentsError, isLoading: commentsLoading } = useComments(eventId);
  const addCommentMutation = useAddComment();
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    addCommentMutation.mutate({ content: newComment, event_id: eventId });
    setNewComment("");
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      {eventLoading ? (
        <Spinner />
      ) : eventError ? (
        <Alert status="error">
          <AlertIcon />
          {eventError.message}
        </Alert>
      ) : (
        <VStack spacing={4} align="start">
          <Heading>{event.name}</Heading>
          <Text>{event.date}</Text>
          <Text>{event.description}</Text>
        </VStack>
      )}

      <Box mt={8} w="100%">
        <Heading size="md" mb={4}>Comments</Heading>
        {commentsLoading ? (
          <Spinner />
        ) : commentsError ? (
          <Alert status="error">
            <AlertIcon />
            {commentsError.message}
          </Alert>
        ) : (
          <VStack spacing={4} align="start">
            {comments.map(comment => (
              <Box key={comment.id} p={4} shadow="md" borderWidth="1px" w="100%">
                <Text>{comment.content}</Text>
              </Box>
            ))}
          </VStack>
        )}
      </Box>

      <Box mt={8} w="100%">
        <Heading size="md" mb={4}>Add a Comment</Heading>
        <Input
          placeholder="Your comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          mb={4}
        />
        <Button onClick={handleAddComment}>Submit</Button>
      </Box>
    </Container>
  );
};

export default EventPage;