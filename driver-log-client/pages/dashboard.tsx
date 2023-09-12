import {
  DashboardContainer,
  DashboardContentContainer,
  DashboardHeaderText,
  RightSidebar,
  SidebarContainer,
  SidebarItems,
  LogoutButton,
  SidebarMobileMenu,
} from '@/styles/dashboard-page.styles';
import dashboardItems from '../public/json/dashboard-items.json';
import { useState } from 'react';
import { montserrat } from '@/helpers/fonts';
import SidebarItemCard from '@/components/cards/sidebar-item-card/sidebar-item-card';
import SvgIcon from '@/components/svg-icon/svg-icon';
import Head from 'next/head';
import Logo from '@/components/logo/logo';

const Dashboard = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activePageHeader, setActivePageHeader] = useState(
    dashboardItems[0].description
  );

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/logo-icon.png" />
      </Head>
      <DashboardContainer>
        <SidebarContainer className={montserrat.className}>
          <Logo isPrimary />
          <SidebarItems>
            {dashboardItems.map(({ icon, description }, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    setActiveTabIndex(index);
                    setActivePageHeader(description);
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
          <LogoutButton>
            <p>Sign Out</p>
            <SvgIcon name="logout" />
          </LogoutButton>

          <SidebarMobileMenu>
            <SvgIcon name="dotted-menu" />
          </SidebarMobileMenu>
        </SidebarContainer>

        <DashboardContentContainer>
          <DashboardHeaderText>
            {activePageHeader === 'Profile' && 'User'} {activePageHeader}
          </DashboardHeaderText>
        </DashboardContentContainer>

        <RightSidebar>RightSidebar</RightSidebar>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
