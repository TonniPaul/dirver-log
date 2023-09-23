'use client';
import {
  DashboardContainer,
  SidebarContainer,
  SidebarItems,
  LogoutButton,
  SidebarMobileMenu,
  DashboardNav,
  DashboardContent,
  NavProfileContainer,
  ProfileImageContainer,
  HideOnDesktopSpan,
} from '@/styles/dashboard-page.styles';
import dashboardItems from '../public/json/dashboard-items.json';
import { useLayoutEffect, useState } from 'react';
import { montserrat } from '@/helpers/fonts';
import SidebarItemCard from '@/components/cards/sidebar-item-card/sidebar-item-card';
import SvgIcon from '@/components/svg-icon/svg-icon';
import Head from 'next/head';
import Logo from '@/components/logo/logo';
import Popover from '@/components/popover/popover';
import ManageDrivers from '@/components/manage-drivers/manage-drivers';
import { useRouter } from 'next/router';
import { useStore } from '@/store';
import routes from '@/lib/routes';
import Image from 'next/image';
import DashboardComponent from '@/components/dashboard-component/dashboard-component';

const Dashboard = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const router = useRouter();
  const { admin, clearAdmin, driver, clearDriver } = useStore();

  const filteredDashboardItems = !admin
    ? dashboardItems.filter(
        ({ description }) =>
          description !== 'Manage Drivers' && description !== 'Reports'
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
        <link rel="icon" href="/assets/delivery-service.png" />
      </Head>
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
          <LogoutButton hideOnMobile onClick={admin ? clearAdmin : clearDriver}>
            <button>
              <p>Sign Out</p>
              <SvgIcon name="logout" />
            </button>
          </LogoutButton>

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
        </SidebarContainer>

        <DashboardContent>
          <DashboardNav>
            <p>
              Welcome{' '}
              <HideOnDesktopSpan>
                {driver ? driver.firstName : admin?.name}
              </HideOnDesktopSpan>
            </p>
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
          </DashboardNav>

          <div>
            {isDashboard && <DashboardComponent />}

            {isManageDriver && admin && <ManageDrivers />}

            {isReports && admin && <div>Report Content</div>}

            {isProfile && <div>Profile Content</div>}
          </div>
          {/* <RightSidebar>RightSidebar</RightSidebar> */}
        </DashboardContent>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
