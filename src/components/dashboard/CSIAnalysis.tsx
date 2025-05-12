
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';
import { LineChart, BarChart, PieChart } from "lucide-react";

// Mock data for weekly average scores
const weeklyScoresData = [
  { week: 1, score: 75.2, count: 933 },
  { week: 2, score: 78.5, count: 925 },
  { week: 3, score: 76.8, count: 910 },
  { week: 4, score: 79.3, count: 901 },
  { week: 5, score: 82.1, count: 895 },
  { week: 6, score: 80.7, count: 889 },
  { week: 7, score: 83.5, count: 876 },
  { week: 8, score: 85.2, count: 872 },
  { week: 9, score: 84.6, count: 865 },
  { week: 10, score: 86.3, count: 860 },
];

// Mock data for score distribution
const scoreDistributionData = [
  { name: 'A (90-100)', value: 215, fill: '#4ade80' },
  { name: 'B (80-89)', value: 348, fill: '#a3e635' },
  { name: 'C (70-79)', value: 245, fill: '#facc15' },
  { name: 'D (60-69)', value: 87, fill: '#fb923c' },
  { name: 'F (0-59)', value: 38, fill: '#f87171' },
];

// Mock data for sentiment
const sentimentData = [
  { name: 'Rất tích cực', value: 28, fill: '#4ade80' },
  { name: 'Tích cực', value: 45, fill: '#a3e635' },
  { name: 'Trung lập', value: 15, fill: '#facc15' },
  { name: 'Tiêu cực', value: 8, fill: '#fb923c' },
  { name: 'Rất tiêu cực', value: 4, fill: '#f87171' },
];

// Mock data for common sentiment words
const commonWords = [
  { text: 'Hữu ích', value: 85 },
  { text: 'Thú vị', value: 72 },
  { text: 'Khó hiểu', value: 45 },
  { text: 'Tuyệt vời', value: 67 },
  { text: 'Chất lượng', value: 58 },
  { text: 'Dễ hiểu', value: 52 },
  { text: 'Chuyên nghiệp', value: 48 },
  { text: 'Bổ ích', value: 65 },
  { text: 'Phức tạp', value: 38 },
  { text: 'Kém', value: 12 },
  { text: 'Tốt', value: 78 },
  { text: 'Rõ ràng', value: 56 },
];

const CSIAnalysis = () => {
  const [csiType, setCsiType] = useState('score');
  const [classFilter, setClassFilter] = useState('all');

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Phân tích CSI</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Loại CSI</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={csiType} onValueChange={setCsiType}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại CSI" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">Course Score Index (Điểm số)</SelectItem>
                  <SelectItem value="sentiment">Comment Sentiment Index (Cảm xúc)</SelectItem>
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

      {/* CSI KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {csiType === 'score' ? (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Điểm trung bình</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">81.2%</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <span className="i-lucide-trending-up mr-1"></span>
                  +1.8% so với kỳ trước
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Tỷ lệ đỗ (≥60%)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">95.9%</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <span className="i-lucide-trending-up mr-1"></span>
                  +0.7% so với kỳ trước
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Số học viên A và B</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">563</div>
                <p className="text-xs text-gray-600 mt-1">
                  Chiếm 60.3% tổng số học viên
                </p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Chỉ số cảm xúc</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">7.6/10</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <span className="i-lucide-trending-up mr-1"></span>
                  +0.3 so với kỳ trước
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Tỷ lệ hài lòng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">73%</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <span className="i-lucide-trending-up mr-1"></span>
                  +2.1% so với kỳ trước
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Tổng bình luận</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2,456</div>
                <p className="text-xs text-gray-600 mt-1">
                  Trung bình 2.63 bình luận/học viên
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {csiType === 'score' ? (
        <>
          {/* Score Trend Chart */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-research-primary" />
                <span>Điểm trung bình theo tuần</span>
              </CardTitle>
              <CardDescription>
                Biểu đồ thể hiện điểm trung bình của học viên theo tuần
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  score: { color: '#8b5cf6' },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={weeklyScoresData}
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
                      label={{ value: 'Tuần', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis
                      domain={[50, 100]}
                      label={{ value: 'Điểm trung bình', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-2 border rounded shadow-lg">
                              <p className="font-medium mb-1">Tuần {label}</p>
                              <p>Điểm trung bình: {payload[0].value}%</p>
                              <p>Số học viên: {payload[0].payload.count}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="score"
                      name="Điểm trung bình"
                      stroke="var(--color-score)"
                      activeDot={{ r: 8 }}
                      strokeWidth={3}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Score Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-research-primary" />
                <span>Phân bố điểm số</span>
              </CardTitle>
              <CardDescription>
                Biểu đồ thể hiện phân bố điểm số của học viên theo thang điểm
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  A: { color: '#4ade80' },
                  B: { color: '#a3e635' },
                  C: { color: '#facc15' },
                  D: { color: '#fb923c' },
                  F: { color: '#f87171' },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={scoreDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                    >
                      {scoreDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value} học viên`, name]}
                    />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {/* Sentiment Distribution */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-research-primary" />
                <span>Phân bố cảm xúc</span>
              </CardTitle>
              <CardDescription>
                Phân bố cảm xúc trong bình luận của học viên
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  positive: { color: '#4ade80' },
                  neutral: { color: '#facc15' },
                  negative: { color: '#f87171' },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value}%`, name]}
                    />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Word Cloud Simulation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-research-primary" />
                <span>Từ phổ biến trong bình luận</span>
              </CardTitle>
              <CardDescription>
                Các từ xuất hiện nhiều nhất trong bình luận của học viên
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-gray-50 rounded-md flex items-center justify-center p-6">
                <div className="flex flex-wrap justify-center items-center gap-4">
                  {commonWords.map((word, i) => (
                    <div 
                      key={i} 
                      className="text-center" 
                      style={{ 
                        fontSize: `${Math.max(1, word.value / 10)}rem`, 
                        color: word.value > 70 ? '#4ade80' : 
                               word.value > 50 ? '#a3e635' :
                               word.value > 30 ? '#facc15' :
                               word.value > 15 ? '#fb923c' : '#f87171'
                      }}
                    >
                      {word.text}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

export default CSIAnalysis;
