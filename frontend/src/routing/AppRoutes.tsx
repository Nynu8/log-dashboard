import { Route, Switch } from 'react-router-dom';
import { Dashboard } from 'app/dashboard/Dashboard';

import { AppRoute } from './AppRoute.enum';

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path={AppRoute.home} component={Dashboard} />
      <Route path={AppRoute.dashboard} component={Dashboard} />
    </Switch>
  );
};
