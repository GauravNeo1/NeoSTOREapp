import React from 'react'
import { Suspense } from 'react';

import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registerstore from './components/Registerstore';
import Loginstore from './components/Loginstore';
import Frontpage from './components/Frontpage';
import RecoverPassword from './components/RecoverPassword';
import Profile from './components/Profile';
import CustAddress from './components/CustAddress';
import ChangePassword from './components/ChangePassword';
import EditProfile from './components/EditProfile';
import ProfileImage from './components/ProfileImage';
// import OpenPDF from './components/OpenPDF';
import Thankyou from './components/Thankyou';
// import Allproducts from './components/Allproducts';



import ProductDetails from './components/ProductDetails';
import Colorradio from './components/Colorradio';
import CategoryFilter from './components/CategoryFilter';
import SearchFilter from './components/SearchFilter';
import AddAddress from './components/AddAddress';
import EditAddress from './components/EditAddress';
import Main from './components/Main';
import ProfilePage from './components/ProfilePage';
import Home from './components/Home';
import Cart from './components/Cart';
import PlaceOrder from './components/PlaceOrder';
import Orders from './components/Orders';
import OrderInvoice from './components/OrderInvoice';
import MapContainer from './components/MapContainer';
import OrderPlaced from './components/OrderPlaced';
const Allproducts = React.lazy(() => import('./components/Allproducts'))

function App() {
  return (
    <div className="App">
      {/* <Router>
        <Routes>
        <Route path="/" element={<Frontpage />}>
            <Route path="/" element={<Registerstore/>}/>
            <Route path="/addaddress" element={<AddAddress />}/>
            <Route path="/editaddress/:id" element={<EditAddress />}/>
            <Route path="/search" element={<SearchFilter />}/>
            <Route path="/colorradio" element={<Colorradio />}/>
            <Route path="/cat" element={<CategoryFilter />}/>
            <Route path="/allproduct" element={<Allproducts/>}/>
            <Route path="/productdetails/:id" element={<ProductDetails/>}/>
            <Route path="/signup" element={<Registerstore/>}/>
            <Route path="/signin" element={<Loginstore/>}/>
            <Route path="/recoverpassword" element={<RecoverPassword/>}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/profileimage" element={<ProfileImage />}/>
            <Route path="/editprofile" element={<EditProfile />}/>
            <Route path="/custaddress" element={<CustAddress />}/>
            <Route path="/changepassword" element={<ChangePassword />}/>
            <Route path="/openpdf" element={<OpenPDF />}/>
            <Route path="/thankyou" element={<Thankyou />}/>
          </Route>
         
        </Routes>
      </Router> */}

      <Suspense fallback={<div><h1>Loading...</h1></div>}>
        <Router>
          <Routes>
            <Route path="/mapcontainer" element={<MapContainer />} />

            <Route path="/" element={<Main />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/orderplaced" element={<OrderPlaced />} />
              <Route path="/orderinvoice/:id" element={<OrderInvoice />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/placeorder" element={<PlaceOrder />} />
              <Route path="/search" element={<SearchFilter />} />
              <Route path="/colorradio" element={<Colorradio />} />
              <Route path="/cat" element={<CategoryFilter />} />
              <Route path="/allproduct" element={<Allproducts />} />
              <Route path="/productdetails/:id" element={<ProductDetails />} />
              <Route path="/signup" element={<Registerstore />} />
              <Route path="/signin" element={<Loginstore />} />
              <Route path="/recoverpassword" element={<RecoverPassword />} />

              {/* <Route path="/openpdf" element={<OpenPDF />} /> */}
              <Route path="/thankyou" element={<Thankyou />} />


              <Route path="/profile" element={<Profile />} />
              <Route path="/profileimage" element={<ProfileImage />} />

              {/* <Route path="/editprofile" element={<EditProfile />} /> */}
              <Route path="/custaddress" element={<CustAddress />} />
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/addaddress" element={<AddAddress />} />
              <Route path="/editaddress/:id" element={<EditAddress />} />



              <Route path="/profilepage" element={<ProfilePage />}>
                <Route path="/profilepage" element={<Profile />} />

                <Route path="/profilepage/profile" element={<Profile />} />
                <Route path="/profilepage/orderinvoice/:id" element={<OrderInvoice />} />

                <Route path="/profilepage/profile/editprofile" element={<EditProfile />} />
                <Route path="/profilepage/custaddress" element={<CustAddress />} />
                <Route path="/profilepage/orders" element={<Orders />} />
                <Route path="/profilepage/changepassword" element={<ChangePassword />} />
                <Route path="/profilepage/addaddress" element={<AddAddress />} />
                <Route path="/profilepage/editaddress/:id" element={<EditAddress />} />
              </Route>
            </Route>

          </Routes>
        </Router>
      </Suspense>

      {/* <Loginstore /> */}

    </div>
  );
}

export default App;
