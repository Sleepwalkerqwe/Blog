import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { FullPost } from "./pages/FullPost";
import { Registration } from "./pages/Registration";
import { AddPost } from "./pages/AddPost";
import { Login } from "./pages/Login";
import { fetchAuthMe } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
