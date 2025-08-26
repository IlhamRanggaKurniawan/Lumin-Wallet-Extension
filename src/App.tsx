import { HashRouter, Route, Routes } from "react-router"
import Home from "./pages/Home"
import Setting from "./pages/Setting"
import Layout from "./Layout"
import Verify from "./pages/password/Verify"
import Update from "./pages/password/Update"
import Warning from "./pages/phrase/Warning"
import Phrase from "./pages/phrase/Phrase"
import NewWallet from "./pages/auth/NewWallet"


const App = () => {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="setting" element={<Setting />} />
          <Route path="setting/password" element={<Verify />} />
          <Route path="setting/password/update" element={<Update />} />
          <Route path="setting/phrase/warning" element={<Warning />} />
          <Route path="setting/phrase" element={<Phrase />} />
          <Route path="/register" element={<NewWallet />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App