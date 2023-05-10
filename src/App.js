import { Home } from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { List } from "./pages/List/List";
import { Individual } from "./pages/List/Individual";
import { EditForm } from "./pages/Form/EditForm";
import { Fragment } from "react";
import Protected from "./components/HOCs/Protected";
import Login from "./pages/Authentication/Login";
import CheckToken from "./components/HOCs/CheckToken";
import FormHook from "./pages/Form/FormHook";
import { GlobalProvider } from "./context/GlobalContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalProvider>
          <Fragment>
            <Routes>
              <Route element={<CheckToken />}>
                <Route index element={<Login />} />
              </Route>
              <Route element={<Protected />}>
                <Route path="/home" element={<Home />} />
                <Route path="/show" element={<List />} />
                <Route path="/transaction/:id" element={<Individual />} />
                <Route path="/add" element={<FormHook />} />
                <Route path="/edit/:id" element={<EditForm />} />
              </Route>
            </Routes>
          </Fragment>
        </GlobalProvider>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
