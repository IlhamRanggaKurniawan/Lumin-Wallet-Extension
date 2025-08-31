import { HashRouter, Route, Routes } from "react-router"
import { ThemeProvider } from "./components/theme-provider"
import { Layout } from "./Layout"
import Home from "./pages/Home"
import Setting from "./pages/setting/Setting"
import Verify from "./pages/setting/password/Verify"
import Update from "./pages/setting/password/Update"
import Warning from "./pages/setting/phrase/Warning"
import Phrase from "./pages/setting/phrase/Phrase"
import Onboarding from "./pages/Onboarding"
import NewWallet from "./pages/auth/NewWallet"
import Import from "./pages/auth/Import"
import Login from "./pages/auth/Login"


const App = () => {

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="setting" element={<Setting />} />
            <Route path="setting/password" element={<Verify />} />
            <Route path="setting/password/update" element={<Update />} />
            <Route path="setting/phrase/warning" element={<Warning />} />
            <Route path="setting/phrase" element={<Phrase />} />
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="onboarding/create" element={<NewWallet />} />
            <Route path="onboarding/import" element={<Import />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App