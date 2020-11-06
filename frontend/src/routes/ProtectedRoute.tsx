import React, { FC, useEffect, useState } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { isAuth } from '../api/auth';

const ProtectedRoute: FC<RouteProps> = (props) => {
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!logout) {
        try {
          if (!(await isAuth())) {
            setLogout(true)
          }
        } catch {
          setLogout(true)
        }
      }
    }
    checkAuth();
  }, []);

  if (logout) {
    const renderComponent = () => <Redirect to={{ pathname: "/login" }} />;
    return <Route {...props} component={renderComponent} render={undefined}/>;
  } else {
    return <Route {...props}/>;
  }
}

export default ProtectedRoute;