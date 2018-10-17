import React from 'react';

//Components
import SideBar from '../SideBar';

//Styles
import './pagelayout.css';

const PageLayout = ({PageComponent, pageProps, sideBarProps, pageId, layout}) => {

    switch (layout) {
        case 'withSidebar' :
            return class extends React.Component {
                render() {
                    return (
                        <div {id ? `id=${pageId}` : 'id=page'}>
                            <div className="left">
                                <SideBar page="home" {...sideBarProps}/>
                            </div>
                            <div className="right">
                                <PageComponent {...pageProps}/>
                            </div>
                        </div>
                    );
                }
            };
        default :
            return class extends React.Component {
                render() {
                    return (
                        <div {id ? `id=${pageId}` : 'id=page'}>
                            <PageComponent {...pageProps}/>
                        </div>
                    );
                }
            }
    }

};

export default PageLayout;