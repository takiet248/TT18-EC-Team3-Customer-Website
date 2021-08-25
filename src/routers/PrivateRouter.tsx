import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { batch } from "react-redux";
import { Route } from "react-router-dom";
import { EToken, EUser } from "../constants";
import { logout } from "../helpers";
import { doGetUserInfo } from "../redux";
import { useAppDispatch } from "../redux/store";

export const PrivateRouter: React.FC<IPublicRouter> = ({
  component: Component,
  layout: Layout,
  exact,
  path,
  header: Header,
  footer: Footer,
  isHasFooter,
  isHasHeader,
}) => {
  const dispatch = useAppDispatch();
  const tokenLogin = window.localStorage.getItem(EToken.accessToken);

  useEffect(() => {
    batch(() => {
      dispatch(doGetUserInfo())
        .then(unwrapResult)
        .then((res: any) => {
          if (res) {
            const userid = res._id;
            window.localStorage.setItem(EUser.userid, userid);
          }
        });
    }); // eslint-disable-next-line
  }, []);

  // let query = new URLSearchParams(useLocation().search).get('text');

  return (
    <Route
      // render={() => (isAuth() ? <Redirect to="/login" /> : <Homepage />)}
      exact={exact}
      path={path}
      render={(props) => {
        if (!tokenLogin) {
          logout();
        }
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
