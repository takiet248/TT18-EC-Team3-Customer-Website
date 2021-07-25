import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Homepage } from "../containers";
import { isAuth } from "../helpers";

export const PublicRouter: React.FC<IPublicRouter> = ({
  component: Component,
  layout: Layout,
  exact,
  path,
  header: Header,
  footer: Footer,
  isHasFooter,
  isHasHeader,
}) => {
  return (
    <Route
      // render={() => (isAuth() ? <Redirect to="/login" /> : <Homepage />)}
      exact={exact}
      path={path}
      render={(props) => {
        
        return (
          <Layout
            header={isHasHeader ? <Header /> : <></>}
            footer={isHasFooter ? <Footer /> : <></>}
          >
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};
