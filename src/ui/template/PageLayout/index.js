import React from 'react';

//Styles
import './pagelayout.css';

const PageLayout = ({PageComponent, SideBarComponent, pageId, layout}) => {
    switch (layout) {
        case 'withSidebar' :
            return class extends React.Component {
                render() {
                    return (
                        <div className="container">
                            <div id={pageId ? `${pageId}` : 'page'}>
                                <div className="left">
                                    <SideBarComponent page={pageId} {...this.props}/>
                                </div>
                                <div className="right">
                                    <PageComponent {...this.props}/>
                                </div>
                                <div className="fl_c" />
                            </div>
                        </div>
                    );
                }
            };
        default :
            return class extends React.Component {
                render() {
                    return (
                        <div id={pageId ? `${pageId}` : 'page'}>
                            <PageComponent {...this.props}/>
                        </div>
                    );
                }
            }
    }

};

export default PageLayout;