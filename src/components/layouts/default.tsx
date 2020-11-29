import React, { FunctionComponent } from 'react';

const DefaultLayout: FunctionComponent = ({ children }) => (
    <div className="default-container">
        { children }
    </div>
);

export default DefaultLayout;
