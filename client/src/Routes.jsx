import React from 'react'
import { routesMap, protectedRoutesMap } from './routesMap'
import { Route, Routes as Switch } from 'react-router-dom';
import Layout from './components/Layouts/Layout/Layout';
import ProtectedLayout from './components/Layouts/ProtectedLayout/ProtectedLayout';

const routeObj = Object.values(routesMap);
const protectedRouteObj = Object.values(protectedRoutesMap);

const Routes = () => {
    return (
        <Switch>
            <Route path='/' element={<Layout />}>
                {routeObj.map((route, idx) => {
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<route.component />}
                        />
                    )
                })}
            </Route>
            <Route path='/' element={<ProtectedLayout />}>
                {protectedRouteObj.map((route, idx) => {
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<route.component />}
                        />
                    )
                })}
            </Route>
        </Switch>
    )
}

export default Routes