import Layout from "./components/layout";
import Balance from "./components/Balance";
import Form from "./components/Form";
import Transactions from "./components/Transactions/Transactions";


function App() {
  return (
    <Layout>
      <Balance/>
      <Form/>
      <Transactions/>
    </Layout>
  );
}

export default App;
