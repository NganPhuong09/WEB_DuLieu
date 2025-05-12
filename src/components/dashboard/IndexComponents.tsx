
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  RadarChart as RechartsRadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer 
} from 'recharts';
import { RadarChart, BarChart } from "lucide-react";

// Mock data for component contribution
const componentData = [
  { name: 'VEI', score: 8.2, contribution: 40 },
  { name: 'EEI', score: 7.8, contribution: 35 },
  { name: 'CSI', score: 6.5, contribution: 25 },
];

// Mock data for radar chart
const radarData = [
  { subject: 'VEI', A: 8.2, B: 7.5, fullMark: 10 },
  { subject: 'EEI', A: 7.8, B: 6.9, fullMark: 10 },
  { subject: 'CSI', A: 6.5, B: 7.2, fullMark: 10 },
];

// Mock data for BSI groups comparison
const bsiGroupsData = [
  { name: 'VEI', high: 8.9, medium: 7.2, low: 5.1 },
  { name: 'EEI', high: 8.7, medium: 6.8, low: 4.8 },
  { name: 'CSI', high: 8.5, medium: 6.5, low: 4.5 },
];

// Mock data for class comparison
const classComparisonData = [
  { class: 'K18', VEI: 8.5, EEI: 7.8, CSI: 7.2 },
  { class: 'K19', VEI: 8.2, EEI: 7.5, CSI: 6.9 },
  { class: 'K20', VEI: 7.9, EEI: 7.6, CSI: 6.5 },
  { class: 'K21', VEI: 8.1, EEI: 7.3, CSI: 6.8 },
  { class: 'K22', VEI: 7.8, EEI: 7.0, CSI: 6.3 },
];

const IndexComponents = () => {
  const [classFilter, setClassFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Phân tích thành phần BSI</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Bộ lọc lớp</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn lớp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="K18">K18</SelectItem>
                  <SelectItem value="K19">K19</SelectItem>
                  <SelectItem value="K20">K20</SelectItem>
                  <SelectItem value="K21">K21</SelectItem>
                  <SelectItem value="K22">K22</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Bộ lọc khoa</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn khoa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="IT">Công nghệ thông tin</SelectItem>
                  <SelectItem value="CS">Khoa học máy tính</SelectItem>
                  <SelectItem value="EE">Kỹ thuật điện</SelectItem>
                  <SelectItem value="ME">Kỹ thuật cơ khí</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Component KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {componentData.map(component => (
          <Card key={component.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{component.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{component.score}/10</div>
              <p className="text-xs text-gray-600 mt-1">
                Đóng góp: {component.contribution}% vào BSI
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Radar Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RadarChart className="h-5 w-5 text-research-primary" />
            <span>So sánh các thành phần chỉ số theo lớp</span>
          </CardTitle>
          <CardDescription>
            Biểu đồ radar thể hiện sự khác biệt giữa các lớp
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              A: { color: '#7c3aed' },
              B: { color: '#e879f9' },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsRadarChart outerRadius={150} data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                <Radar
                  name="Lớp K19"
                  dataKey="A"
                  stroke="var(--color-A)"
                  fill="var(--color-A)"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Lớp K20"
                  dataKey="B"
                  stroke="var(--color-B)"
                  fill="var(--color-B)"
                  fillOpacity={0.6}
                />
                <Legend />
              </RechartsRadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Component Comparison by Class */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-research-primary" />
            <span>So sánh các chỉ số theo lớp</span>
          </CardTitle>
          <CardDescription>
            Biểu đồ cột thể hiện giá trị các thành phần theo từng lớp
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              VEI: { color: '#818cf8' },
              EEI: { color: '#a78bfa' },
              CSI: { color: '#c4b5fd' },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart 
                data={classComparisonData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="class" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="VEI" name="VEI" fill="var(--color-VEI)" />
                <Bar dataKey="EEI" name="EEI" fill="var(--color-EEI)" />
                <Bar dataKey="CSI" name="CSI" fill="var(--color-CSI)" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Components by BSI Groups */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-research-primary" />
            <span>So sánh các chỉ số theo nhóm BSI</span>
          </CardTitle>
          <CardDescription>
            Giá trị trung bình của các thành phần theo nhóm BSI cao/trung bình/thấp
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              high: { color: '#4ade80' },
              medium: { color: '#facc15' },
              low: { color: '#f87171' }
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart 
                data={bsiGroupsData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="high" name="BSI Cao" fill="var(--color-high)" />
                <Bar dataKey="medium" name="BSI Trung bình" fill="var(--color-medium)" />
                <Bar dataKey="low" name="BSI Thấp" fill="var(--color-low)" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default IndexComponents;
