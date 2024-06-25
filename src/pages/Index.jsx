import { Container, VStack, Heading, Text, Box, Image, Link, Button, useToast } from "@chakra-ui/react";
import { FaTwitter, FaGithub, FaLinkedin, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const updatedPosts = posts.filter((_, i) => i !== index);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      setPosts(updatedPosts);
      toast({
        title: "Post deleted.",
        description: "The post has been deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>Welcome to My Blog</Heading>
          <Text fontSize="lg">Sharing my thoughts and experiences on web development, technology, and life.</Text>
        </Box>
        <Box>
          <Image borderRadius="md" src="/images/blog-image.jpg" alt="Blog Image" />
        </Box>
        <Box textAlign="center">
          <Button as={RouterLink} to="/add-post" colorScheme="teal" size="lg">Add New Post</Button>
        </Box>
        <Box>
          <Heading as="h2" size="xl" mb={4}>Recent Posts</Heading>
          <VStack spacing={4} align="stretch">
            {posts.map((post, index) => (
              <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md" position="relative">
                <Heading fontSize="xl">{post.title}</Heading>
                <Text mt={4}>{post.content}</Text>
                <Button
                  position="absolute"
                  top="1rem"
                  right="1rem"
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(index)}
                >
                  <FaTrash />
                </Button>
              </Box>
            ))}
          </VStack>
        </Box>
        <Box textAlign="center">
          <Heading as="h2" size="xl" mb={4}>Follow Me</Heading>
          <VStack spacing={4}>
            <Link href="https://twitter.com" isExternal>
              <FaTwitter size="24px" />
            </Link>
            <Link href="https://github.com" isExternal>
              <FaGithub size="24px" />
            </Link>
            <Link href="https://linkedin.com" isExternal>
              <FaLinkedin size="24px" />
            </Link>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;