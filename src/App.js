import React,{useState,createContext} from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import MessengerCustomerChat from "react-messenger-customer-chat";

import Navbar from "./components/shared/navbar";
import Footer from "./components/shared/footer";
import Main from "./containers/main";
import Shop from "./containers/shop";
import New from "./containers/newin";

import Dashboard from "./containers/dashboard";
import Artists from "./containers/artists";
import Search from "./containers/search";
import ArtistsDashboard from "./containers/artistsDashboard";
import ArtworksDashboard from "./containers/artworksDashboard";
import AccountDashboard from "./containers/accountDashboard";
import FavoritesDashboard from "./containers/favoritesDashboard";
import HistoryDashboard from "./containers/historyDashboard";
import Galleries from "./containers/galleries";
import Contact from "./containers/contact";
import Auctions from "./containers/auctions";
import Text from "./containers/text";
import ProductDet from "./containers/productDet";
import NotFound404 from "./components/shared/404";
import "./styles/index.scss";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Buy from "./containers/buy";
import Sell from "./containers/sell";
import ArtistsFull from "./containers/artistsFull";
import GalleriesFull from "./containers/galleriesFull";
import Cart from "./containers/cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userProvider } from "./store/store";
import Recomended from "./containers/recomendedArtworks";
import AddArtist from "./containers/addArtist";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";

import { getAddress } from "./services/dashboardService";
import Loading from "./containers/loading";
import Delivery from "./containers/delivery";
import AddAddress from "./containers/addAddress";
import ScrollToTopOnMount from "./components/shared/ScrollToTop";
import Approve from "./containers/approve";
import Forgot from "./containers/forgot";
import AllDashboard from "./containers/allDashboard";
import Terms from "./containers/terms";
import Pride from "./containers/pride";
import Nft from "./containers/nft";

import ArtistBio from "./containers/artist-bio";
import EditArtwork from "./containers/artwork";
import Collection from "./containers/collection";
import Curator from "./containers/curator";
import Organizations from "./containers/organizations";


export const AppContext = createContext(null)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
});

