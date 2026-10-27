import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'layouts/auth';
import { DashboardLayout } from 'layouts/dashboard';
import PortfolioCreate from 'sections/portilioSection/PortfolioCreate';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('pages/dashboard'));
export const SignInPage = lazy(() => import('pages/sign-in'));
export const Page404 = lazy(() => import('pages/page-not-found'));
export const Blank = lazy(() => import('pages/blank'));
export const SectionsControlls = lazy(() => import('pages/Sections'));
export const ProfileContent = lazy(() => import('pages/ProfileContent'));
export const AboutSection = lazy(() => import('pages/aboutSection'));
export const WorkProgressSection = lazy(() => import('pages/workPorgressSection'));
export const PortfolioSection = lazy(() => import('pages/porfolitoSection'));
export const ContactSection = lazy(() => import('pages/contactSection'));
export const GlobalSetting = lazy(() => import('pages/GlobalSetting'));
export const PortfolioDetails = lazy(() => import('pages/PortfolioDetails'));
export const SkillsSection = lazy(() => import('pages/SkillsSection'));
export const ExperienceSection = lazy(() => import('pages/Experience'));
export const BlogSection = lazy(() => import('pages/blogSection'));
export const BlogCreatePage = lazy(() => import('sections/blogSection/BlogCreate'));
export const BlogDetails = lazy(() => import('pages/BlogDetails'));
export const TailoredCvPage = lazy(() => import('pages/TailoredCv'));
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
      { path: 'skills-section', element: <SkillsSection /> },
      { path: 'experience', element: <ExperienceSection /> },
      { path: 'blog-section', element: <BlogSection /> },
      { path: 'blog-section/create', element: <BlogCreatePage /> },
      { path: 'blog-section/:id', element: <BlogDetails /> },
      { path: 'tailored-cv', element: <TailoredCvPage /> },
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
