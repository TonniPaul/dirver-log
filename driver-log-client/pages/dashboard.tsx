import {
  DashboardContainer,
  DashboardContentContainer,
  DashboardHeaderText,
  SidebarContainer,
  SidebarItems,
  LogoutButton,
  SidebarMobileMenu,
  DashboardNav,
  DashboardContent,
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

const Dashboard = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activePageHeader, setActivePageHeader] = useState(
    dashboardItems[0].description
  );

  const isDashboard = activePageHeader === dashboardItems[0].description;
  const isManageDriver = activePageHeader === dashboardItems[1].description;
  const isReports = activePageHeader === dashboardItems[2].description;
  const isProfile = activePageHeader === dashboardItems[3].description;
  const router = useRouter();
  const { admin, clearAdmin, driver, clearDriver } = useStore();

  useLayoutEffect(() => {
    if (admin) {
      clearDriver();
    }
    if (driver) {
      clearAdmin();
    }

    if (!admin && !driver) {
      router.replace('/log-in');
    }
  }, [admin, driver, router]);

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
            <DashboardHeaderText>
              {isProfile && 'Company'} {activePageHeader} {admin && admin.name}{' '}
              {driver && driver.firstName}
            </DashboardHeaderText>
          </DashboardNav>

          <div>
            {isDashboard && (
              <DashboardContentContainer>
                Dashboard Content
              </DashboardContentContainer>
            )}

            {isManageDriver && <ManageDrivers />}

            {isReports && <div>Report Content</div>}

            {isProfile && <div>Profile Content</div>}
          </div>
          {/* <RightSidebar>RightSidebar</RightSidebar> */}
        </DashboardContent>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
