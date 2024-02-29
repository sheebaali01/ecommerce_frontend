import { useEffect, useState } from "react";
import { IconType } from 'react-icons';
import { AiFillFileText } from 'react-icons/ai';
import { FaChartBar, FaChartLine, FaChartPie, FaStopwatch } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { RiCoupon3Fill, RiDashboardFill, RiShoppingBag3Fill } from 'react-icons/ri';
import { HiMenuAlt4 } from "react-icons/hi";
import { Link, Location, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
    const location = useLocation();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [phoneActive, setPhoneActive] = useState<boolean>(
      window.innerWidth < 1100
    );
  
    const resizeHandler = () => {
      setPhoneActive(window.innerWidth < 1100);
    };
  
    useEffect(() => {
      window.addEventListener("resize", resizeHandler);
  
      return () => {
        window.removeEventListener("resize", resizeHandler);
      };
    }, []);
    return (
        <>
      {phoneActive && (
        <button id="hamburger" onClick={() => setShowModal(true)}>
          <HiMenuAlt4 />
        </button>
      )}
        <aside style={
          phoneActive
            ? {
                width: "20rem",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: showModal ? "0" : "-22rem",
                transition: "all 0.5s",
              }
            : {}
        }>
            <h2>
                Logo.
            </h2>
            <div>
                <h5>Dashboard</h5>
                <ul>
                    <Li url="/admin/dashboard" 
                        text="Dashboard" 
                        Icon={RiDashboardFill}
                        location = {location}    
                    />                    
                    <Li url="/admin/products" 
                        text="Product" 
                        Icon={RiShoppingBag3Fill}
                        location = {location}    
                    /> 
                    <Li url="/admin/customers" 
                        text="Customer" 
                        Icon={AiFillFileText}
                        location = {location}    
                    /> 
                    <Li url="/admin/transaction" 
                        text="Transaction" 
                        Icon={IoIosPeople}
                        location = {location}    
                    /> 

                </ul>
            </div>

            <div>
                <h5>Chart</h5>
                <ul>
                    <Li url="/admin/chart/bar" 
                        text="Bar" 
                        Icon={FaChartBar}
                        location = {location}    
                    />                    
                    <Li url="/admin/chart/pie" 
                        text="Pie" 
                        Icon={FaChartPie}
                        location = {location}    
                    /> 
                    <Li url="/admin/chart/line" 
                        text="Line" 
                        Icon={FaChartLine}
                        location = {location}    
                    /> 
                    
                </ul>
            </div>

            <div>
                <h5>Apps</h5>
                <ul>
                    <Li url="/admin/app/stopwatch" 
                        text="Stop Watch" 
                        Icon={FaStopwatch}
                        location = {location}    
                    />                    
                    <Li url="/admin/app/coupon" 
                        text="Coupon" 
                        Icon={RiCoupon3Fill}
                        location = {location}    
                    /> 
                    {/* <Li url="/admin/app/toss" 
                        text="Toss" 
                        Icon={FaGamepad}
                        location = {location}    
                    />  */}
                </ul>
            </div>
            {phoneActive && (
          <button id="close-sidebar" onClick={() => setShowModal(false)}>
            Close
          </button>
        )}
        </aside>
    </>
    )
}

interface Liprops {
    text: string;
    url: string;
    location: Location;
    Icon: IconType;

}
const Li = ({ url, location, Icon, text }: Liprops) => (
    <li style={{
        backgroundColor:location.pathname.includes(url)?
        'rgba(0, 115, 255, 0.1)':
        "white"
    }}>
        <Link to={url} 
            style={{
                color:location.pathname.includes(url)?
                'rgb(0, 115, 255)':
                "black"
            }}
            >
            <Icon />
            {text}
        </Link>
    </li>
);
export default AdminSidebar