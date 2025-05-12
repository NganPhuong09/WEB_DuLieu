
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { LineChart, Calendar } from "lucide-react";

// Mock data for time series analysis
const timeSeriesData = [
  { week: 1, VEI: 7.2, EEI: 6.8, CSI: 6.5, BSI: 6.9 },
  { week: 2, VEI: 7.4, EEI: 7.0, CSI: 6.7, BSI: 7.1 },
  { week: 3, VEI: 7.3, EEI: 7.1, CSI: 6.8, BSI: 7.1 },
  { week: 4, VEI: 7.5, EEI: 7.2, CSI: 7.0, BSI: 7.3 },
  { week: 5, VEI: 7.6, EEI: 7.3, CSI: 7.1, BSI: 7.4 },
  { week: 6, VEI: 7.4, EEI: 7.5, CSI: 7.2, BSI: 7.4 },
  { week: 7, VEI: 7.8, EEI: 7.6, CSI: 7.3, BSI: 7.6 },
  { week: 8, VEI: 8.0, EEI: 7.7, CSI: 7.4, BSI: 7.8 },
  { week: 9, VEI: 7.9, EEI: 7.8, CSI: 7.5, BSI: 7.8 },
  { week: 10, VEI: 8.1, EEI: 7.9, CSI: 7.7, BSI: 8.0 },
  { week: 11, VEI: 8.2, EEI: 8.0, CSI: 7.8, BSI: 8.0 },
  { week: 12, VEI: 8.3, EEI: 8.1, CSI: 7.9, BSI: 8.1 },
  { week: 13, VEI: 8.2, EEI: 8.0, CSI: 8.0, BSI: 8.1 },
  { week: 14, VEI: 8.4, EEI: 8.2, CSI: 8.1, BSI: 8.3 },
  { week: 15, VEI: 8.5, EEI: 8.3, CSI: 8.2, BSI: 8.4 },
];

// Mock data for calendar heatmap (simplified representation)
const calendarData = [
  { date: '2023-01-03', value: 6.5 },
  { date: '2023-01-10', value: 7.2 },
  { date: '2023-01-17', value: 6.8 },
  { date: '2023-01-24', value: 7.5 },
  { date: '2023-01-31', value: 7.8 },
  { date: '2023-02-07', value: 8.0 },
  { date: '2023-02-14', value: 7.6 },
  { date: '2023-02-21', value: 8.2 },
  { date: '2023-02-28', value: 8.4 },
  { date: '2023-03-07', value: 8.5 },
  { date: '2023-03-14', value: 8.3 },
  { date: '2023-03-21', value: 8.6 },
  { date: '2023-03-28', value: 8.7 },
];

// Generate calendar heatmap grid
const generateCalendarGrid = () => {
  const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4'];
  const weeks = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  
  return (
    <div className="grid grid-cols-4 gap-4">
      {months.map((month, monthIndex) => (
        <div key={monthIndex} className="space-y-2">
          <p className="text-sm font-medium">{month}</p>
          <div className="space-y-1">
            <div className="grid grid-cols-7 gap-1">
              {weeks.map((day, i) => (
                <div key={i} className="text-xs text-center text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 28 }).map((_, i) => {
                const value = Math.random() * 10;
                let bgColor = '#ffffff';
                if (value > 8) bgColor = '#4ade80';
                else if (value > 7) bgColor = '#a3e635';
                else if (value > 6) bgColor = '#facc15';
                else if (value > 5) bgColor = '#fb923c';
                else bgColor = '#f87171';
                
                return (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-sm cursor-pointer flex items-center justify-center text-[10px]"
                    style={{ backgroundColor: bgColor }}
                    title={`BSI: ${value.toFixed(1)}`}
                  >
                    {(i + 1) % 7 === 0 ? i + 1 : ''}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const TimeAnalysis = () => {
  const [timeUnit, setTimeUnit] = useState('week');
  const [indexFilter, setIndexFilter] = useState('all');

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Phân tích theo thời gian</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Đơn vị thời gian</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={timeUnit} onValueChange={setTimeUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn đơn vị thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Ngày</SelectItem>
                  <SelectItem value="week">Tuần</SelectItem>
                  <SelectItem value="month">Tháng</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Chỉ số muốn theo dõi</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={indexFilter} onValueChange={setIndexFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn chỉ số" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="BSI">BSI</SelectItem>
                  <SelectItem value="VEI">VEI</SelectItem>
                  <SelectItem value="EEI">EEI</SelectItem>
                  <SelectItem value="CSI">CSI</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Time Series Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-research-primary" />
            <span>Diễn biến chỉ số theo thời gian</span>
          </CardTitle>
          <CardDescription>
            Biểu đồ theo dõi sự thay đổi các chỉ số VEI, EEI, CSI và BSI theo {timeUnit === 'day' ? 'ngày' : timeUnit === 'week' ? 'tuần' : 'tháng'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              VEI: { color: '#818cf8' },
              EEI: { color: '#a78bfa' },
              CSI: { color: '#c4b5fd' },
              BSI: { color: '#8b5cf6' },
            }}
            className="h-96"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart
                data={timeSeriesData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="week" 
                  label={{ value: timeUnit === 'day' ? 'Ngày' : timeUnit === 'week' ? 'Tuần' : 'Tháng', position: 'insideBottom', offset: -5 }} 
                />
                <YAxis domain={[5, 10]} />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 border rounded shadow-lg">
                          <p className="font-medium mb-2">Tuần {label}</p>
                          {payload.map((entry, index) => (
                            <p key={index} style={{ color: entry.color }}>
                              {entry.name}: {entry.value.toFixed(1)}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <ReferenceLine y={7.5} stroke="#22c55e" strokeDasharray="3 3" label="Mục tiêu" />
                
                {(indexFilter === 'all' || indexFilter === 'VEI') && (
                  <Line 
                    type="monotone" 
                    dataKey="VEI" 
                    name="VEI" 
                    stroke="var(--color-VEI)" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                )}
                
                {(indexFilter === 'all' || indexFilter === 'EEI') && (
                  <Line 
                    type="monotone" 
                    dataKey="EEI" 
                    name="EEI" 
                    stroke="var(--color-EEI)" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                )}
                
                {(indexFilter === 'all' || indexFilter === 'CSI') && (
                  <Line 
                    type="monotone" 
                    dataKey="CSI" 
                    name="CSI" 
                    stroke="var(--color-CSI)" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                )}
                
                {(indexFilter === 'all' || indexFilter === 'BSI') && (
                  <Line 
                    type="monotone" 
                    dataKey="BSI" 
                    name="BSI" 
                    stroke="var(--color-BSI)" 
                    strokeWidth={3}
                    activeDot={{ r: 8 }} 
                  />
                )}
              </RechartsLineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Calendar Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-research-primary" />
            <span>Calendar Heatmap</span>
          </CardTitle>
          <CardDescription>
            Visualize trenden över tid med färgkodade kalenderdagar
          </CardDescription>
        </CardHeader>
        <CardContent>
          {generateCalendarGrid()}
          
          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-f87171 rounded-sm"></div>
                <span className="text-xs">{'<5'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-fb923c rounded-sm"></div>
                <span className="text-xs">5-6</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-facc15 rounded-sm"></div>
                <span className="text-xs">6-7</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-a3e635 rounded-sm"></div>
                <span className="text-xs">7-8</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-4ade80 rounded-sm"></div>
                <span className="text-xs">{'>8'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TimeAnalysis;
