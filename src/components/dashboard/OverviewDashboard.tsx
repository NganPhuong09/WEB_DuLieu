
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart } from "lucide-react";

const OverviewDashboard = () => {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Tổng học viên</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,845</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span className="i-lucide-trending-up mr-1"></span>
              +12.5% so với kỳ trước
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Khóa học</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">128</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span className="i-lucide-trending-up mr-1"></span>
              +5.2% so với kỳ trước
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Tỉ lệ hài lòng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">85.4%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span className="i-lucide-trending-up mr-1"></span>
              +3.7% so với kỳ trước
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Độ chính xác mô hình</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">92.3%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span className="i-lucide-trending-up mr-1"></span>
              +1.4% so với kỳ trước
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Chart */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AreaChart className="h-5 w-5 text-research-primary" />
            <span>Phân bố mức độ hài lòng theo thời gian</span>
          </CardTitle>
          <CardDescription>
            Phân tích xu hướng độ hài lòng của học viên theo các giai đoạn khóa học
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
            <div className="text-gray-500 text-center">
              <p>Biểu đồ sẽ được hiển thị tại đây</p>
              <p className="text-sm text-gray-400">Dữ liệu sẽ được cập nhật sau</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Two Column Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Phân bố Video Engagement Index</CardTitle>
            <CardDescription>
              Mức độ tương tác của học viên với video bài giảng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-gray-500 text-center">
                <p>Biểu đồ VEI sẽ được hiển thị tại đây</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Phân bố Exercise Engagement Index</CardTitle>
            <CardDescription>
              Mức độ tương tác của học viên với bài tập
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-gray-500 text-center">
                <p>Biểu đồ EEI sẽ được hiển thị tại đây</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OverviewDashboard;
