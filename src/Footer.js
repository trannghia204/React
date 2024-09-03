import logo from './images/logo21.png';
function Footer() {
    return (
        <div className="Footer">
            <div class="container">
                <div class="row row-ft">
                    <div class="col-md-4 text-center text-md-left mb-3 mb-md-0">
                        <img src={logo} alt="Logo" class="logofooter" />
                    </div>

                    <div class="col-md-4 text-center mb-3 mb-md-0 mt-4">
                        <h5>Liên hệ</h5>
                        <ul class="list-unstyled">
                            <li>Email: huunghia@gmail.com</li>
                            <li>Phone: +123 456 7890</li>
                            <li>Address: 123 Q12 St, HCM City, VIETNAM Country</li>
                        </ul>
                    </div>
                    <div class="col-md-4 text-center text-md-right mt-4">
                        <h5>Về chúng tôi</h5>
                        <p>Laptop giá siêu rẻ của HUUNGHIA.</p>
                        <div>
                            <a href="#" class="text-light mx-2"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="text-light mx-2"><i class="fab fa-twitter"></i></a>
                            <a href="#" class="text-light mx-2"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="text-light mx-2"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Footer;