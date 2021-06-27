import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Footer } from "../components";
import { Header } from "../components/Header/Header";
import { Homepage } from "../containers";
import { HeaderFooterLayout } from "../layouts";
import { PublicRouter } from "./PublicRouter";

// import { PrivateRouter } from './PrivateRouter';

export const Routers = () => {
  return (
    <Router>
      <Switch>
        <PublicRouter
          exact={true}
          path={"/"}
          component={Homepage}
          layout={HeaderFooterLayout}
          header={Header}
          isHasHeader={true}
          footer={Footer}
          isHasFooter={true}
        />
      </Switch>
    </Router>
  );
};
