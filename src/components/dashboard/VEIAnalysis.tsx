
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  Rectangle
} from 'recharts';
import { LineChart, BarChart } from "lucide-react";

// Mock data for VEI vs Speed scatter plot
const veiSpeedData = [
  { vei: 9.2, speed: 1.5, count: 15 },
  { vei: 8.7, speed: 1.25, count: 22 },
  { vei: 8.1, speed: 1.0, count: 28 },
  { vei: 7.8, speed: 1.75, count: 12 },
  { vei: 7.5, speed: 2.0, count: 8 },
  { vei: 7.2, speed: 0.75, count: 18 },
  { vei: 6.9, speed: 1.0, count: 25 },
  { vei: 6.5, speed: 1.5, count: 14 },
  { vei: 6.2, speed: 0.5, count: 10 },
  { vei: 5.8, speed: 1.25, count: 19 },
  { vei: 5.5, speed: 1.0, count: 23 },
  { vei: 5.1, speed: 0.75, count: 17 },
  { vei: 4.7, speed: 1.0, count: 15 },
  { vei: 4.2, speed: 1.5, count: 8 },
  { vei: 3.8, speed: 0.5, count: 12 },
];

// Mock data for VEI by class box plot
const veiByClassData = [
  { class: 'K18', min: 5.2, q1: 6.5, median: 7.8, q3: 8.9, max: 9.5 },
  { class: 'K19', min: 4.9, q1: 6.2, median: 7.5, q3: 8.7, max: 9.3 },
  { class: 'K20', min: 4.5, q1: 5.8, median: 7.2, q3: 8.4, max: 9.1 },
  { class: 'K21', min: 5.0, q1: 6.3, median: 7.6, q3: 8.8, max: 9.4 },
  { class: 'K22', min: 4.8, q1: 6.0, median: 7.3, q3: 8.5, max: 9.2 },
];

// Mock data for correlation factors
const correlationFactors = [
  { factor: 'Tốc độ xem', correlation: 0.75 },
  { factor: 'Thời gian xem', correlation: 0.82 },
  { factor: 'Số lượt tua lại', correlation: 0.65 },
  { factor: 'Tỷ lệ hoàn thành', correlation: 0.88 },
  { factor: 'Thời gian dừng', correlation: -0.42 },
];

