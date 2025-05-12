
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart, LineChart, PieChart, RadarChart } from "lucide-react";
import BSIOverview from '@/components/dashboard/BSIOverview';
import IndexComponents from '@/components/dashboard/IndexComponents';
import VEIAnalysis from '@/components/dashboard/VEIAnalysis';
import EEIAnalysis from '@/components/dashboard/EEIAnalysis';
import CSIAnalysis from '@/components/dashboard/CSIAnalysis';
import StudentTracking from '@/components/dashboard/StudentTracking';
import TimeAnalysis from '@/components/dashboard/TimeAnalysis';
import DataQuality from '@/components/dashboard/DataQuality';
import OverviewDashboard from '@/components/dashboard/OverviewDashboard';

const Dashboard = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Trực quan hóa dữ liệu và kết quả dự đoán</p>
            </div>
            
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-5 lg:grid-cols-9 gap-2">
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="bsi">BSI</TabsTrigger>
                <TabsTrigger value="components">Thành phần</TabsTrigger>
                <TabsTrigger value="vei">VEI</TabsTrigger>
                <TabsTrigger value="eei">EEI</TabsTrigger>
                <TabsTrigger value="csi">CSI</TabsTrigger>
                <TabsTrigger value="students">Sinh viên</TabsTrigger>
                <TabsTrigger value="time">Theo thời gian</TabsTrigger>
                <TabsTrigger value="quality">Chất lượng dữ liệu</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <OverviewDashboard />
              </TabsContent>
              
              <TabsContent value="bsi">
                <BSIOverview />
              </TabsContent>
              
              <TabsContent value="components">
                <IndexComponents />
              </TabsContent>
              
              <TabsContent value="vei">
                <VEIAnalysis />
              </TabsContent>
              
              <TabsContent value="eei">
                <EEIAnalysis />
              </TabsContent>
              
              <TabsContent value="csi">
                <CSIAnalysis />
              </TabsContent>
              
              <TabsContent value="students">
                <StudentTracking />
              </TabsContent>
              
              <TabsContent value="time">
                <TimeAnalysis />
              </TabsContent>
              
              <TabsContent value="quality">
                <DataQuality />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