function App() {
  const { currentUser, setCurrentUser } = userProvider();
  const [showMenu, setShowMenu] = useState(false);
  const appData = {showMenu,setShowMenu}
  return (
    <AppContext.Provider value={appData}>
      {currentUser.isAuthenticated ? (
        <QueryClientProvider client={queryClient}>
          <ToastContainer />

          <BrowserRouter>
            <ScrollToTopOnMount></ScrollToTopOnMount>
            <Navbar />
            <Switch>
              <Route exact path="/" render={(props) => <Main {...props} />} />
              <Route
                exact
                path="/store"
                render={(props) => <Shop {...props} />}
              />
              <Route
                path="/special/:id"
                render={(props) => <Pride {...props} />}
              />
            
              <Route exact path="/new" render={(props) => <New {...props} />} />

              <Route
                exact
                path="/recomended"
                render={(props) => <Recomended {...props} />}
              />
               <Route
                exact
                path="/recomended/:id"
                render={(props) => <Recomended {...props} />}
              />

              <Route
                exact
                path="/collections/:id"
                render={(props) => <Collection {...props} />}
              />

              
              <Route
                exact
                path="/curator/:id"
                render={(props) => <Curator {...props} />}
              />
           

              <Route
                exact
                path="/dashboard"
                render={(props) => <Dashboard {...props} />}
              />
              <Route
                exact
                path="/artists"
                render={(props) => <Artists {...props} />}
              />
              <Route
                exact
                path="/search"
                render={(props) => <Search {...props} />}
              />
              <Route
                exact
                path="/cart"
                render={(props) => <Cart {...props} />}
              />
              <Route
                exact
                path="/delivery"
                render={(props) => <Delivery {...props} />}
              />
              <Route
                exact
                path="/artists/:index"
                render={(props) => <ArtistsFull {...props} />}
              />
              <Route exact path="/buy" render={(props) => <Buy {...props} />} />
              <Route
                exact
                path="/sell"
                render={(props) => <Sell {...props} />}
              />
              <Route
                exact
                path="/dashboard/artists"
                render={(props) => <ArtistsDashboard {...props} />}
              />
              <Route
                exact
                path="/dashboard/artworks"
                render={(props) => <ArtworksDashboard {...props} />}
              />
              <Route
                exact
                path="/dashboard/account"
                render={(props) => <AccountDashboard {...props} />}
              />
              <Route
                exact
                path="/dashboard/favorites"
                render={(props) => <FavoritesDashboard {...props} />}
              />
              <Route
                exact
                path="/dashboard/history"
                render={(props) => <HistoryDashboard {...props} />}
              />
              <Route
                exact
                path="/dashboard/allorders"
                render={(props) => <AllDashboard {...props} />}
              />
              <Route
                exact
                path="/dashboard/addartist"
                render={(props) => <AddArtist {...props} />}
              />
              <Route
                exact
                path="/dashboard/editaddress/:id"
                render={(props) => <AddAddress {...props} />}
              />
              <Route
                exact
                path="/dashboard/addaddress"
                render={(props) => <AddAddress {...props} />}
              />
              <Route
                exact
                path="/dashboard/addartwork"
                render={(props) => <EditArtwork {...props} />}
              />
              <Route
                exact
                path="/dashboard/addartworkpride"
                render={(props) => <EditArtwork {...props} />}
              />
              <Route
                exact
                path="/dashboard/editartwork/:id"
                render={(props) => <EditArtwork {...props} />}
              />
              <Route
                exact
                path="/dashboard/artist-bio"
                render={(props) => <ArtistBio {...props} />}
              />
              <Route
                exact
                path="/galleries"
                render={(props) => <Galleries {...props} />}
              />
              <Route
                exact
                path="/galleries/:index"
                render={(props) => <GalleriesFull {...props} />}
              />
          
              <Route
                exact
                path="/auctions"
                render={(props) => <Auctions {...props} />}
              />
              <Route
                exact
                path="/contact"
                render={(props) => <Contact {...props} />}
              />
              <Route
                exact
                path="/terms"
                render={(props) => <Terms {...props} />}
              />
              <Route
                exact
                path="/organizations"
                render={(props) => <Organizations {...props} />}
              />
              <Route
                exact
                path="/text"
                render={(props) => <Text {...props} />}
              />
              <Route
                exact
                path="/store/:index"
                render={(props) => <ProductDet {...props} />}
              />
              <Route render={(props) => <NotFound404 />} />
            </Switch>

            <Footer />
          </BrowserRouter>
        </QueryClientProvider>
      ) : (
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <BrowserRouter>
            <ScrollToTopOnMount></ScrollToTopOnMount>
            <Navbar />
            <Switch>
              <Route exact path="/" render={(props) => <Main {...props} />} />
              <Route
                exact
                path="/store"
                render={(props) => <Shop {...props} />}
              />
              <Route
                path="/special/:id"
                render={(props) => <Pride {...props} />}
              />
        
          <Route
                path="/nft"
                render={(props) => <Nft {...props} />}
              />

              <Route exact path="/new" render={(props) => <New {...props} />} />

              <Route
                exact
                path="/recomended"
                render={(props) => <Recomended {...props} />}
              />

              <Route
                exact
                path="/collections/:id"
                render={(props) => <Collection {...props} />}
              />
              <Route
                exact
                path="/curator/:id"
                render={(props) => <Curator {...props} />}
              />
          

              <Route
                exact
                path="/search"
                render={(props) => <Search {...props} />}
              />
              <Route
                exact
                path="/dashboard"
                render={(props) => <Dashboard {...props} />}
              />
              <Route
                exact
                path="/forgot"
                render={(props) => <Forgot {...props} />}
              />
              <Route
                exact
                path="/approveemail"
                render={(props) => <Approve {...props} />}
              />
              <Route
                exact
                path="/artists"
                render={(props) => <Artists {...props} />}
              />
              <Route
                exact
                path="/delivery"
                render={(props) => <Delivery {...props} />}
              />

              <Route
                exact
                path="/artists/:index"
                render={(props) => <ArtistsFull {...props} />}
              />
              <Route exact path="/buy" render={(props) => <Buy {...props} />} />
              <Route
                exact
                path="/sell"
                render={(props) => <Sell {...props} />}
              />

              <Route
                exact
                path="/galleries"
                render={(props) => <Galleries {...props} />}
              />
              <Route
                exact
                path="/galleries/:index"
                render={(props) => <GalleriesFull {...props} />}
              />
            
              <Route
                exact
                path="/auctions"
                render={(props) => <Auctions {...props} />}
              />
              <Route
                exact
                path="/contact"
                render={(props) => <Contact {...props} />}
              />
              <Route
                exact
                path="/terms"
                render={(props) => <Terms {...props} />}
              />
              <Route
                exact
                path="/organizations"
                render={(props) => <Organizations {...props} />}
              />
              <Route
                exact
                path="/text"
                render={(props) => <Text {...props} />}
              />
              <Route
                exact
                path="/store/:index"
                render={(props) => <ProductDet {...props} />}
              />
              <Route render={(props) => <NotFound404 />} />
            </Switch>

            <Footer />
          </BrowserRouter>
        </QueryClientProvider>
      )}
      <MessengerCustomerChat
        pageId="104344138618959"
        appId="248790890527668"
        themeColor="#000000"
      />
 </AppContext.Provider>
  );
}

export default App;
