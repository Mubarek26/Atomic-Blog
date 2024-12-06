import React, { createContext, useContext, useState } from "react";
import { faker } from "@faker-js/faker";
// Create a Context
const postContext = createContext();

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}
function PostProviders({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 10 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isFakeDark, setIsFakeDark] = useState(false);

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <postContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
        isFakeDark,
        setIsFakeDark,
      }}
    >
      {children}
    </postContext.Provider>
  );
}
function usePosts() {
  const context = useContext(postContext);
  if (context == undefined) throw Error("postContext is undefined");

  return context;
}
export { PostProviders, usePosts };