import "../styles/globals.css";
import { wrapper } from "../app/store";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const MyApp = ({ Component, pageProps }) => {
  const store = useStore((state) => state);

  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <Component {...pageProps} />
    </PersistGate>
  );
};

export default wrapper.withRedux(MyApp);

/*
import { Provider } from "react-redux";
import { store } from "../app/store";
import "../styles/globals.css";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const MyApp = ({ Component, pageProps }) => {
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
*/
