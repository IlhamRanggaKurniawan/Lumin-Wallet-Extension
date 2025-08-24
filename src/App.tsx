import { HashRouter, Route, Routes } from "react-router"
import Home from "./pages/Home"
import Setting from "./pages/Setting"
import Layout from "./Layout"


const App = () => {

  return (
     <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App