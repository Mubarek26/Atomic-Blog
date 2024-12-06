import { useContext, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { PostProviders, usePosts } from "./postContext";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function App() {
  const [isFakeDark, setIsFakeDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isFakeDark);
  }, [isFakeDark]);

  return (
    <PostProviders>
      <div
        className={`min-h-screen ${
          isFakeDark
            ? "dark bg-gray-900 text-white"
            : "bg-gray-100 text-gray-900"
        } p-2`}
      >
        <Header />
        <Main />
        <Archive />
        <Footer />
      </div>
    </PostProviders>
  );
}

function Header() {
  const { onClearPosts } = usePosts();
  return (
    <header className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">⚛️ The Atomic Blog</h1>
      <div className="space-x-4">
        <Results />
        <SearchPosts />
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 my-3 rounded"
          onClick={onClearPosts}
        >
          Clear posts
        </button>
      </div>
    </header>
  );
}

function SearchPosts() {
  const { searchQuery, setSearchQuery } = usePosts();
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
      className="border rounded-lg py-1 px-3"
    />
  );
}

function Results() {
  const { posts } = usePosts();
  return <p className="font-semibold">🚀 {posts.length} atomic posts found</p>;
}

function Main() {
  return (
    <main className="grid md:grid-cols-2 gap-6 my-8">
      <FormAddPost />
      <Posts />
    </main>
  );
}

function FormAddPost() {
  const { onAddPost } = usePosts();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!body || !title) return;
    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white shadow-md rounded-lg"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        className="w-full border rounded-lg py-2 px-3"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
        className="w-full border rounded-lg py-2 px-3"
      />
      <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
        Add post
      </button>
    </form>
  );
}

function Posts() {
  const { posts } = usePosts();
  return (
    <section>
      <ul className="space-y-4">
        {posts.map((post, i) => (
          <li key={i} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="font-bold text-lg">{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Archive() {
  const { onAddPost } = usePosts();
  const [posts] = useState(() =>
    Array.from({ length: 10 }, () => createRandomPost())
  );
  const [showArchive, setShowArchive] = useState(false);

  return (
    <aside className="my-8">
      <h2 className="text-xl font-semibold mb-4">Post archive</h2>
      <button
        onClick={() => setShowArchive((s) => !s)}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4"
      >
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>
      {showArchive && (
        <ul className="space-y-4">
          {posts.map((post, i) => (
            <li key={i} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button
                onClick={() => onAddPost(post)}
                className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded mt-2"
              >
                Add as new post
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function Footer() {
  return (
    <footer className="text-center py-4 text-gray-600">
      &copy; 2024 The Atomic Blog ✌️
    </footer>
  );
}

export default App;
