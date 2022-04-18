import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Test from '../Test/Test';
import ProposalView from '../ProposalView/ProposalView';
import OpportunityListView from '../OpportunityListView/OpportunityListView';
import OpportunityView from '../OpportunityView/OpportunityView';

import AdminProtectedRoute from '../ProtectedRoute/AdminProtectedRoute';
import AdminView from '../AdminView/AdminView';

// import './App.css';
import './App2.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#D0441C',
        contrastText: '#fff',
      },
      secondary: {
        main: '#E87655',
        contrastText: '#fff',
      },
    },
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'FETCH_CONTACT_LIST' });
    dispatch({ type: 'FETCH_PROPOSAL_LIST' });
    dispatch({
      type: 'FETCH_PROPOSAL',
      payload: { opportunity_id: 1, id: 30 },
    });
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <div id='app-container'>
            <div>
              <Nav />
            </div>
            <div>
              <div className='content-holder'>
                <Switch>
                  {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
                  <Redirect exact from='/' to='/home' />

                  {/* TEST ROUTE ------------------------------------------------------------------------ */}
                  <Route exact path='/test'>
                    <Test />
                  </Route>
                  {/* TEST ROUTE ------------------------------------------------------------------------ */}

                  {/* Visiting localhost:3000/about will show the about page. */}
                  <Route
                    // shows AboutPage at all times (logged in or not)
                    exact
                    path='/about'
                  >
                    <AboutPage />
                  </Route>

                  {/* The admin protected route is only shown if the user has an admin level above 2 */}
                  <AdminProtectedRoute exact path='/admin'>
                    <AdminView />
                  </AdminProtectedRoute>

                  {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
                  <ProtectedRoute
                    // logged in shows UserPage else shows LoginPage
                    exact
                    path='/user'
                  >
                    <UserPage />
                  </ProtectedRoute>

                  <ProtectedRoute
                    // logged in shows InfoPage else shows LoginPage
                    exact
                    path='/info'
                  >
                    <InfoPage />
                  </ProtectedRoute>

                  {/* Custom Routes ---------------------------------------------------------------------------------------------------- */}
                  <ProtectedRoute
                    // shows proposal view if the user is logged in
                    exact
                    path='/proposal/:id'
                  >
                    <ProposalView />
                  </ProtectedRoute>

                  <ProtectedRoute
                    // the opportunity route shows a single opportunity
                    exact
                    path='/opportunity/:id'
                  >
                    <OpportunityView />
                  </ProtectedRoute>

                  <ProtectedRoute exact path='/home'>
                    <OpportunityListView />
                  </ProtectedRoute>
                  {/* Custom Routes ---------------------------------------------------------------------------------------------------- */}

                  <Route exact path='/login'>
                    {user.id ? (
                      // If the user is already logged in,
                      // redirect to the /user page
                      <Redirect to='/home' />
                    ) : (
                      // Otherwise, show the login page
                      <LoginPage />
                    )}
                  </Route>

                  <Route exact path='/registration'>
                    {user.id ? (
                      // If the user is already logged in,
                      // redirect them to the /user page
                      <Redirect to='/home' />
                    ) : (
                      // Otherwise, show the registration page
                      <RegisterPage />
                    )}
                  </Route>

                  <Route exact path='/home'>
                    {user.id ? (
                      // If the user is already logged in,
                      // redirect them to the /user page
                      <Redirect to='/home' />
                    ) : (
                      // Otherwise, show the Landing page
                      <LandingPage />
                    )}
                  </Route>

                  {/* If none of the other routes matched, we will show a 404. */}
                  <Route>
                    <h1>404</h1>
                  </Route>
                </Switch>
              </div>
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
