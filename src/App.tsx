import { HashRouter, Route, Routes } from "react-router"
import Home from "./pages/Home"
import Setting from "./pages/Setting"
import Verify from "./pages/password/Verify"
import Update from "./pages/password/Update"
import Warning from "./pages/phrase/Warning"
import Phrase from "./pages/phrase/Phrase"
import Onboarding from "./pages/Onboarding"
import NewWallet from "./pages/auth/NewWallet"
import Import from "./pages/auth/Import"
import { GuestLayout, PrivateLayout } from "./Layout"
import { ThemeProvider } from "./components/theme-provider"


const App = () => {

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <HashRouter>
        <Routes>
          <Route path="/" element={<PrivateLayout />}>
            <Route index element={<Home />} />
            <Route path="setting" element={<Setting />} />
            <Route path="setting/password" element={<Verify />} />
            <Route path="setting/password/update" element={<Update />} />
            <Route path="setting/phrase/warning" element={<Warning />} />
            <Route path="setting/phrase" element={<Phrase />} />
          </Route>

          <Route path="/onboarding" element={<GuestLayout />}>
            <Route index element={<Onboarding />} />
            <Route path="create" element={<NewWallet />} />
            <Route path="import" element={<Import />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App