import React, { Component } from 'react';

class PreLoader extends Component {
    render() {
        if (this.props.loading) {
            return (
                <div className={`se-modal-overlay full-height${this.props.role === 'customer' ? ' deep-orange darken-1' : ' lime darken-1' }`}>
                    <div className="se-spinner-wrapper center-align">
                        <div className="preloader-wrapper big active">
                            <div className="spinner-layer spinner-blue-only">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (null);
        }
    }
}

export default PreLoader;
