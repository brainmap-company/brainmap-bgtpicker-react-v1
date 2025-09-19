import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import BgtPicker from '../views/main';
import IsChangedRoute from './IsChangedRoute';

const Content = styled.div`
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
`;

function Router() {
    return (
        <BrowserRouter>
            <IsChangedRoute />
                <Switch>
                <Route exact path="/" component={BgtPicker} />
                <Route path="*">
                        <Content>
                        <h1>404 - Page Not Found</h1>
                        <p>The page you are looking for does not exist.</p>
                        </Content>
                </Route>
                </Switch>
        </BrowserRouter>
    );
}

export default Router;
