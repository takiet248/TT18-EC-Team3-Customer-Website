import React from "react";
import { Route } from "react-router-dom";

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
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   batch(() => {
  //     dispatch(doGetUserInfo())
  //       .then(unwrapResult)
  //       .then((res: any) => {
  //         if (res) {
  //           const userid = res._id;
  //           window.localStorage.setItem(EUser.userid, userid);
  //         }
  //       });
  //   }); // eslint-disable-next-line
  // }, []);
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
