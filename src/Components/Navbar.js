import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiAlignJustify } from "react-icons/fi";
import { FaRegWindowClose, FaCog, FaWrench, FaTools, FaFlask, FaCalendar, FaBox, FaChartLine, FaTachometerAlt, FaUsers, FaUser, FaPowerOff } from "react-icons/fa";

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    // Modern inline styles for the drawer, overlay, and nav items
    const drawerStyle = {
        position: 'fixed',
        top: 0,
        left: drawerOpen ? '0' : '-300px',
        width: '300px',
        height: '100vh',
        backgroundColor: 'rgba(51, 51, 51, 0.85)', // Dark background with transparency
        backdropFilter: 'blur(10px)', // Frosted glass effect
        color: '#fff',
        transition: 'left 0.4s ease-in-out', // Smooth transition
        padding: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
    };

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker overlay
        zIndex: 999,
    };

    const closeButtonStyle = {
        background: 'transparent',
        border: 'none',
        color: '#fff',
        fontSize: '24px',
        cursor: 'pointer',
        alignSelf: 'flex-end',
    };

    

    const headerStyle = {
        fontSize: '22px',
        fontWeight: 'bold',
        marginBottom: '30px',
    };

    const navItemStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        color: '#fff',
        textDecoration: 'none',
        fontSize: '18px',
        borderRadius: '8px',
        marginBottom: '15px',
        transition: 'background-color 0.3s ease',
    };

    const navItemHoverStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Hover effect
    };

    const activeLinkStyle = {
        backgroundColor: '#444', // Slightly lighter background for active link
    };

    const iconStyle = {
        marginRight: '15px',
        fontSize: '24px',
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
                <button 
                    className="btn btn-primary" 
                    onClick={toggleDrawer}
                    style={{color: 'white'}}
                >
                    <FiAlignJustify style={{height: "24px", width: "24px"}} />
                </button>
            </nav>

            {/* Drawer */}
            <div style={drawerStyle}>
                <button 
                    style={closeButtonStyle}
                    onClick={toggleDrawer}
                >
                    <FaRegWindowClose  />
                </button>
                <div style={headerStyle}>Menu</div>
                <ul style={{listStyle: 'none', padding: 0}}>
                    <NavLink 
                        to="/" 
                        style={navItemStyle}
                        activeStyle={activeLinkStyle}
                        onClick={toggleDrawer}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = navItemHoverStyle.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '')}
                    >
                        <FaCog style={iconStyle} />
                        Add Asset
                    </NavLink> 
                    <NavLink 
                        to="/breakdownform" 
                        style={navItemStyle}
                        activeStyle={activeLinkStyle}
                        onClick={toggleDrawer}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = navItemHoverStyle.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '')}
                    >
                        <FaWrench style={iconStyle} />
                        Breakdown
                    </NavLink> 
                    <NavLink 
                        to="/maintenancescheduleform" 
                        style={navItemStyle}
                        activeStyle={activeLinkStyle}
                        onClick={toggleDrawer}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = navItemHoverStyle.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '')}
                    >
                        <FaCalendar style={iconStyle} />
                        Maintenance Schedule
                    </NavLink> 
                    <NavLink 
                        to="/PartForm" 
                        style={navItemStyle}
                        activeStyle={activeLinkStyle}
                        onClick={toggleDrawer}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = navItemHoverStyle.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '')}
                    >
                        <FaTools style={iconStyle} />
                        Add Part
                    </NavLink> 
                    <NavLink 
                        to="/Skillsform" 
                        style={navItemStyle}
                        activeStyle={activeLinkStyle}
                        onClick={toggleDrawer}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = navItemHoverStyle.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '')}
                    >
                        <FaFlask style={iconStyle} />
                        Add Skills
                    </NavLink> 
                    <NavLink 
                        to="/WorkForceForm" 
                        style={navItemStyle}
                        activeStyle={activeLinkStyle}
                        onClick={toggleDrawer}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = navItemHoverStyle.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '')}
                    >
                        <FaUsers style={iconStyle} />
                        Add Users
                    </NavLink> 
                    <NavLink 
                        to="/ProductionPlanform" 
                        style={navItemStyle}
                        activeStyle={activeLinkStyle}
                        onClick={toggleDrawer}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = navItemHoverStyle.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '')}
                    >
                        <FaBox style={iconStyle} />
                        Production Plan
                    </NavLink> 
                    <NavLink 
                        to="/Toollifeform" 
                        style={navItemStyle}
                        activeStyle={activeLinkStyle}
                        onClick={toggleDrawer}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = navItemHoverStyle.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '')}
                    >
                        <FaTachometerAlt style={iconStyle} />
                        Add Tool Data
                    </NavLink> 
                    <NavLink 
                        to="/tpmsform" 
                        style={navItemStyle}
                        activeStyle={activeLinkStyle}
                        onClick={toggleDrawer}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = navItemHoverStyle.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '')}
                    >
                        <FaChartLine style={iconStyle} />
                        TPMS
                    </NavLink> 
                    <NavLink 
                        to="/Shiftform" 
                        style={navItemStyle}
                        activeStyle={activeLinkStyle}
                        onClick={toggleDrawer}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = navItemHoverStyle.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '')}
                    >
                        <FaPowerOff style={iconStyle} />
                        Add Shift
                    </NavLink> 
                    <NavLink 
                        to="/PmcParameterform" 
                        style={navItemStyle}
                        activeStyle={activeLinkStyle}
                        onClick={toggleDrawer}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = navItemHoverStyle.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '')}
                    >
                        <FaCog style={iconStyle} />
                        PMC Parameters
                    </NavLink> 
                    <NavLink 
                        to="/OperatorPerformanceform" 
                        style={navItemStyle}
                        activeStyle={activeLinkStyle}
                        onClick={toggleDrawer}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = navItemHoverStyle.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '')}
                    >
                        <FaUser style={iconStyle} />
                        Operator Performance
                    </NavLink> 
                </ul>
            </div>

            {/* Overlay */}
            {drawerOpen && <div style={overlayStyle} onClick={toggleDrawer}></div>}
        </div>
    );
};

export default Navbar;
