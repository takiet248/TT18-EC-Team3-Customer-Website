import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Footer } from "../components";
import { Header } from "../components/Header/Header";
import {
  Homepage,
  TutorProfile,
  SignUp,
  Login,
  PaymentInfo,
  PaymentMethod,
  OrderInfo,
  CourseProfile,
} from "../containers";
import { HeaderFooterLayout, OnlyHeaderLayout } from "../layouts";
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
        <PublicRouter
          exact={true}
          path={"/tutor/:uid"}
          component={TutorProfile}
          layout={OnlyHeaderLayout}
          header={Header}
          isHasHeader={true}
        />
        <PublicRouter
          exact={true}
          path={"/sign-up"}
          component={SignUp}
          layout={OnlyHeaderLayout}
          header={Header}
          isHasHeader={true}
        />
        <PublicRouter
          exact={true}
          path={"/login"}
          component={Login}
          layout={OnlyHeaderLayout}
          header={Header}
          isHasHeader={true}
        />
        <PublicRouter
          exact={true}
          path={"/payment-info"}
          component={PaymentInfo}
          layout={OnlyHeaderLayout}
          header={Header}
          isHasHeader={true}
        />
        <PublicRouter
          exact={true}
          path={"/payment-method"}
          component={PaymentMethod}
          layout={OnlyHeaderLayout}
          header={Header}
          isHasHeader={true}
        />
        <PublicRouter
          exact={true}
          path={"/order-info"}
          component={OrderInfo}
          layout={OnlyHeaderLayout}
          header={Header}
          isHasHeader={true}
        />
        <PublicRouter
          exact={true}
          path={"/course/:courseid"}
          component={CourseProfile}
          layout={OnlyHeaderLayout}
          header={Header}
          isHasHeader={true}
        />
      </Switch>
    </Router>
  );
};