const VEIAnalysis = () => {
  const [veiGroupFilter, setVeiGroupFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Phân tích VEI - Video Engagement Index</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Bộ lọc nhóm VEI</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={veiGroupFilter} onValueChange={setVeiGroupFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn nhóm VEI" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="high">VEI Cao (>7.5)</SelectItem>
                  <SelectItem value="medium">VEI Trung bình (5-7.5)</SelectItem>
                  <SelectItem value="low">VEI Thấp (<5)</SelectItem>
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

      {/* VEI KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">VEI Trung bình</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7.2/10</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span className="i-lucide-trending-up mr-1"></span>
              +0.3 so với kỳ trước
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Tốc độ xem trung bình</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1.2x</div>
            <p className="text-xs text-gray-600 mt-1">
              Phổ biến nhất: 1.0x, 1.5x
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Tỷ lệ xem hoàn thành</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">84.6%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span className="i-lucide-trending-up mr-1"></span>
              +2.1% so với kỳ trước
            </p>
          </CardContent>
        </Card>
      </div>

      {/* VEI vs Speed Scatter Plot */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-research-primary" />
            <span>Mối quan hệ VEI và tốc độ xem</span>
          </CardTitle>
          <CardDescription>
            Biểu đồ phân tán thể hiện mối tương quan giữa VEI và tốc độ xem video của học viên
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              scatter: { color: '#8b5cf6' },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid />
                <XAxis 
                  type="number" 
                  dataKey="speed" 
                  name="Tốc độ" 
                  domain={[0, 'dataMax + 0.5']} 
                  label={{ value: 'Tốc độ xem trung bình (x)', position: 'insideBottom', offset: -10 }} 
                />
                <YAxis 
                  type="number" 
                  dataKey="vei" 
                  name="VEI" 
                  domain={[0, 10]} 
                  label={{ value: 'VEI', angle: -90, position: 'insideLeft' }} 
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border rounded shadow-lg">
                          <p className="font-medium">VEI: {payload[0].value}</p>
                          <p>Tốc độ: {payload[1].value}x</p>
                          <p>Số SV: {payload[2].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter 
                  name="Tương quan VEI-Tốc độ" 
                  data={veiSpeedData} 
                  fill="var(--color-scatter)" 
                  shape={(props) => {
                    const { cx, cy, payload } = props;
                    const size = Math.sqrt(payload.count) * 3;
                    return (
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r={size} 
                        fill="var(--color-scatter)" 
                        fillOpacity={0.6}
                      />
                    );
                  }}
                />
              </RechartsScatterChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* VEI by Class Box Plot */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-research-primary" />
            <span>VEI theo lớp</span>
          </CardTitle>
          <CardDescription>
            Box plot thể hiện phân bố VEI cho từng lớp
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              boxplot: { color: '#a855f7' },
              median: { color: '#7c3aed' },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={veiByClassData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="class" />
                <YAxis domain={[0, 10]} />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border rounded shadow-lg">
                          <p className="font-medium mb-1">Lớp {label}</p>
                          <p>Tối đa: {payload[4].value}</p>
                          <p>Tứ phân vị 3: {payload[3].value}</p>
                          <p>Trung vị: {payload[2].value}</p>
                          <p>Tứ phân vị 1: {payload[1].value}</p>
                          <p>Tối thiểu: {payload[0].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                {/* Box Plot */}
                <Bar dataKey="min" name="Tối thiểu" fill="transparent" />
                <Bar dataKey="q1" name="Tứ phân vị 1" fill="transparent" />
                <Bar dataKey="median" name="Trung vị" fill="var(--color-median)" />
                <Bar dataKey="q3" name="Tứ phân vị 3" fill="transparent" />
                <Bar dataKey="max" name="Tối đa" fill="transparent" />
                {/* Custom box plot rendering */}
                {veiByClassData.map((entry, index) => (
                  <g key={`box-plot-${index}`}>
                    {/* Vertical line from min to max */}
                    <line 
                      x1={40 + index * 80} 
                      y1={200 - (entry.min * 20)} 
                      x2={40 + index * 80} 
                      y2={200 - (entry.max * 20)} 
                      stroke="var(--color-boxplot)" 
                      strokeWidth={2} 
                    />
                    {/* Box from q1 to q3 */}
                    <rect 
                      x={30 + index * 80} 
                      y={200 - (entry.q3 * 20)} 
                      width={20} 
                      height={(entry.q3 - entry.q1) * 20} 
                      fill="var(--color-boxplot)" 
                      fillOpacity={0.5} 
                      stroke="var(--color-boxplot)" 
                      strokeWidth={1} 
                    />
                    {/* Median line */}
                    <line 
                      x1={30 + index * 80} 
                      y1={200 - (entry.median * 20)} 
                      x2={50 + index * 80} 
                      y2={200 - (entry.median * 20)} 
                      stroke="var(--color-median)" 
                      strokeWidth={2} 
                    />
                    {/* Min line */}
                    <line 
                      x1={30 + index * 80} 
                      y1={200 - (entry.min * 20)} 
                      x2={50 + index * 80} 
                      y2={200 - (entry.min * 20)} 
                      stroke="var(--color-boxplot)" 
                      strokeWidth={1} 
                    />
                    {/* Max line */}
                    <line 
                      x1={30 + index * 80} 
                      y1={200 - (entry.max * 20)} 
                      x2={50 + index * 80} 
                      y2={200 - (entry.max * 20)} 
                      stroke="var(--color-boxplot)" 
                      strokeWidth={1} 
                    />
                  </g>
                ))}
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Correlation factors */}
      <Card>
        <CardHeader>
          <CardTitle>Các yếu tố ảnh hưởng đến VEI</CardTitle>
          <CardDescription>
            Hệ số tương quan của các yếu tố với chỉ số VEI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              correlation: { color: '#8b5cf6' },
              negative: { color: '#f43f5e' },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={correlationFactors}
                layout="vertical"
                margin={{
                  top: 20,
                  right: 30,
                  left: 150,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[-1, 1]} />
                <YAxis dataKey="factor" type="category" />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="correlation" 
                  name="Hệ số tương quan" 
                  fill={(entry) => entry.correlation >= 0 ? 'var(--color-correlation)' : 'var(--color-negative)'}
                  shape={(props) => {
                    const { x, y, width, height, fill } = props;
                    const radius = 0;
                    const adjustedWidth = Math.abs(width);
                    const adjustedX = props.correlation < 0 ? x - adjustedWidth : x;
                    return (
                      <Rectangle 
                        x={adjustedX} 
                        y={y} 
                        width={adjustedWidth} 
                        height={height} 
                        fill={fill} 
                        radius={radius} 
                      />
                    );
                  }}
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default VEIAnalysis;
