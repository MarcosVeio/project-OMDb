import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LayoutWithApp } from "./Components/Layout/LayoutWithApp";
import { FavouritesProvider } from "./Context/favourites";
import { LoadingOutlined } from "@ant-design/icons";
const Homepage = lazy(() => import("./Pages/Homepage/Homepage"));
const Favourites = lazy(() => import("./Pages/Favourites/Favourites"));

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              backgroundColor: "#f0f2f",
            }}
          >
            <LoadingOutlined style={{ fontSize: 50 }} />
          </div>
        }
      >
        <FavouritesProvider initialState={[]}>
          <LayoutWithApp
            children={
              <Switch>
                <Route component={Homepage} exact path="/" />
                <Route component={Favourites} path="/favourites" />
              </Switch>
            }
          />
        </FavouritesProvider>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
