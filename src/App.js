import { Form } from "./Pages/Form/Form";
import { Home } from "./Pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { List } from "./Pages/List/List";
import { Individual } from "./Pages/List/Individual";
import { EditForm } from "./Pages/Form/EditForm";
import { Fragment } from "react";
import Protected from "./components/Protected";
import Login from "./Pages/Authentication/Login";
import CheckToken from "./components/CheckToken";
import { Learning } from "./components/Learning";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route element={<CheckToken />}>
            <Route index element={<Login />} />
            </Route>
            <Route element={<Protected />}>
              <Route path="/home" element={<Home />} />
              <Route path="/show" element={<List />} />
              <Route path="/transaction/:id" element={<Individual />} />
              <Route path="/add" element={<Form />} />
              <Route path="/edit/:id" element={<EditForm />} />
            </Route>
          <Route path="/learn" element={<Learning />} />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </div>
  );
}

export default App;
