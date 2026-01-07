import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import PortfolioCreate from 'src/sections/portilioSection/PortfolioCreate';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Blank = lazy(() => import('src/pages/blank'));
export const SectionsControlls = lazy(() => import('src/pages/Sections'));
export const ProfileContent = lazy(() => import('src/pages/ProfileContent'));
export const AboutSection = lazy(() => import('src/pages/aboutSection'));
export const WorkProgressSection = lazy(() => import('src/pages/workPorgressSection'));
export const PortfolioSection = lazy(() => import('src/pages/porfolitoSection'));
export const ContactSection = lazy(() => import('src/pages/contactSection'));
export const GlobalSetting = lazy(() => import('src/pages/GlobalSetting'));
export const PortfolioDetails = lazy(() => import('src/pages/PortfolioDetails'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'user', element: <UserPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blank', element: <Blank /> },

      { path: 'sections', element: <SectionsControlls /> },
      { path: 'global', element: <GlobalSetting /> },

      { path: 'profile-content', element: <ProfileContent /> },
      { path: 'about-section', element: <AboutSection /> },
      { path: 'work-section', element: <WorkProgressSection /> },
      { path: 'portfolio-section', element: <PortfolioSection /> },
      { path: 'portfolio-section/:id', element: <PortfolioDetails /> },
      { path: 'portfolio-section/create', element: <PortfolioCreate /> },
      { path: 'contact-section', element: <ContactSection /> },
    ],
  },
  {
    path: 'sign-in',
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
