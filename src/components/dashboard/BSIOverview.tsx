
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, BarChart } from "lucide-react";

// Mock data for BSI distribution by class
const bsiByClassData = [
  { class: 'K18', high: 45, medium: 120, low: 25 },
  { class: 'K19', high: 60, medium: 90, low: 30 },
  { class: 'K20', high: 38, medium: 110, low: 42 },
  { class: 'K21', high: 55, medium: 105, low: 32 },
  { class: 'K22', high: 48, medium: 95, low: 38 },
];

// Mock data for BSI distribution pie chart
const bsiDistributionData = [
  { name: 'Cao', value: 246, fill: '#4ade80' },
  { name: 'Trung bình', value: 520, fill: '#facc15' },
  { name: 'Thấp', value: 167, fill: '#f87171' },
];

const BSIOverview = () => {
  const [classFilter, setClassFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');

  // Calculate totals and percentages
  const totalStudents = 933;
  const highBsiCount = 246;
  const lowBsiCount = 167;
  const highBsiPercentage = ((highBsiCount / totalStudents) * 100).toFixed(1);
  const lowBsiPercentage = ((lowBsiCount / totalStudents) * 100).toFixed(1);
  const averageBsi = 7.4;

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Tổng quan BSI</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Bộ lọc giới tính</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="male">Nam</SelectItem>
                  <SelectItem value="female">Nữ</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">BSI trung bình</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{averageBsi}/10</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span className="i-lucide-trending-up mr-1"></span>
              +0.4 so với kỳ trước
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Nhóm BSI cao</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{highBsiPercentage}%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span className="i-lucide-trending-up mr-1"></span>
              +2.3% so với kỳ trước
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Nhóm BSI thấp</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{lowBsiPercentage}%</div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              <span className="i-lucide-trending-down mr-1"></span>
              -1.5% so với kỳ trước
            </p>
          </CardContent>
        </Card>
      </div>

      {/* BSI Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-research-primary" />
              <span>Phân bố BSI theo nhóm</span>
            </CardTitle>
            <CardDescription>
              Tỷ lệ phân bổ học viên theo mức độ BSI
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
                  data={[{
                    high: highBsiCount,
                    medium: totalStudents - highBsiCount - lowBsiCount,
                    low: lowBsiCount
                  }]}
                  layout="vertical"
                  barGap={0}
                  barCategoryGap="20%"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 border rounded shadow-lg">
                            <p className="font-medium">{payload[0].name}: {payload[0].value} học viên</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="high"
                    name="BSI Cao"
                    fill="var(--color-high)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="medium"
                    name="BSI Trung bình"
                    fill="var(--color-medium)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="low"
                    name="BSI Thấp"
                    fill="var(--color-low)"
                    radius={[4, 4, 0, 0]}
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-research-primary" />
              <span>Phân bổ BSI theo lớp</span>
            </CardTitle>
            <CardDescription>
              Số lượng học viên theo nhóm BSI và lớp học
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
                  data={bsiByClassData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="class" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 border rounded shadow-lg">
                            <p className="text-sm font-medium mb-1">Lớp {label}</p>
                            {payload.map((entry, index) => (
                              <p key={`item-${index}`} className="text-xs" style={{ color: entry.color }}>
                                {entry.name}: {entry.value} học viên
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="high" name="BSI Cao" stackId="a" fill="var(--color-high)" />
                  <Bar dataKey="medium" name="BSI Trung bình" stackId="a" fill="var(--color-medium)" />
                  <Bar dataKey="low" name="BSI Thấp" stackId="a" fill="var(--color-low)" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default BSIOverview;
