import React from 'react';

class CamOn extends React.Component {
    render() {
        document.title = "Cảm ơn đã mua hàng <3";
        return (
            <div id='camon'>
                <div className='camon'>
                    <h1>Cảm ơn đã mua hàng!</h1>
                    <p>Chúng tôi sẽ liên lạc với bạn qua email để xác nhận đơn hàng và giao hàng cho bạn.</p>
                    <p>Xin cảm ơn!</p>
                </div>
            </div>
        );
    }
}
export default CamOn;