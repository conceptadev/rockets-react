import React from 'react';
import * as ReactRouter from 'react-router-dom';
import { RouteProps, PathRouteProps, LayoutRouteProps, IndexRouteProps, RouterProps } from './interfaces';
export declare const useNavigate: typeof ReactRouter.useNavigate;
export declare const Route: React.FC<RouteProps | PathRouteProps | LayoutRouteProps | IndexRouteProps>;
export declare const ProtectedRoute: React.FC<RouteProps | PathRouteProps | LayoutRouteProps | IndexRouteProps>;
export declare const PublicRoute: React.FC<RouteProps | PathRouteProps | LayoutRouteProps | IndexRouteProps>;
export declare const Router: React.FC<RouterProps>;
