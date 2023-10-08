import { useStore } from '@/client-store';
import SidebarItemCard from '@/components/cards/sidebar-item-card/sidebar-item-card';
import DashboardComponent from '@/components/dashboard-component/dashboard-component';
import TripLogs from '@/components/dashboard-component/trip-logs';
import Logo from '@/components/logo/logo';
import ManageDrivers from '@/components/manage-drivers/manage-drivers';
import GoogleMap from '@/components/maps/google-maps';
import Popover from '@/components/popover/popover';
import SvgIcon from '@/components/svg-icon/svg-icon';
import { montserrat } from '@/helpers/fonts';
import routes from '@/lib/routes';
import {
  DashboardContainer,
  DashboardContent,
  DashboardNav,
  HideOnDesktopSpan,
  LogoutButton,
  NavProfileContainer,
  ProfileImageContainer,
  SidebarContainer,
  SidebarItems,
  SidebarMobileMenu,
} from '@/styles/dashboard-page.styles';
import { LatLngLiteral } from '@/types/map.types';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';
import dashboardItems from '../public/json/dashboard-items.json';

const Dashboard = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [userLocation, setUserLocation] = useState<LatLngLiteral>({
    lat: 6.5244,
    lng: 3.3792,
  });

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    getUserLocation();
    userLocation;
  }, []);

  const router = useRouter();
  const { admin, clearAdmin, driver, clearDriver } = useStore();

  const filteredDashboardItems = !admin
    ? dashboardItems.filter(
        ({ description }) =>
          description !== 'Manage Drivers' && description !== 'Trip Logs'
      )
    : dashboardItems;

  const profileIndex = filteredDashboardItems.findIndex(
    (p) => p.description === 'Profile'
  );

  const isDashboard = activeTabIndex === 0;
  const isManageDriver = activeTabIndex === 1;
  const isReports = activeTabIndex === 2;
  const isProfile = activeTabIndex === profileIndex;

  useLayoutEffect(() => {
    if (admin) {
      clearDriver();
    }
    if (driver) {
      clearAdmin();
    }

    if (!admin && !driver) {
      router.replace(routes.login());
    }
  }, [admin, driver, router, clearAdmin, clearDriver]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css"
          rel="stylesheet"
        />
        <link rel="icon" href="/assets/delivery-service.png" />
      </Head>
      {isMounted && (
        <DashboardContainer>
          <SidebarContainer className={montserrat.className}>
            <Logo isPrimary />
            <SidebarItems>
              {filteredDashboardItems.map(({ icon, description }, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setActiveTabIndex(index);
                    }}
                  >
                    <SidebarItemCard
                      icon={icon}
                      description={description}
                      active={activeTabIndex === index}
                    />
                  </li>
                );
              })}
            </SidebarItems>
            <LogoutButton
              hideOnMobile
              onClick={admin ? clearAdmin : clearDriver}
            >
              <button>
                <p>Sign Out</p>
                <SvgIcon name="logout" />
              </button>
            </LogoutButton>

            {
              <SidebarMobileMenu>
                <Popover icon="dotted-menu" iconPrimary paddingRight>
                  <LogoutButton onClick={admin ? clearAdmin : clearDriver}>
                    <div>
                      <p>Sign Out</p>
                      <SvgIcon name="logout" />
                    </div>
                  </LogoutButton>
                </Popover>
              </SidebarMobileMenu>
            }
          </SidebarContainer>

          <DashboardContent>
            <DashboardNav>
              <p>
                Welcome{' '}
                {isMounted && (
                  <HideOnDesktopSpan>
                    {driver ? driver.firstName : admin?.name}
                  </HideOnDesktopSpan>
                )}
              </p>
              {isMounted && (
                <NavProfileContainer
                  onClick={() => setActiveTabIndex(profileIndex)}
                >
                  <ProfileImageContainer>
                    <Image
                      src="/assets/user.svg"
                      alt="user-icon"
                      width={30}
                      height={30}
                    />
                  </ProfileImageContainer>
                  <div>
                    <p>{driver ? driver.firstName : admin?.name}</p>
                    <small>Role: {driver ? driver.role : admin?.role}</small>
                  </div>
                </NavProfileContainer>
              )}
            </DashboardNav>

            <div>
              {isDashboard &&
                (admin ? (
                  <DashboardComponent />
                ) : (
                  // <Bookings
                  //   latitude={userLocation.latitude}
                  //   longitude={userLocation.longitude}
                  // />
                  <GoogleMap />
                ))}

              {isManageDriver && admin && <ManageDrivers />}

              {isReports && admin && <TripLogs />}

              {isProfile && <div>Profile Content</div>}
            </div>
            {/* <RightSidebar>RightSidebar</RightSidebar> */}
          </DashboardContent>
        </DashboardContainer>
      )}
    </>
  );
};

export default Dashboard;
