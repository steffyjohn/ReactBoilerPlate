import React from 'react';
import { PageLoaderStyle } from './PageLoaderStyle';

const PageLoader = () => (
    <PageLoaderStyle>
        <em className="fa fa-circle-o-notch fa-spin"></em>
    </PageLoaderStyle>
);

export default PageLoader;
