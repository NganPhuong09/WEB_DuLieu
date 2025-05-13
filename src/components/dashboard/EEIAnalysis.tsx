
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { BarChart } from "lucide-react";

// Mock data for submission count histogram
const submissionCountData = [
  { range: '0-1', count: 12 },
  { range: '2-3', count: 45 },
  { range: '4-5', count: 78 },
  { range: '6-7', count: 124 },
  { range: '8-9', count: 98 },
  { range: '10-11', count: 67 },
  { range: '12-13', count: 45 },
  { range: '14-15', count: 32 },
  { range: '16+', count: 23 },
];

// Mock data for on-time submission rates
const onTimeSubmissionData = [
  { group: 'EEI Cao', onTime: 92, late: 8 },
  { group: 'EEI Trung bình', onTime: 78, late: 22 },
  { group: 'EEI Thấp', onTime: 52, late: 48 },
];

// Mock data for EEI by problem type
const problemTypeData = [
  { type: 'Trắc nghiệm', eeiHigh: 8.7, eeiMedium: 7.5, eeiLow: 5.8 },
  { type: 'Điền từ', eeiHigh: 8.5, eeiMedium: 7.3, eeiLow: 5.5 },
  { type: 'Viết mã', eeiHigh: 8.9, eeiMedium: 7.6, eeiLow: 5.2 },
  { type: 'Ngắn', eeiHigh: 8.3, eeiMedium: 7.2, eeiLow: 5.6 },
  { type: 'Dài', eeiHigh: 8.6, eeiMedium: 7.4, eeiLow: 5.3 },
];

const EEIAnalysis = () => {
  const [eeiGroupFilter, setEeiGroupFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Phân tích EEI - Exercise Engagement Index</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Bộ lọc nhóm EEI</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={eeiGroupFilter} onValueChange={setEeiGroupFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn nhóm EEI" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="high">EEI Cao ({'>'}7.5)</SelectItem>
                  <SelectItem value="medium">EEI Trung bình (5-7.5)</SelectItem>
                  <SelectItem value="low">EEI Thấp ({'<'}5)</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

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
        </div>
      </div>

      {/* EEI KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">EEI Trung bình</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7.4/10</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span className="i-lucide-trending-up mr-1"></span>
              +0.2 so với kỳ trước
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Số lần nộp trung bình</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7.8</div>
            <p className="text-xs text-gray-600 mt-1">
              Cao nhất: 24 lần nộp
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Tỷ lệ WR (đúng)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">76.3%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span className="i-lucide-trending-up mr-1"></span>
              +1.5% so với kỳ trước
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Submission Count Histogram */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-research-primary" />
            <span>Phân bố số lần làm bài</span>
          </CardTitle>
          <CardDescription>
            Histogram thể hiện số lượng sinh viên theo số lần nộp bài tập
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              bar: { color: '#8b5cf6' },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={submissionCountData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" label={{ value: 'Số lần nộp bài', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Số học viên', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border rounded shadow-lg">
                          <p className="font-medium mb-1">Số lần nộp: {label}</p>
                          <p>Số học viên: {payload[0].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar dataKey="count" name="Số học viên" fill="var(--color-bar)" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* On-time Submission Rates */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-research-primary" />
            <span>Tỷ lệ nộp đúng hạn theo nhóm</span>
          </CardTitle>
          <CardDescription>
            Tỷ lệ nộp bài đúng hạn và trễ hạn theo các nhóm EEI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              onTime: { color: '#22c55e' },
              late: { color: '#f43f5e' },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={onTimeSubmissionData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                layout="vertical"
                barSize={40}
                stackOffset="expand"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(tick) => `${tick}%`} domain={[0, 100]} />
                <YAxis type="category" dataKey="group" />
                <Tooltip
                  formatter={(value, name) => [`${value}%`, name === "onTime" ? "Đúng hạn" : "Trễ hạn"]}
                />
                <Legend payload={[
                  { value: 'Đúng hạn', type: 'square', color: 'var(--color-onTime)' },
                  { value: 'Trễ hạn', type: 'square', color: 'var(--color-late)' },
                ]} />
                <Bar dataKey="onTime" stackId="a" fill="var(--color-onTime)" name="Đúng hạn" />
                <Bar dataKey="late" stackId="a" fill="var(--color-late)" name="Trễ hạn" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* EEI by Problem Type */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-research-primary" />
            <span>EEI theo loại bài tập</span>
          </CardTitle>
          <CardDescription>
            So sánh chỉ số EEI theo từng loại bài tập và nhóm EEI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              eeiHigh: { color: '#4ade80' },
              eeiMedium: { color: '#facc15' },
              eeiLow: { color: '#f87171' },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={problemTypeData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="eeiHigh" name="EEI Cao" fill="var(--color-eeiHigh)" />
                <Bar dataKey="eeiMedium" name="EEI Trung bình" fill="var(--color-eeiMedium)" />
                <Bar dataKey="eeiLow" name="EEI Thấp" fill="var(--color-eeiLow)" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default EEIAnalysis;
