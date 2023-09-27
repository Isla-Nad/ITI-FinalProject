import CommentanRating from '../DoctorProfile/CommentandRating'
import "./Doctor_Profile.css";


function DentistProfile(){
    return(
        <>
                <div className="container" style={{ flex: "1 0 auto" }}>
                    <div className="row">
                        <div className="col-lg-3 m-4 position-fixed" id="sidebar">
                            <img className="img-responsive profile-img margin-bottom-20" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt=""/>
                            <ul className="list-group-item list-group-item-action sidebar-nav-v1 mb-4" id="sidebar-nav-1">
                                <li className="list-group-item active">
                                    <a href="#profile"><i className="fa fa-bar-chart-o"></i> Profile</a>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                    <a href="#About"><i className="fa fa-user"></i> About Dentist</a>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                    <a href="#Certificates"><i className="fa fa-group"></i> Certificates</a>
                                </li>                                        
                                <li className="list-group-item list-group-item-action">
                                    <a href="#Cases"><i className="fa fa-cubes"></i>Cases </a>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                    <a href="#Contacts"><i className="fa fa-comments"></i> Contacts </a>
                                </li>                                        
                                <li className="list-group-item list-group-item-action">
                                    <a href="#Rate"><i className="fa fa-history"></i> Ratings & Reviews </a>
                                </li>                                       
                            </ul>   
                        </div>
                        <div className="col-lg-8 mt-5" style={{margin:"25rem"}}>
                            <div data-bs-spy="scroll" data-bs-target="#sidebar-nav-1" data-bs-smooth-scroll="true" className="scrollspy-example" tabindex="0">
                                        <div id="profile">
                                            <h2 className="text-primary">My Profile</h2>
                                            <hr/>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque turpis eu molestie molestie. 
                                                Integer tristique quam facilisis urna sagittis pulvinar. Nunc lacinia faucibus nisl, vel sodales elit lobortis nec.
                                                Vivamus et odio vel justo dignissim semper. Integer sit amet vehicula est, pellentesque elementum ex. Lorem ipsum dolor sit amet, 
                                                consectetur adipiscing elit. Maecenas a felis eros. Nunc ultricies odio a urna pharetra molestie. Duis vitae arcu nulla. Morbi 
                                                rhoncus felis non tellus mollis, vel porttitor ante tincidunt. Sed vulputate volutpat fringilla. Sed varius, magna id eleifend rutrum,
                                                velit odio sagittis leo, sit amet egestas orci dui vel ex. Phasellus dapibus tempor orci eget semper.

                                                Mauris tincidunt dolor nec ipsum eleifend ullamcorper. Donec sed commodo lorem. Vestibulum finibus quam quis urna venenatis pharetra. 
                                                Ut suscipit velit sit amet turpis convallis consectetur. Praesent tristique vulputate venenatis. Nam vehicula laoreet elit, eget lacinia 
                                                sapien dignissim non. Nullam in egestas tortor. Vestibulum sit amet elit bibendum odio congue fermentum. Sed volutpat ultricies magna, 
                                                facilisis pharetra sapien luctus id. In id maximus nibh. Morbi pulvinar sodales urna, et posuere est vulputate ac. Suspendisse facilisis, 
                                                lacus non placerat mollis, lectus nisi condimentum mi, imperdiet ultrices mi risus vel sapien. Donec sed ligula non massa congue malesuada.
                                            </p>
                                        </div>
                                        <div id="About" className="mt-5">
                                            <h2 className="text-primary">About The Dentist</h2>
                                       
                                            <hr/>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque turpis eu molestie molestie. 
                                                Integer tristique quam facilisis urna sagittis pulvinar. Nunc lacinia faucibus nisl, vel sodales elit lobortis nec.
                                                Vivamus et odio vel justo dignissim semper. Integer sit amet vehicula est, pellentesque elementum ex. Lorem ipsum dolor sit amet, 
                                                consectetur adipiscing elit. Maecenas a felis eros. Nunc ultricies odio a urna pharetra molestie. Duis vitae arcu nulla. Morbi 
                                                rhoncus felis non tellus mollis, vel porttitor ante tincidunt. Sed vulputate volutpat fringilla. Sed varius, magna id eleifend rutrum,
                                                velit odio sagittis leo, sit amet egestas orci dui vel ex. Phasellus dapibus tempor orci eget semper.

                                                Mauris tincidunt dolor nec ipsum eleifend ullamcorper. Donec sed commodo lorem. Vestibulum finibus quam quis urna venenatis pharetra. 
                                                Ut suscipit velit sit amet turpis convallis consectetur. Praesent tristique vulputate venenatis. Nam vehicula laoreet elit, eget lacinia 
                                                sapien dignissim non. Nullam in egestas tortor. Vestibulum sit amet elit bibendum odio congue fermentum. Sed volutpat ultricies magna, 
                                                facilisis pharetra sapien luctus id. In id maximus nibh. Morbi pulvinar sodales urna, et posuere est vulputate ac. Suspendisse facilisis, 
                                                lacus non placerat mollis, lectus nisi condimentum mi, imperdiet ultrices mi risus vel sapien. Donec sed ligula non massa congue malesuada.
                                            </p>
                                        </div>
                                        <div id="Certificates" className="mt-5">
                                            <h2 className="text-primary">Certificates</h2>
                                            <hr/>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque turpis eu molestie molestie. 
                                                Integer tristique quam facilisis urna sagittis pulvinar. Nunc lacinia faucibus nisl, vel sodales elit lobortis nec.
                                                Vivamus et odio vel justo dignissim semper. Integer sit amet vehicula est, pellentesque elementum ex. Lorem ipsum dolor sit amet, 
                                                consectetur adipiscing elit. Maecenas a felis eros. Nunc ultricies odio a urna pharetra molestie. Duis vitae arcu nulla. Morbi 
                                                rhoncus felis non tellus mollis, vel porttitor ante tincidunt. Sed vulputate volutpat fringilla. Sed varius, magna id eleifend rutrum,
                                                velit odio sagittis leo, sit amet egestas orci dui vel ex. Phasellus dapibus tempor orci eget semper.

                                                Mauris tincidunt dolor nec ipsum eleifend ullamcorper. Donec sed commodo lorem. Vestibulum finibus quam quis urna venenatis pharetra. 
                                                Ut suscipit velit sit amet turpis convallis consectetur. Praesent tristique vulputate venenatis. Nam vehicula laoreet elit, eget lacinia 
                                                sapien dignissim non. Nullam in egestas tortor. Vestibulum sit amet elit bibendum odio congue fermentum. Sed volutpat ultricies magna, 
                                                facilisis pharetra sapien luctus id. In id maximus nibh. Morbi pulvinar sodales urna, et posuere est vulputate ac. Suspendisse facilisis, 
                                                lacus non placerat mollis, lectus nisi condimentum mi, imperdiet ultrices mi risus vel sapien. Donec sed ligula non massa congue malesuada.
                                            </p>
                                        </div>
                                        <div id="Cases" className="mt-5">
                                            <h2 className="text-primary">Cases</h2>
                                            <hr/>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque turpis eu molestie molestie. 
                                                Integer tristique quam facilisis urna sagittis pulvinar. Nunc lacinia faucibus nisl, vel sodales elit lobortis nec.
                                                Vivamus et odio vel justo dignissim semper. Integer sit amet vehicula est, pellentesque elementum ex. Lorem ipsum dolor sit amet, 
                                                consectetur adipiscing elit. Maecenas a felis eros. Nunc ultricies odio a urna pharetra molestie. Duis vitae arcu nulla. Morbi 
                                                rhoncus felis non tellus mollis, vel porttitor ante tincidunt. Sed vulputate volutpat fringilla. Sed varius, magna id eleifend rutrum,
                                                velit odio sagittis leo, sit amet egestas orci dui vel ex. Phasellus dapibus tempor orci eget semper.

                                                Mauris tincidunt dolor nec ipsum eleifend ullamcorper. Donec sed commodo lorem. Vestibulum finibus quam quis urna venenatis pharetra. 
                                                Ut suscipit velit sit amet turpis convallis consectetur. Praesent tristique vulputate venenatis. Nam vehicula laoreet elit, eget lacinia 
                                                sapien dignissim non. Nullam in egestas tortor. Vestibulum sit amet elit bibendum odio congue fermentum. Sed volutpat ultricies magna, 
                                                facilisis pharetra sapien luctus id. In id maximus nibh. Morbi pulvinar sodales urna, et posuere est vulputate ac. Suspendisse facilisis, 
                                                lacus non placerat mollis, lectus nisi condimentum mi, imperdiet ultrices mi risus vel sapien. Donec sed ligula non massa congue malesuada.
                                            </p>
                                        </div>
                                        <div id="Contacts" className="mt-5">
                                            <h2 className="text-primary">Contacts</h2>
                                            <hr/>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque turpis eu molestie molestie. 
                                                Integer tristique quam facilisis urna sagittis pulvinar. Nunc lacinia faucibus nisl, vel sodales elit lobortis nec.
                                                Vivamus et odio vel justo dignissim semper. Integer sit amet vehicula est, pellentesque elementum ex. Lorem ipsum dolor sit amet, 
                                                consectetur adipiscing elit. Maecenas a felis eros. Nunc ultricies odio a urna pharetra molestie. Duis vitae arcu nulla. Morbi 
                                                rhoncus felis non tellus mollis, vel porttitor ante tincidunt. Sed vulputate volutpat fringilla. Sed varius, magna id eleifend rutrum,
                                                velit odio sagittis leo, sit amet egestas orci dui vel ex. Phasellus dapibus tempor orci eget semper.

                                                Mauris tincidunt dolor nec ipsum eleifend ullamcorper. Donec sed commodo lorem. Vestibulum finibus quam quis urna venenatis pharetra. 
                                                Ut suscipit velit sit amet turpis convallis consectetur. Praesent tristique vulputate venenatis. Nam vehicula laoreet elit, eget lacinia 
                                                sapien dignissim non. Nullam in egestas tortor. Vestibulum sit amet elit bibendum odio congue fermentum. Sed volutpat ultricies magna, 
                                                facilisis pharetra sapien luctus id. In id maximus nibh. Morbi pulvinar sodales urna, et posuere est vulputate ac. Suspendisse facilisis, 
                                                lacus non placerat mollis, lectus nisi condimentum mi, imperdiet ultrices mi risus vel sapien. Donec sed ligula non massa congue malesuada.
                                            </p>
                                        </div>
                                        <div id="Rate" className="mt-5">
                                            <h2 className="text-primary">Ratings & Reviews</h2>
                                            <CommentanRating/>
                                
                                            <hr/>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque turpis eu molestie molestie. 
                                                Integer tristique quam facilisis urna sagittis pulvinar. Nunc lacinia faucibus nisl, vel sodales elit lobortis nec.
                                                Vivamus et odio vel justo dignissim semper. Integer sit amet vehicula est, pellentesque elementum ex. Lorem ipsum dolor sit amet, 
                                                consectetur adipiscing elit. Maecenas a felis eros. Nunc ultricies odio a urna pharetra molestie. Duis vitae arcu nulla. Morbi 
                                                rhoncus felis non tellus mollis, vel porttitor ante tincidunt. Sed vulputate volutpat fringilla. Sed varius, magna id eleifend rutrum,
                                                velit odio sagittis leo, sit amet egestas orci dui vel ex. Phasellus dapibus tempor orci eget semper.

                                                Mauris tincidunt dolor nec ipsum eleifend ullamcorper. Donec sed commodo lorem. Vestibulum finibus quam quis urna venenatis pharetra. 
                                                Ut suscipit velit sit amet turpis convallis consectetur. Praesent tristique vulputate venenatis. Nam vehicula laoreet elit, eget lacinia 
                                                sapien dignissim non. Nullam in egestas tortor. Vestibulum sit amet elit bibendum odio congue fermentum. Sed volutpat ultricies magna, 
                                                facilisis pharetra sapien luctus id. In id maximus nibh. Morbi pulvinar sodales urna, et posuere est vulputate ac. Suspendisse facilisis, 
                                                lacus non placerat mollis, lectus nisi condimentum mi, imperdiet ultrices mi risus vel sapien. Donec sed ligula non massa congue malesuada.
                                            </p>
                                        </div>
                            </div>
                        </div>
                    </div>
                </div>    
        </>
    )
}

export default DentistProfile;