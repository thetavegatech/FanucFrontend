import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiAlignJustify } from "react-icons/fi";
import { FaRegWindowClose, FaCog, FaWrench, FaTools, FaFlask, FaCalendar, FaBox, FaChartLine, FaTachometerAlt, FaUsers, FaUser, FaPowerOff } from "react-icons/fa";

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const drawerStyle = {
        position: 'fixed',
        top: 0,
        left: drawerOpen ? '0' : '-320px',
        width: '300px',
        height: '100%',
        backgroundColor: '#1e1e1e', // Sleek dark background
        color: '#fff',
        transition: 'left 0.4s ease',
        padding: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        boxShadow: drawerOpen ? '6px 0px 15px rgba(0,0,0,0.5)' : 'none',
    };

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 999,
        opacity: drawerOpen ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: drawerOpen ? 'all' : 'none',
    };

    const navItemStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '14px 18px',
        color: '#fff',
        textDecoration: 'none',
        fontSize: '16px',
        borderRadius: '8px',
        marginBottom: '12px',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
    };

    const navItemHoverStyle = {
        backgroundColor: '#333',
    };

    const activeLinkStyle = {
        backgroundColor: '#007bff', // Accent color for active link
        color: '#fff',
        transform: 'scale(1.05)', // Slight scale on active
    };

    const iconStyle = {
        marginRight: '12px',
        fontSize: '20px',
        color: '#f8f9fa',
    };

    const closeButtonStyle = {
        background: 'transparent',
        border: 'none',
        color: '#fff',
        fontSize: '28px',
        cursor: 'pointer',
        alignSelf: 'flex-end',
    };

    const headerStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#007bff', // Header accent color
    };

    const buttonStyle = {
        background: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '50%',
        cursor: 'pointer',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
        transition: 'transform 0.3s ease',
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg p-3" style={{backgroundColor: '#007bff', color: '#fff'}}>
                <button 
                    className="btn" 
                    onClick={toggleDrawer}
                    style={buttonStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
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
                    <FaRegWindowClose />
                </button>
                <div style={headerStyle}>Menu</div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {[
                        { to: "/", label: "Add Asset", icon: <FaCog style={iconStyle} /> },
                        { to: "/breakdownform", label: "Breakdown", icon: <FaWrench style={iconStyle} /> },
                        { to: "/maintenancescheduleform", label: "Maintenance Schedule", icon: <FaCalendar style={iconStyle} /> },
                        { to: "/PartForm", label: "Add Part", icon: <FaTools style={iconStyle} /> },
                        { to: "/Skillsform", label: "Add Skills", icon: <FaFlask style={iconStyle} /> },
                        { to: "/WorkForceForm", label: "Add Users", icon: <FaUsers style={iconStyle} /> },
                        { to: "/ProductionPlanform", label: "Production Plan", icon: <FaBox style={iconStyle} /> },
                        { to: "/Toollifeform", label: "Add Tool Data", icon: <FaTachometerAlt style={iconStyle} /> },
                        { to: "/tpmsform", label: "TPMS", icon: <FaChartLine style={iconStyle} /> },
                        { to: "/Shiftform", label: "Add Shift", icon: <FaPowerOff style={iconStyle} /> },
                        { to: "/PmcParameterform", label: "PMC Parameters", icon: <FaCog style={iconStyle} /> },
                        { to: "/Elementform", label: "Add Element", icon: <FaCog style={iconStyle} /> },
                        { to: "/OperatorPerformanceform", label: "Operator Performance", icon: <FaUser style={iconStyle} /> }
                    ].map((item, index) => (
                        <NavLink 
                            key={index}
                            to={item.to} 
                            style={navItemStyle}
                            activeStyle={activeLinkStyle}
                            onClick={toggleDrawer}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = navItemHoverStyle.backgroundColor)}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                        >
                            {item.icon}
                            {item.label}
                        </NavLink>
                    ))}
                </ul>
            </div>

            {/* Overlay */}
            {drawerOpen && <div style={overlayStyle} onClick={toggleDrawer}></div>}
        </div>
    );
};

export default Navbar;
