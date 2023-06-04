import { withProviders } from './provicers';
import { Routing } from 'pages';
import './index.scss';

function App() {
   return <Routing />;
}

export default withProviders(App);
