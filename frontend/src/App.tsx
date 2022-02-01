import { Providers } from './providers/Providers';
import { AppRoutes } from 'routing/AppRoutes';

function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}

export default App;
