import React from "react";
import { BrowserRouter, Redirect, Route, Switch, useLocation } from "react-router-dom";
import Home from "../Home";
import Header from "./Header";

const DefaultLayout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

function Layout() {
  return (
    <BrowserRouter>
      <Switch>
        <RouteWrapper exact={true} path="/" component={Home} layout={DefaultLayout} />
      </Switch>
    </BrowserRouter>
  );
}

function RouteWrapper({ component: Component, layout: Layout, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout {...props}>
          <Component {...props} />{" "}
        </Layout>
      )}
    />
  );
}
export default Layout;
