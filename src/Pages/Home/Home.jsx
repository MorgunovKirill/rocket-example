import React, { useState, useContext, useEffect } from "react";
import { useWindowSize } from "react-use";

import { Context } from "../../StateManagement/AppState";
import GridControls from "../../Components/GridControls/GridControls";
import PostsView from "../../Components/PostsView/PostsView";
import { LoadigIndicator } from "../../assets/svgs";
import LoadMoreButton from "../../Components/LoadMoreButton/LoadMoreButton";

import "./Home.scss";

import gsap from "gsap";
import GridViewPlaceholder from "../../Components/GridViewPlaceholder/GridViewPlaceholder";

const Home = () => {
  const [listStyle, setListStyle] = useState(false);
  const { width } = useWindowSize();
  const context = useContext(Context);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    gsap.to(".loadingIndicator", {
      rotateZ: 360,
      repeat: -1,
      duration: 3,
    });
  }, []);

  useEffect(() => {
    if (width < 768) {
      setListStyle(true);
    }
  }, []);

  const handleListStyleChange = () => {
    setListStyle(!listStyle);
  };

  const loadAdditionalPosts = async () => {
    setLoadingMore(true);
    await context.fetchAdditionalPosts();
    setLoadingMore(false);
  };

  return (
    <div
      id="top"
      style={{
        minHeight: "120vh",
        paddingTop: "440px",
        scrollBehavior: "smooth",
      }}
    >
      <GridControls
        listStyle={listStyle}
        handleListStyleChange={handleListStyleChange}
      />
      <div style={{ minHeight: "120vh" }}>
        {context.loading ? (
          <GridViewPlaceholder />
        ) : (
          <PostsView listStyle={listStyle} posts={context.posts} />
        )}
        {context.additionalPosts
          ? context.additionalPosts.map((postsArray, i) => {
              return (
                <PostsView listStyle={listStyle} posts={postsArray} key={i} />
              );
            })
          : ""}
      </div>
      <div className="loadingIndicatorWrapper">
        {loadingMore ? (
          <div className="loadingIndicator">
            <LoadigIndicator />
          </div>
        ) : (
          <LoadMoreButton actionFunction={loadAdditionalPosts} />
        )}
      </div>
    </div>
  );
};

export default Home;
